package filesystemservice

import (
	"context"
	"errors"
	"fmt"
	"io"
	"path/filepath"
	"time"

	"github.com/RGood/shrdr/common/pkg/constants"
	"github.com/RGood/shrdr/common/pkg/generated/filesystem"
	"github.com/RGood/shrdr/common/pkg/helpers"
	"github.com/RGood/shrdr/server/pkg/files"
	"github.com/google/uuid"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/metadata"
	"google.golang.org/grpc/status"
)

type FilesystemService struct {
	filesystem.UnimplementedFilesystemServer

	clients   *helpers.SyncMap[string, *client]
	transfers *helpers.SyncMap[string, *transfer]
	slots     int
}

type client struct {
	manifest map[string]files.FSEntry
	stream   filesystem.Filesystem_BroadcastServer
}

type transfer struct {
	ctx          context.Context
	uploaderId   string
	filePath     string
	chunkCount   int64
	totalChunks  int64
	targetStream filesystem.Filesystem_DownloadServer
	done         func(reason error)
	timeout      *time.Timer
}

// setTimeout asynchronously cancels the transfer context after the specified duration.
// If the specified duration is less than or equal to 0, the timeout is stopped.
func (t *transfer) setTimeout(timeout time.Duration) {
	if t.timeout != nil {
		t.timeout.Stop()
	}
	if timeout > 0 {
		t.timeout = time.AfterFunc(timeout, func() {
			t.done(context.DeadlineExceeded)
		})
	}
}

func NewFilesystemService(slots int) *FilesystemService {
	return &FilesystemService{
		clients:   helpers.NewSyncMap[string, *client](),
		transfers: helpers.NewSyncMap[string, *transfer](),
		slots:     slots,
	}
}

// TODO impl after we have identity support
func getIdentityFromContext(ctx context.Context) (string, error) {
	md, ok := metadata.FromIncomingContext(ctx)
	if !ok {
		return "", errors.New("failed to get metadata from context")
	}

	// Transform Identity Token into Identity
	identityToken := md.Get(constants.HeaderAuth)
	_ = identityToken
	identity := ""

	return identity, nil
}

func (fs *FilesystemService) Broadcast(manifest *filesystem.BroadcastManifest, stream filesystem.Filesystem_BroadcastServer) error {
	identity, err := getIdentityFromContext(stream.Context())
	if err != nil {
		return err
	}

	if fs.clients.Len() >= fs.slots {
		return status.Error(codes.ResourceExhausted, "broadcast slots are full")
	}

	// Add user to clients on join
	fs.clients.Set(identity, &client{
		manifest: files.ManifestFromProto(manifest.GetContents()),
		stream:   stream,
	})

	// Delete user from clients after disconnect
	defer func() {
		fs.clients.Delete(identity)
	}()

	<-stream.Context().Done()

	// Handle the streaming RPC
	return nil
}

func (fs *FilesystemService) Download(req *filesystem.DownloadRequest, stream filesystem.Filesystem_DownloadServer) (err error) {
	identity, err := getIdentityFromContext(stream.Context())
	if err != nil {
		return err
	}

	transferId := uuid.NewString()

	// Create a new context for the transfer
	transferCtx, cancel := context.WithCancelCause(stream.Context())
	defer cancel(err)

	// Create a new transfer for the download
	transfer := &transfer{
		ctx:          transferCtx,
		targetStream: stream,
		chunkCount:   0,
		totalChunks:  -1,
		done:         cancel,
	}
	fs.transfers.Set(transferId, transfer)
	defer fs.transfers.Delete(transferId)

	client, ok := fs.clients.Get(req.FromUser)
	if !ok {
		return errors.New("client not found")
	}

	// Wait up to 60s for the transfer to begin.
	transfer.setTimeout(60 * time.Second)

	if err := client.stream.Send(&filesystem.BroadcastRequest{
		UserId:    identity,
		RequestId: transferId,
		FilePath:  req.FilePath,
	}); err != nil {
		return err
	}

	<-transferCtx.Done()

	// Handle the streaming RPC
	return transferCtx.Err()
}

func (fs *FilesystemService) validateChunk(chunk *filesystem.FileChunk, transfer *transfer) error {
	if chunk.GetFilePath() != transfer.filePath {
		return errors.New("file path does not match transfer")
	}

	if chunk.ChunkCount > chunk.TotalChunks {
		return errors.New("chunk count exceeds total chunks")
	}

	if transfer.totalChunks == -1 {
		transfer.totalChunks = chunk.TotalChunks
	}

	if transfer.totalChunks != chunk.TotalChunks {
		return errors.New("total chunk count changed")
	}

	if chunk.ChunkCount != transfer.chunkCount+1 {
		return errors.New("chunk order error")
	}

	return nil
}

