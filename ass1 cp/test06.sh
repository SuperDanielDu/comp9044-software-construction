#!/bin/sh

# rm

touch a
touch b
touch c
touch d
touch e
./legit-init
./legit-add a b c d

./legit-rm a
./legit-rm -cached b
./legit-rm -force b
./legit-rm -force -cached c
./legit-rm -force d
./legit-rm e
