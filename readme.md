# Schedule Golf

#### World class golf booking software

[![Midgard Marketing](https://i.imgur.com/HeynSu0.jpg)](https://midgard.marketing)

Schedule Golf is a state of the art tee-time software for clubhouses and customers alike.

## Requirements

[Node.js](https://nodejs.org/) v17.7+
[Go](https://go.dev/doc/install) v1.18.3
[Protobuf](https://grpc.io/docs/protoc-installation/) v3.19.4
[Air](https://github.com/cosmtrek/air) Live Reload. Alternatively you can manually run the dev server with `go run main.go`

## Clone SSH

```sh
git clone git@gitlab.com:schedule-golf/nicklaus.git

cd nicklaus

yarn install

yarn run dev
```

```sh
cd backend
go mod tidy
air
```
