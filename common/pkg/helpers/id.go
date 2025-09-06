package helpers

import (
	"math/rand"
	"strconv"
	"strings"
)

func GenerateId(length int) string {
	chrs := make([]string, length)
	for i := range chrs {
		chrs[i] = strconv.FormatInt(rand.Int63n(36), 36)
	}
	return strings.Join(chrs, "")
}
