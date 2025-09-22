PROTO_DIR=protos
GO_OUT_DIR=common/pkg/generated
TS_OUT_DIR=packages/protos/src/generated

PROTOC=protoc
PROTOC_GEN_GO := $(shell which protoc-gen-go)
PROTOC_GEN_GO_GRPC := $(shell which protoc-gen-go-grpc)

.PHONY: install-tools
install-tools:
	@go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
	@go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest
	@yarn

.PHONY: protos-go
protos-go:
	@mkdir -p $(GO_OUT_DIR)
	$(PROTOC) \
		--go_out=$(GO_OUT_DIR) \
		--go_opt=paths=source_relative \
		--go-grpc_out=$(GO_OUT_DIR) \
		--go-grpc_opt=paths=source_relative \
		-I $(PROTO_DIR) \
		$(PROTO_DIR)/**/*.proto

.PHONY: protos-ts
protos-ts:
	mkdir -p $(TS_OUT_DIR)
	yarn protos
	yarn workspace @shrdr/protos build

.PHONY: protos
protos: clean protos-go protos-ts

.PHONY: clean
clean:
	rm -rf $(GO_OUT_DIR) $(TS_OUT_DIR)

.PHONY: run
run:
	docker-compose up --build
