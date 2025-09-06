package helpers

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestGenId(t *testing.T) {
	id := GenerateId(16)

	assert.Equal(t, 16, len(id), "ID should be 16 characters long")
}
