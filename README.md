# SHRDR

Shredder

## Development

### Prerequisites

1. Golang
2. npm + yarn

### Getting Started

```shell
make install-tools
```

Installs:
* `protoc-gen-go`
* `protoc-gen-go-grpc`
* `protoc-gen-ts`

```shell
make protos
```

* Builds Golang & TS Protos
* Transpiles TS protos to cjs
