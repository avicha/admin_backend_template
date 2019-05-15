#!/bin/bash
set -e

projectName="PROJECT_NAME"
CODE_VERSION=`git rev-parse --short HEAD`
export CODE_VERSION=${CODE_VERSION}
if [ -z $NODE_ENV ]; then
    export NODE_ENV=development
fi

docker-compose -f docker/docker-compose.yaml -p ${projectName} down

if [ "$NODE_ENV" != "development" ]; then
    if [ `docker image ls ${projectName}-backend:${NODE_ENV} -q` ]; then
        docker image rm ${projectName}-backend:${NODE_ENV}
    fi

    if [ `docker image ls ${projectName}-redis:latest -q` ]; then
        docker image rm ${projectName}-redis:latest
    fi

    if [ `docker image ls ${projectName}-postgres:latest -q` ]; then
        docker image rm ${projectName}-postgres:latest
    fi
    docker image load -i docker/${projectName}-backend:${NODE_ENV}.tar
    docker image load -i docker/${projectName}-redis:latest.tar
    docker image load -i docker/${projectName}-postgres:latest.tar
fi

echo "running new stack named ${projectName}, port 16000, restart always, image ${projectName}-backend:${CODE_VERSION}"
docker-compose -f docker/docker-compose.yaml -p ${projectName} up -d
docker-compose -f docker/docker-compose.yaml -p ${projectName} logs -t --tail=200
