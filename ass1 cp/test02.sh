#!/bin/sh

# add commit show


./legit-init
touch a
./legit-add a
touch b
./legit-add b
./legit-commit -m commit-0
./legit-show 0:a
#ouput nothing
./legit-show 0:p
#legit-show: error: 'p' not found in commit 0

