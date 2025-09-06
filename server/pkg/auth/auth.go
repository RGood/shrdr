package auth

import (
	"context"

	"github.com/RGood/shrdr/common/pkg/constants"
	"github.com/RGood/shrdr/common/pkg/helpers"
)

func TokenFromContext(ctx context.Context) string {
	return helpers.ValueFromIncomingContext(ctx, constants.HeaderAuth)
}
