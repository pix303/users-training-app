#### Build step
# Golang image
FROM golang:1.19.3-alpine as build-env
 
# Set environment variable
ENV APP_NAME user-training-server
ENV CMD_PATH main.go
 
# Copy application data into image
COPY . $GOPATH/src/$APP_NAME
WORKDIR $GOPATH/src/$APP_NAME
 
# Budild application
RUN CGO_ENABLED=0 go build -v -o /$APP_NAME $GOPATH/src/$APP_NAME/$CMD_PATH
 
#### Run step
# Server host
FROM alpine:3.16
 
# Set environment variable
ENV APP_NAME user-training-server
 
# Copy only required data into this image
COPY --from=build-env /$APP_NAME .
 
# Expose application port
EXPOSE 8080
 
# Start app
CMD ./$APP_NAME