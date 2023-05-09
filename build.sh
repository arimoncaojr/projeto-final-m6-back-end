# // build.sh
#!/usr/bin/env bash
# exit on error
set -o errexit

yarn
yarn build
yarn typeorm migration:run -f dist/src/data-source.js