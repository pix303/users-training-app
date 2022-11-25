#### Build step
# Golang image
FROM golang:1.19-alpine
 
# Set environment variable
ENV CMD_PATH main.go
 
# Copy application data into image
RUN mkdir /app
WORKDIR /app

COPY go.mod ./
COPY go.sum ./

RUN go mod download

COPY . ./

RUN go build -o /user-server

CMD ["/user-server"]