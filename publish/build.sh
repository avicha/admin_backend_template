#!/bin/bash
set -e

projectName=$NAME
VERSION=$VERSION
export VERSION=${VERSION}
if [ -z $NODE_ENV ]; then
    export NODE_ENV=development
fi
image=${projectName}:${NODE_ENV}-${VERSION}
build(){
    if [ `docker image ls ${image} -q` ]; then
        docker image rm ${image}
    fi
    docker build -f ./publish/Dockerfile --no-cache -t ${image} .
    echo "build ${image} success."
}

sync_image(){
    echo "saving image ${image}"
    docker image save -o publish/${image}.tar ${image}
    docker image save -o publish/redis.tar redis
    docker image save -o publish/postgres.tar postgres:11
    chmod 777 publish/${image}.tar
    chmod 777 publish/redis.tar
    chmod 777 publish/postgres.tar
}
if [ "$NODE_ENV" = "development" ]; then
    docker-compose -f publish/docker-compose.yaml -p ${projectName} down
fi
build

if [ "$NODE_ENV" = "development" ]; then
    docker-compose -f publish/docker-compose.yaml -p ${projectName} up -d
else
    sync_image
fi