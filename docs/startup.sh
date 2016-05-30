#!/bin/sh
cd /MrTikit
export GIT_SSH=/root/.ssh/git_wrap.sh
export EMAIL=joshbauer3@gmail.com
git fetch origin api-doc --depth 1
git reset --hard origin/api-doc
#npm install -g bower
#bower install --allow-root --force-latest
npm install
npm start
#STEVE ADD API COMMANDS HERE (download libs and startup)
#sails lift --prod
#node_modules/sails/bin/sails.js  lift --prod
