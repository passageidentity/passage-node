#!/bin/bash
set -e

if [ -z "$1" ]; then
  echo "Required generator file is missing."
  exit 1
fi

file="$1"

rm -rf ./src/generated

docker run --rm -v "${PWD}:/local" -u $(id -u) openapitools/openapi-generator-cli:latest generate \
  -i "/local/$file" \
  -g typescript-fetch \
  -o /local/src/generated \
  --additional-properties=modelPropertyNaming=camelCase \
  --global-property apiTests=false,modelTests=false,apiDocs=false,modelDocs=false \
  --model-name-mappings CreateUserRequest=CreateUserArgs,UpdateUserRequest=UpdateUserArgs,UserInfo=PassageUser
