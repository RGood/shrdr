package helpers

import (
	"context"
	"strings"

	"google.golang.org/grpc/metadata"
)

func ValueFromIncomingContext(ctx context.Context, key string) string {
	md := metadata.ValueFromIncomingContext(ctx, key)
	if md == nil {
		return ""
	}
	return strings.Join(md, ",")
}
