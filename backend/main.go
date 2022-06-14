package main

import (
	"log"
	"net/http"
	"os"

	_ "github.com/go-sql-driver/mysql"
	"github.com/improbable-eng/grpc-web/go/grpcweb"
	"gitlab.com/schedule-golf/nicklaus/backend/api"
	variables "gitlab.com/schedule-golf/nicklaus/backend/environment"
	"gitlab.com/schedule-golf/nicklaus/backend/middleware"

	"google.golang.org/grpc"
)

func main() {
	variables.InitEnv()
	port := os.Getenv("PORT")

	if port == "" {
		port = "8080"
		log.Printf("defaulting to port %s", port)
	}

	grpcServer := grpc.NewServer()

	api.RegisterServers(grpcServer)

	wrappedGrpc := grpcweb.WrapServer(grpcServer)

	log.Println("Serving API on: " + port)

	if err := http.ListenAndServe(":"+port, middleware.NewGrpcWebMiddleware(wrappedGrpc).Handler()); err != nil {
		log.Fatalf("failed starting http2 server: %v", err)
	}
}
