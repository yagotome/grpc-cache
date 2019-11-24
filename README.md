# gRPC cache

This is a simple in-memory cache service implemented on top of gRPC and protobuf.

The purpose of this repository is to show how simple it is to use gRPC by implementing a server in Go and a client in Node.js.

This code was created for the talk "[gRPC: Por que você ainda usa REST?](https://speakerdeck.com/yagotome/grpc-por-que-voce-ainda-usa-rest)"

## Running

### Pre-requisite

You'll need to have [Go](https://golang.org/doc/install) and [Node.js](https://nodejs.org/en/download/) environments set up to run.

### Server

Do enter in `server` folder, then type:

```shell
$ make start
```

### Client

Do enter in `client` folder, then do:

1. Install dependencies

```shell
$ yarn
```

2. Run

```shell
$ yarn start
```

### Evans

You could use [Evans](https://github.com/ktr0731/evans) to consume cache service as well.
