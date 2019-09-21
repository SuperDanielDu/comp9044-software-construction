#!/bin/sh

# test for commit -a -m

./legit-init
echo 0 >a
./legit-add a
./legit-commit -m commit-0
./legit-commit -a -m commit-0
#nothing to commit
echo 1 >>a
./legit-commit -a -m commit-1
#commited as commit 1
touch b
./legit-add b
./legit-commit -a -m commit-1
#nothing to commit

