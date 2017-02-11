#!/usr/bin/env bash
GIT_DEPLOY_REPO=https://github.com/JulienPradet/julienpradet.github.io.git

cd build && \
rm -rf .git && \
git init && \
git add . && \
git commit -m "Deploy to GitHub Pages" && \
git push --force "${GIT_DEPLOY_REPO}" master:master
