#!/usr/bin/env sh

# abort on errors
set -e

rm -rf dist

# build
npm run build

# navigate into the build output directory
cd dist

# place .nojekyll to bypass Jekyll processing
echo > .nojekyll

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
# git checkout -b main
git checkout -b deploy
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:dxaviud/dxaviud.github.io.git main
git push -f git@github.com:dxaviud/dxaviud.github.io.git deploy

# if you are deploying to https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git main:gh-pages

cd ..
