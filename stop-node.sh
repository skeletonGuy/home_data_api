#!/bin/bash
set -e

CONTAINER_NAME='temp_node'
docker stop $CONTAINER_NAME && docker rm $CONTAINER_NAME