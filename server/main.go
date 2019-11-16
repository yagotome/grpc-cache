package main

import (
	"cache-server/cachepb"
	context "context"
	"log"
	"net"

	grpc "google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type service struct {
	store map[string]string
}

func (s service) Get(ctx context.Context, req *cachepb.GetArgs) (*cachepb.Item, error) {
	key := req.GetKey()
	value, exists := s.store[key]
	if !exists {
		return nil, status.Errorf(codes.NotFound, "'%s' not found", key)
	}
	return &cachepb.Item{
		Key:   key,
		Value: value,
	}, nil
}

func newCacheService() *service {
	return &service{
		store: map[string]string{"color": "green"},
	}
}

func main() {
	listener, _ := net.Listen("tcp", ":50051")
	grpcServer := grpc.NewServer()
	cachepb.RegisterCacheServiceServer(grpcServer, newCacheService())
	log.Println("Server listening on 50051")
	grpcServer.Serve(listener)
}
