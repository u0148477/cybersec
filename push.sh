#!/bin/bash

git add *
git commit -a -m "$(date +%Y%m%d%H%M)"
git push
