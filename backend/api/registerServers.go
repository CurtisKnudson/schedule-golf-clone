package api

import (
	authv1 "gitlab.com/schedule-golf/nicklaus/backend/gen/proto/go/schedule_golf/authentication/v1alpha1"
	hellov1 "gitlab.com/schedule-golf/nicklaus/backend/gen/proto/go/schedule_golf/hello/v1alpha1"
	"google.golang.org/grpc"
)

type GreeterServiceServer struct {
	hellov1.UnimplementedGreeterServiceServer
}

type AuthenticatorServiceServer struct {
	authv1.UnimplementedAuthenticatorServiceServer
}

func RegisterServers(grpcServer *grpc.Server) {

	hellov1.RegisterGreeterServiceServer(grpcServer, &GreeterServiceServer{})

	authv1.RegisterAuthenticatorServiceServer(grpcServer, &AuthenticatorServiceServer{})
}
