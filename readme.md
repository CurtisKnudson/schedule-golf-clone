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

## Local DB
Running a local db is easy with docker compose

If needed, docker compose can be installed [here](https://docs.docker.com/compose/install/)

Before running the db, there are a few env vars which need to be set. 
This can easily be done by creating a .env.local file which has the following
vars

```
MYSQL_RW_USER_PASSWORD=testuserpassword
MYSQL_ROOT_PASSWORD=testrootpassword
```

To export these vars in your current shell, simply run 
```shell
source setlocalenv.sh
```

Then create and run the db
```shell
docker-compose -f docker-compose-mysql.yml up -d
```

This will create the container in the background
To kill the running db container, use
```shell
docker-compose -f docker-compose-mysql.yml down -v
```
