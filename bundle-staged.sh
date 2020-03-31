#!/usr/bin/env bash

git checkout bundle.js
git stash push -k
rollup -c
git add bundle.js
git stash pop
