#!/bin/sh

# test for double add commit

./legit-init
touch a
./legit-add a
./legit-add a
#output nothing
./legit-commit -m commit-0
#Committed as commit 0
./legit-commit -m commit-0
#nothing to commit
touch b
./legit-add b
./legit-commit -m commit-1
#Committed as commit 1

