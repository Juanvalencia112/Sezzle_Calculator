FROM golang:alpine

WORKDIR /app

COPY go.mod ./
COPY . .

RUN go build -o server .

EXPOSE 8080

CMD ["./server"]