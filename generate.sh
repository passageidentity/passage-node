#!/bin/bash
set -e

if [ -z "$1" ]; then
  echo "Required input file parameter is missing."
  exit 1
fi

input="$1"

openapi-generator generate \
  -g typescript-fetch \
  -i "$input" \
  -o ./src/generated

npx prettier -w ./src/generated