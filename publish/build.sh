#!/bin/bash
set -e

if [ -z $NODE_ENV ]; then
    export NODE_ENV=development
fi

image=${PROJECT_NAME}:${NODE_ENV}-${APP_VERSION}

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

docker-compose -f publish/docker-compose.yaml -p ${PROJECT_NAME} down
build
sync_image