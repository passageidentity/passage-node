#!/bin/bash
npm i beachball@2.20.0

case "$1" in
  "beachball-bump")
    echo "Running 'beachball bump'"
    npx beachball bump
    ;;
  "beachball-check")
    echo "Running 'beachball check'"
    npx beachball check
    ;;
  "beachball-publish")
    echo "Running 'beachball publish -y -n'"
    npx beachball publish -y -n
    ;;
  "beachball-change")
    echo "Running 'beachball change'"
    npx beachball change
    ;;
  "set-version")
    echo "{\"version\":\"$npm_package_name $npm_package_version\"}" > ./src/utils/config.json
    ;;
  "prepare")
    echo "Running 'husky install'"
    npm i husky
    npx husky install
    ;;
  *)
    echo "Invalid script name. Available options: beachball-bump, beachball-check, beachball-publish, beachball-change, set-version, prepare"
    ;;
esac
