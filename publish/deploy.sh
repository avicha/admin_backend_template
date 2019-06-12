#!/bin/bash
set -e

if [ -z $NODE_ENV ]; then
    export NODE_ENV=development
fi

image=${PROJECT_NAME}:${NODE_ENV}-${APP_VERSION}

docker-compose -f publish/docker-compose.yaml -p ${PROJECT_NAME} down

docker image load -i publish/${image}.tar
docker image load -i publish/redis.tar
docker image load -i publish/postgres.tar

echo "running new project named ${PROJECT_NAME}, restart always, image ${image}"
docker-compose -f publish/docker-compose.yaml -p ${PROJECT_NAME} up -d
docker-compose -f publish/docker-compose.yaml -p ${PROJECT_NAME} logs -t --tail=200