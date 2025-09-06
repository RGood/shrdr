package auth

import (
	"context"

	"github.com/RGood/shrdr/common/pkg/constants"
	"github.com/RGood/shrdr/common/pkg/metadata"
)

func TokenFromContext(ctx context.Context) string {
	return metadata.ValueFromIncomingContext(ctx, constants.HeaderAuth)
}
