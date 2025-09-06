# SHRDR

Shredder

## Development

### Prerequisites

1. Golang
2. npm + yarn

### Getting Started

```bash
make install-tools
```

Installs:
* `protoc-gen-go`
* `protoc-gen-go-grpc`
* `protoc-gen-ts`

```bash
make protos
```

* Builds Golang & TS Protos
* Transpiles TS protos to cjs
