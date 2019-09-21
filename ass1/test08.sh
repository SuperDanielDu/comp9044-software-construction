#!/bin/sh

# branch

./legit-init
./legit-branch
#error
touch a
./legit-add a
./legit-commit -m commit-0
./legit-branch b1
./legit-branch
./legit-branch -d b1

