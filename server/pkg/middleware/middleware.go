package middleware

import (
	"context"

	"github.com/RGood/shrdr/common/pkg/generated/identity"
	"github.com/RGood/shrdr/common/pkg/middleware"
	"github.com/RGood/shrdr/server/pkg/auth"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

var _ grpc.UnaryServerInterceptor
var _ grpc.StreamServerInterceptor

type userContextKey struct{}

type identityProvider interface {
	GetUserFromToken(token string) (*identity.User, error)
}

func UserAuthUnaryInterceptor(ip identityProvider) grpc.UnaryServerInterceptor {
	return func(
		ctx context.Context,
		req any,
		info *grpc.UnaryServerInfo,
		handler grpc.UnaryHandler,
	) (any, error) {
		token := auth.TokenFromContext(ctx)
		if token == "" {
			return nil, status.Errorf(codes.Unauthenticated, "missing auth token")
		}

		user, err := ip.GetUserFromToken(token)
		if err != nil {
			return nil, err
		}

		newCtx := context.WithValue(ctx, userContextKey{}, user)
		return handler(newCtx, req)
	}
}

func UserAuthStreamInterceptor(ip identityProvider) grpc.StreamServerInterceptor {
	return func(
		srv any,
		ss grpc.ServerStream,
		info *grpc.StreamServerInfo,
		handler grpc.StreamHandler,
	) error {
		token := auth.TokenFromContext(ss.Context())
		if token == "" {
			return status.Errorf(codes.Unauthenticated, "missing auth token")
		}

		user, err := ip.GetUserFromToken(token)
		if err != nil {
			return err
		}

		newCtx := context.WithValue(ss.Context(), userContextKey{}, user)

		return handler(srv, middleware.StreamWithContext(newCtx, ss))
	}
}

func UserFromContext(ctx context.Context) (*identity.User, bool) {
	user, ok := ctx.Value(userContextKey{}).(*identity.User)
	return user, ok
}
