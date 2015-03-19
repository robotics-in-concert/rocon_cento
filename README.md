cento_server
============

## Quick Start

    git clone git@github.com:robotics-in-concert/rocon_cento.git
    cd rocon-cento/app
    mrt

## Pre-requisites

 - [node/npm](http://nodejs.org/download/)
 - [git](http://git-scm.com/downloads)
 - [Meteor](http://docs.meteor.com)
 - [Meteorite](https://atmospherejs.com/docs/installing)

### Recommended Install on Ubuntu Precise 12.04

    sudo add-apt-repository ppa:chris-lea/node.js
    sudo apt-get update
    sudo apt-get install python-software-properties python g++ make nodejs curl
    curl https://install.meteor.com | /bin/sh
    sudo npm install -g meteorite
    sudo rm -Rf ~/tmp
    
### Run on a private machine

 - Register application to Github (https://github.com/settings/applications)
  - Fill Homepage URL and Authorization callback URL form:
    - Homepage URL: http://localhost:3000
    - Authorization callback URL: http://localhost:3000/_oauth/github?close
 - Connect to mongoDB and insert login service configuration
  
    ``` 
    use cento
    db.meteor_accounts_loginServiceConfiguration.insert({ "_id" : "Arbitary Value like(S5mtDCFeruAAEgSnC)",
    "service" : "github", "clientId" : "Your Client ID", "secret" :
"Your Client Secret" })
    ```
 - Run
 
  ``` ROOT_URL=Your URL:Port MONGO_URL=mongodb://localhost:27017/cento mrt ```
 
jbpm
============

## Install

- Install ant if necessary.
```
>> sudo apt-get update
>> sudo apt-get install ant -y
```
- Download jbpm full installer from [sourceforge](http://sourceforge.net/projects/jbpm/files/jBPM%205/jbpm-5.4.0.Final/), using the direct link and unzip.
```
>> wget http://downloads.sourceforge.net/project/jbpm/jBPM%205/jbpm-5.4.0.Final/jbpm-5.4.0.Final-installer-full.zip
>> unzip jbpm-5.4.0.Final-installer-full.zip
>> cd jbpm-installer/
```
- Edit **build.xml** to change the property *jboss.bind.address* to “0.0.0.0”.
- Edit **standalone.xml** two part.
    1. Change the interfaces section: make all three of “management”, “public” and “unsecure” interfaces bind to “0.0.0.0”.
    ```
<interface name="management">
  <inet-address value="0.0.0.0"/>
</interface>
<interface name="public">
  <inet-address value="0.0.0.0"/>
</interface>
<interface name="unsecure">
  <inet-address value="0.0.0.0"/>
</interface>
    ```
    1. Change *deployment-timeout* to "1200"
- Install jbpm server and start
```
>> ant install.demo.noeclipse
>> ant start.demo.noeclipse
```
- Stop jbpm server
```
>> ant stop.demo
```


Backup / Restoration
====================

Mongodb
-------

See [Back Up and Restore with MongoDB Tools](http://docs.mongodb.org/manual/tutorial/backup-with-mongodump/)


* backup
	* `mongodump --host localhost:27017 --db DBNAME --out DUMP_PATH`
		


* restore
	* `mongorestore --host localhost:27017 DUMP_PATH` 


* example


```
$ mongodump --host localhost:27017 --db cento --out /tmp/dump
connected to: localhost:27017
2015-03-19T17:23:24.015+0900 DATABASE: cento	 to 	/tmp/dump/cento

$ mongorestore --host localhost:27017 /tmp/dump
connected to: localhost:27017
```