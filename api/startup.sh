#!/bin/sh
cd /MrTikit
export GIT_SSH=/root/.ssh/git_wrap.sh
export EMAIL=joshbauer3@gmail.com
git fetch origin api-master --depth 1
git reset --hard origin/api-master
#STEVE ADD API COMMANDS HERE (download libs and startup)