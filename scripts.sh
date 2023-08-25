#!/bin/bash

# Check for the script name provided as an argument
case "$1" in
  "beachball-bump")
    echo "Running 'beachball bump'"
    beachball bump
    ;;
  "beachball-check")
    echo "Running 'beachball check'"
    beachball check
    ;;
  "beachball-publish")
    echo "Running 'beachball publish -y -n'"
    beachball publish -y -n
    ;;
  "beachball-change")
    echo "Running 'beachball change'"
    beachball change
    ;;
  "set-version")
    echo "{\"version\":\"$npm_package_name $npm_package_version\"}" > ./src/utils/config.json
    ;;
  "prepare")
    echo "Running 'husky install'"
    husky install
    ;;
  *)
    echo "Invalid script name. Available options: beachball-bump, beachball-check, beachball-publish, beachball-change, set-version, prepare"
    ;;
esac
