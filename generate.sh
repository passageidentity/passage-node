#!/bin/bash
set -e

if [ -z "$1" ]; then
  echo "Required generator file is missing."
  exit 1
fi

file="$1"

rm -rf ./src/generated

docker run --rm -v "${PWD}:/local" openapitools/openapi-generator-cli:latest generate \
  -i "/local/$file" \
  -g typescript-fetch \
  -o /local/src/generated \
  --additional-properties=modelPropertyNaming=original