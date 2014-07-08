#!/bin/bash

DD=`date +%Y%m%dT%H%M%S`

source deploy/config

[[ -z "$DEPLOY_HOST" ]] && exit 1;
[[ -z "$DEPLOY_PATH" ]] && exit 1
[[ -z "$PORT" ]] && exit 1
[[ -z "$MONGO_URL" ]] && exit 1
[[ -z "$ROOT_URL" ]] && exit 1
[[ -z "$DROOLS_URL" ]] && exit 1

CMD="
export PORT=$PORT;
export ROOT_URL=$ROOT_URL;
export MONGO_URL=$MONGO_URL;
export MAIL_URL=$MAIL_URL;
export DROOLS_URL=$DROOLS_URL;

cd $DEPLOY_PATH/git;

echo 'update code';
git pull > /dev/null;


echo 'bundle package';
cd $DEPLOY_PATH/git/app;
mrt bundle $DEPLOY_PATH/bundle.tgz > /dev/null;

cd $DEPLOY_PATH;

echo 'stop server';
forever --plain -s stop $DEPLOY_PATH/bundle/main.js > /dev/null;
mv $DEPLOY_PATH/bundle $DEPLOY_PATH/bundle.$DD;
tar xzvf $DEPLOY_PATH/bundle.tgz > /dev/null;


echo 'clean';
rm $DEPLOY_PATH/bundle.tgz;

echo 'start server';
forever --plain -s start $DEPLOY_PATH/bundle/main.js > /dev/null;
"


ssh $DEPLOY_HOST $CMD




