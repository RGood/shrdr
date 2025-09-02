PROTO_DIR=protos
OUT_DIR=common/pkg/generated

PROTOC=protoc
PROTOC_GEN_GO := $(shell which protoc-gen-go)
PROTOC_GEN_GO_GRPC := $(shell which protoc-gen-go-grpc)

.PHONY: protos
protos: clean
	@mkdir -p $(OUT_DIR)
	$(PROTOC) \
		--go_out=$(OUT_DIR) \
		--go_opt=paths=source_relative \
		--go-grpc_out=$(OUT_DIR) \
		--go-grpc_opt=paths=source_relative \
		-I $(PROTO_DIR) \
		$(PROTO_DIR)/**/*.proto

.PHONY: clean
clean:
	rm -rf $(OUT_DIR)
