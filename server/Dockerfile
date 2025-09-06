
FROM golang:1.25 AS build

WORKDIR /build

COPY common ./common
COPY go.work go.work.sum ./

WORKDIR /build/server

COPY server/go.mod server/go.sum ./
RUN go mod download

COPY server .

# Build the Go app
RUN CGO_ENABLED=0 go build -o server ./cmd/serve

FROM scratch
COPY --from=build /build/server/server /server

CMD ["/server"]
