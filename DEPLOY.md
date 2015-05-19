## Deployment Instruction


### cold deploy

#### Server
1. install nodejs, mongodb
2. prepare mongodb seed data

```
db.meteor_accounts_loginServiceConfiguration.insert({
	"_id" : "Arbitary Value like(S5mtDCFeruAAEgSnC)",
	"service" : "github", "clientId" : "Your Client ID", 
	"secret" :"Your Client Secret" })
```

2. create `DEPLOY_PATH` : `mkdir DEPLOY_PATH`
1. clone cento repo to `PROJECT ROOT/git` : 
	1. `cd DEPLOY_PATH`
	1. `git clone git@github.com:robotics-in-concert/rocon_cento.git git`

1. install forever : `npm install forever -g`
1. install meteor : `curl https://install.meteor.com | /bin/sh`
1. install metorite : `npm install meteorite -g`

#### Local
1. create `deploy/config` file
	1. `cp deploy/config.sample deploy/config`
	1. edit `deploy/config`
1. run `deploy.sh`


### warm deploy
1. edit code
2. git commit and push
3. run `./deploy.sh`
