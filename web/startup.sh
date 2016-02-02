#!/bin/sh
cd /MrTikit
export GIT_SSH=/root/.ssh/git_wrap.sh
export EMAIL=joshbauer3@gmail.com
git fetch origin web-master --depth 1
git reset --hard origin/web-master
npm install -g bower
bower install --allow-root
service apache2 start
