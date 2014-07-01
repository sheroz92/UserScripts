#!/bin/bash

src=everlasting-juick

cpp -DMETA=1 -DCODE=0 -CC -o $src.meta.coffee $src.user.coffee
coffee -bc $src.meta.coffee

git commit -a
