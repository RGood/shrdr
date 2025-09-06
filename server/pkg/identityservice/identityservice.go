package identityservice

import (
	"context"
	"fmt"

	"github.com/RGood/shrdr/common/pkg/generated/identity"
	"github.com/RGood/shrdr/common/pkg/helpers"
	"github.com/RGood/shrdr/server/pkg/auth"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type IdentityService struct {
	identity.UnimplementedAuthenticationServer

	usersById    *helpers.SyncMap[string, *userRecord]
	usersByToken *helpers.SyncMap[string, *userRecord]
}

type userRecord struct {
	done   func(error)
	stream grpc.ServerStreamingServer[identity.AuthInfo]
	info   *identity.AuthInfo
}

func NewIdentityService() *IdentityService {
	return &IdentityService{
		usersById:    helpers.NewSyncMap[string, *userRecord](),
		usersByToken: helpers.NewSyncMap[string, *userRecord](),
	}
}

func (s *IdentityService) RotateToken(userId string) error {
	authInfo, ok := s.usersById.Get(userId)
	if !ok {
		return status.Errorf(codes.NotFound, "user not found")
	}

	oldToken := authInfo.info.Token
	newToken := helpers.GenerateId(32)

	authInfo.info.Token = newToken

	s.usersByToken.Set(newToken, authInfo)
	s.usersByToken.Delete(oldToken)

	return authInfo.stream.Send(authInfo.info)
}

func (s *IdentityService) Disconnect(userId string, reason error) error {
	authInfo, ok := s.usersById.Get(userId)
	if !ok {
		return status.Errorf(codes.NotFound, "user not found")
	}

	authInfo.done(nil)

	return nil
}

func (s *IdentityService) GetUserFromToken(token string) (*identity.User, error) {
	authInfo, ok := s.usersByToken.Get(token)
	if !ok {
		return nil, status.Errorf(codes.Unauthenticated, "user not found")
	}

	return authInfo.info.User, nil
}

func (s *IdentityService) Connect(req *identity.LoginRequest, stream grpc.ServerStreamingServer[identity.AuthInfo]) error {
	id := helpers.GenerateId(16)
	token := helpers.GenerateId(32)

	ctx, cancel := context.WithCancelCause(stream.Context())
	defer cancel(nil)

	authInfo := &identity.AuthInfo{
		User: &identity.User{
			Id:   id,
			Name: req.Username,
		},
		Token: token,
	}

	record := &userRecord{
		done:   cancel,
		stream: stream,
		info:   authInfo,
	}

	s.usersById.Set(id, record)
	s.usersByToken.Set(token, record)

	defer func() {
		auth, ok := s.usersById.Delete(id)
		if !ok {
			return
		}

		s.usersByToken.Delete(auth.info.Token)
	}()

	stream.Send(authInfo)

	fmt.Printf("User %s connected and given ID %s\n", req.Username, id)

	<-ctx.Done()

	fmt.Printf("User %s disconnected\n", req.Username)

	return ctx.Err()
}

func (s *IdentityService) Whoami(ctx context.Context, req *identity.WhoamiRequest) (*identity.WhoamiResponse, error) {
	token := auth.TokenFromContext(ctx)
	userRecord, ok := s.usersByToken.Get(token)
	if !ok {
		return nil, status.Errorf(codes.Unauthenticated, "user not found")
	}

	return &identity.WhoamiResponse{
		User: userRecord.info.User,
	}, nil
}
