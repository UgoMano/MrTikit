#!/bin/sh
exec /usr/bin/ssh -o StrictHostKeyCHecking=no -i /root/.ssh/git_rsa "$@"