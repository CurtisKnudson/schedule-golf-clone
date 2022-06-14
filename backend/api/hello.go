package api

import (
	"context"
	"log"

	hellov1 "gitlab.com/schedule-golf/nicklaus/backend/gen/proto/go/schedule_golf/hello/v1alpha1"
)

// SayHello implements helloworld.GreeterServer
func (s *GreeterServiceServer) SayHello(ctx context.Context, in *hellov1.SayHelloRequest) (*hellov1.SayHelloResponse, error) {
	log.Printf("Received: %v", in.GetName())
	return &hellov1.SayHelloResponse{Message: "Hello " + in.GetName()}, nil
}
