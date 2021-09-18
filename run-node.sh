#/bin/bash
set -e

echo "building node image"
docker build -t node-api .

CONTAINER_NAME='temp_node'
docker run --name $CONTAINER_NAME -d -p 3000:3000 node-api
