# syntax=docker/dockerfile:1

FROM golang:latest

WORKDIR /app

COPY . .

RUN go mod tidy

RUN go build -o /schedule-golf-api

EXPOSE 8080

CMD [ "/schedule-golf-api" ]