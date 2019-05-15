#!/bin/bash
set -e

projectName="PROJECT_NAME"
CODE_VERSION=`git rev-parse --short HEAD`
export CODE_VERSION=${CODE_VERSION}
if [ -z $NODE_ENV ]; then
    export NODE_ENV=development
fi

build(){
    if [ `docker image ls ${projectName}-backend:${NODE_ENV} -q` ]; then
        docker image rm ${projectName}-backend:${NODE_ENV}
    fi
    docker build -f ./docker/Dockerfile -t ${projectName}-backend:${NODE_ENV} .
    echo "build ${projectName}-backend:${CODE_VERSION} success."
}

sync_image(){
    echo "saving image ${projectName}-backend:${CODE_VERSION}"
    docker image save -o docker/${projectName}-backend:${NODE_ENV}.tar ${projectName}-backend:${NODE_ENV}
    docker image save -o docker/${projectName}-redis:latest.tar ${projectName}-redis:latest
    docker image save -o docker/${projectName}-postgres:latest.tar ${projectName}-postgres:latest
}
if [ "$NODE_ENV" = "development" ]; then
    docker-compose -f docker/docker-compose.yaml -p ${projectName} down
fi

build

if [ "$NODE_ENV" = "development" ]; then
    docker-compose -f docker/docker-compose.yaml -p ${projectName} up -d
else
    sync_image
fi
