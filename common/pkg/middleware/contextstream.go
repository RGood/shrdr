package middleware

import (
	"context"

	"google.golang.org/grpc"
)

type contextStream struct {
	grpc.ServerStream
	ctx context.Context
}

func (c *contextStream) Context() context.Context {
	return c.ctx
}

func StreamWithContext(ctx context.Context, ss grpc.ServerStream) grpc.ServerStream {
	return &contextStream{
		ServerStream: ss,
		ctx:          ctx,
	}
}
