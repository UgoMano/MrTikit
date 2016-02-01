#!/bin/sh
cd /root/MrTikit
export GIT_SSH=/root/.ssh/git_wrap.sh
export EMAIL=joshbauer3@gmail.com
git fetch origin api-master --depth 1
git reset --hard origin/api-master
