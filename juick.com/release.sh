#!/bin/bash

src=everlasting-juick

coffee -c $src.src.coffee
cat $src.meta.js <(echo) $src.src.js > $src.user.js

git commit -a