func (fs *FilesystemService) Upload(stream filesystem.Filesystem_UploadServer) (err error) {
	identity, err := getIdentityFromContext(stream.Context())
	if err != nil {
		return err
	}

	requestIds := metadata.ValueFromIncomingContext(stream.Context(), constants.HeaderRequestID)
	transfers := map[string]*transfer{}
	for _, requestId := range requestIds {
		transfer, ok := fs.transfers.Get(requestId)
		if !ok {
			return errors.New("transfer not found")
		}

		if transfer.uploaderId != identity {
			return errors.New("uploader identity does not match transfer request")
		}

		transfers[requestId] = transfer

		// Pause the transfer since the uploader has responded.
		transfer.setTimeout(0)

		// Mark the transfer as done upon completion.
		// Set the reason to any response error.
		defer transfer.done(err)
	}

	for {
		chunk, err := stream.Recv()
		if err == io.EOF {
			break
		} else if err != nil {
			return fmt.Errorf("error receiving chunk from uploader: %w", err)
		}

		for requestId, transfer := range transfers {
			if err := fs.validateChunk(chunk, transfer); err != nil {
				delete(transfers, requestId)
				transfer.done(fmt.Errorf("transfer terminated early due to validation error: %w", err))
				continue
			}

			if err := transfer.targetStream.Send(chunk); err != nil {
				// If sending data to the transfer stream fails, terminate its context
				// and remove it from the list of transfers.
				delete(transfers, requestId)
				transfer.done(fmt.Errorf("transfer terminated early due to data transfer error: %w", err))
				continue
			}

			transfer.chunkCount++
		}
	}

	return stream.SendAndClose(&filesystem.UploadResponse{
		Success: true,
	})
}

func mapToManifestEntries(manifest map[string]files.FSEntry, recursive bool) []*filesystem.FSEntry {
	entries := []*filesystem.FSEntry{}
	for name, entry := range manifest {
		switch entry.(type) {
		case *files.File:
			entries = append(entries, &filesystem.FSEntry{
				Record: &filesystem.FSEntry_File{
					File: &filesystem.File{
						Name: name,
					},
				},
			})
		case *files.Directory:
			folder := &filesystem.Folder{
				Name: name,
			}

			if recursive {
				folder.Contents = mapToManifestEntries(entry.GetChildren(), recursive)
			}

			entries = append(entries, &filesystem.FSEntry{
				Record: &filesystem.FSEntry_Folder{
					Folder: folder,
				},
			})
		}
	}

	return entries
}

func (fs *FilesystemService) GetManifest(ctx context.Context, req *filesystem.GetManifestRequest) (*filesystem.GetManifestResponse, error) {
	pathParts := filepath.SplitList(req.Path)
	if len(pathParts) == 0 {
		userFolders := []*filesystem.FSEntry{}

		fs.clients.ForEach(func(id string, _ *client) {
			userFolders = append(userFolders, &filesystem.FSEntry{
				Record: &filesystem.FSEntry_Folder{
					Folder: &filesystem.Folder{
						Name: id,
					},
				},
			})
		})

		return &filesystem.GetManifestResponse{
			Contents: userFolders,
		}, nil
	} else if len(pathParts) == 1 {
		userId := pathParts[0]
		client, ok := fs.clients.Get(userId)
		if !ok {
			return nil, status.Errorf(codes.NotFound, "user %s not broadcasting", userId)
		}

		entries := mapToManifestEntries(client.manifest, false)

		return &filesystem.GetManifestResponse{
			Contents: entries,
		}, nil
	} else {
		userId := pathParts[0]
		path := pathParts[1:]

		client, ok := fs.clients.Get(userId)
		if !ok {
			return nil, status.Errorf(codes.NotFound, "user %s not broadcasting", userId)
		}

		curDir := client.manifest
		curPath := ""
		for _, part := range path {
			curDir = curDir[part].GetChildren()
			curPath = filepath.Join(curPath, part)
			if curDir == nil {
				return nil, status.Errorf(codes.NotFound, "directory %s not in manifest", curPath)
			}
		}

		entries := mapToManifestEntries(curDir, false)

		return &filesystem.GetManifestResponse{
			Contents: entries,
		}, nil
	}
}
