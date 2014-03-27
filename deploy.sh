#!/bin/sh

DD=`date +%Y%m%dT%H%M%S`

[[ -z "$DEPLOY_HOST" ]] && exit 1;
[[ -z "$DEPLOY_PATH" ]] && exit 1
[[ -z "$PORT" ]] && exit 1
[[ -z "$MONGO_URL" ]] && exit 1
[[ -z "$ROOT_URL" ]] && exit 1

CMD="
export PORT=$PORT;
export ROOT_URL=$ROOT_URL;
export MONGO_URL=$MONGO_URL;

cd $DEPLOY_PATH/git;

echo 'update code';
git pull;
mrt bundle $DEPLOY_PATH/bundle.tgz;

cd $DEPLOY_PATH;

echo 'stop server';
forever --plain stop $DEPLOY_PATH/bundle/main.js;
mv $DEPLOY_PATH/bundle $DEPLOY_PATH/bundle.$DD;
tar xzvf $DEPLOY_PATH/bundle.tgz > /dev/null;


echo 'clean';
rm $DEPLOY_PATH/bundle.tgz;
forever --plain start $DEPLOY_PATH/bundle/main.js;
"


ssh $DEPLOY_HOST $CMD




