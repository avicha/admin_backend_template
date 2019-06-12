#!/bin/bash
set -e

projectName=$NAME
VERSION=$VERSION
export VERSION=${VERSION}

if [ -z $NODE_ENV ]; then
    export NODE_ENV=development
fi

image=${projectName}:${NODE_ENV}-${VERSION}

docker-compose -f publish/docker-compose.yaml -p ${projectName} down

if [ "$NODE_ENV" != "development" ]; then
    docker image load -i publish/${image}.tar
    docker image load -i publish/redis.tar
    docker image load -i publish/postgres.tar
fi

echo "running new project named ${projectName}, port 16000, restart always, image ${image}"
docker-compose -f publish/docker-compose.yaml -p ${projectName} up -d
docker-compose -f publish/docker-compose.yaml -p ${projectName} logs -t --tail=200