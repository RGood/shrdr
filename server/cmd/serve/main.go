package main

import (
	"net"

	"github.com/RGood/shrdr/common/pkg/generated/identity"
	"github.com/RGood/shrdr/server/pkg/identityservice"
	"google.golang.org/grpc"
)

func main() {
	println("Starting shrdr service...")

	server := grpc.NewServer()

	println("Registering services...")
	identity.RegisterAuthenticationServer(server, identityservice.NewIdentityService())

	println("Starting network listener...")
	listener, err := net.Listen("tcp", ":8080")
	if err != nil {
		panic(err)
	}

	println("Starting gRPC server.")
	if err := server.Serve(listener); err != nil {
		panic(err)
	}

	println("Server shut down.")
}
