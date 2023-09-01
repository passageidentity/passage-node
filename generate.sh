# #!/bin/bash
# set -e

if [ -z "$1" ]; then
  echo "Required generator file is missing."
  exit 1
fi

file="$1"

rm -rf ./src/generated
npm install @openapitools/openapi-generator-cli -g

openapi-generator-cli generate \
  -i "$file" \
  -g typescript-fetch \
  -o ./src/generated \
  --additional-properties=modelPropertyNaming=original