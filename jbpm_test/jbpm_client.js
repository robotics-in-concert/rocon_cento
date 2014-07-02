if (Meteor.isClient) {
  //var bpmn = '<?xml version="1.0" encoding="UTF-8"?><bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.omg.org/bpmn20" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:drools="http://www.jboss.org/drools" id="" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd" targetNamespace="http://www.omg.org/bpmn20">  <bpmn2:process id="$(PACKAGE_NAME).$(ASSET_NAME)" drools:packageName="$(PACKAGE_NAME)" name="$(ASSET_NAME)" isExecutable="true"/>  <bpmndi:BPMNDiagram id="">    <bpmndi:BPMNPlane id="" bpmnElement="$(PACKAGE_NAME).$(ASSET_NAME)"/>  </bpmndi:BPMNDiagram>  <bpmn2:relationship id="">    <bpmn2:extensionElements>      <drools:ProcessAnalysisData>        <drools:Scenario xsi:type="drools:Scenario" id="default" name="Simulationscenario">          <drools:ScenarioParameters xsi:type="drools:ScenarioParameters_._type" baseTimeUnit="s"/>        </drools:Scenario>      </drools:ProcessAnalysisData>    </bpmn2:extensionElements>    <bpmn2:source></bpmn2:source>    <bpmn2:target></bpmn2:target>  </bpmn2:relationship></bpmn2:definitions>';
  var bpmn = '<?xml version="1.0" encoding="UTF-8"?><bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.omg.org/bpmn20" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:drools="http://www.jboss.org/drools" id="_MeSecOFLEeO0H5X2cuy8hQ" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd" targetNamespace="http://www.omg.org/bpmn20"><bpmn2:process id="mySolution.DeliveryServices" drools:packageName="mySolution" name="DeliveryServices" isExecutable="true"/><bpmndi:BPMNDiagram id="$(ID)"><bpmndi:BPMNPlane id="$(ID)" bpmnElement="mySolution.DeliveryServices"/></bpmndi:BPMNDiagram><bpmn2:relationship id="_MeSec-FLEeO0H5X2cuy8hQ"><bpmn2:extensionElements>  <drools:ProcessAnalysisData>    <drools:Scenario xsi:type="drools:Scenario" id="default" name="Simulationscenario">      <drools:ScenarioParameters xsi:type="drools:ScenarioParameters_._type" baseTimeUnit="s"/>    </drools:Scenario>  </drools:ProcessAnalysisData></bpmn2:extensionElements><bpmn2:source>_MeSecOFLEeO0H5X2cuy8hQ</bpmn2:source><bpmn2:target>_MeSecOFLEeO0H5X2cuy8hQ</bpmn2:target></bpmn2:relationship></bpmn2:definitions>';

  Template.hello.greeting = function () {
    return "Welcome to jbpm_client.";
  };
  Template.hello.packages = function(){
    return Session.get("packages");
  };
  Template.hello.assets = function(){
    return Session.get("assets");
  };
  Template.hello.is_process = function(){
    var value = Session.get("is_process");
    return value;
  };
 
  Template.hello.events({
   'click .cento-select-asset-btn': function (event,template) {
     if (typeof console !== 'undefined'){
        uuid = template.find(".cento-select-asset-text").value;
        Session.set("is_process",uuid);
     }
   },
   'click .cento-create-asset-btn': function (event,template) {
      if (typeof console !== 'undefined')
        pkg_name = template.find(".cento-get-asset-list-text").value;
        url = 'http://localhost:8080/drools-guvnor/rest/packages'+"/"+pkg_name+"/assets";
        auth = "krisv:krisv";
        asset_name = template.find(".cento-create-asset-text").value;
        if (pkg_name === ""){
            return;
        }
        //make the template
        //data = bpmn.replace(/$(PACKAGE_NAME)/gi,pkg_name).replace(/$(ASSET_NAME)/gi,asset_name);
        data = bpmn;
        //data = "";
        console.log(pkg_name);
        console.log(asset_name);
        console.log(data);
        Meteor.call("drools_post",url,auth,data,asset_name,function (err,result) {
	            if (err){
	                console.log(err);
	                throw err;
	            }
	            else{
    	          console.log(result);
	            }
    	});
    },
    
    'click .cento-get-asset-list-btn': function (event,template) {
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
        pkg_name = template.find(".cento-get-asset-list-text").value;
        url = 'http://localhost:8080/drools-guvnor/rest/packages'+"/"+pkg_name+"/assets";
        auth = "krisv:krisv";
        Meteor.call("drools_get",url,auth,function (err,result) {
	            if (err){
	                console.log(err);
	                throw err;
	            }
	            else{
	                console.log(result);
    	            if (result.statusCode == 200){
    	                contents = JSON.parse(result.content);
    	                assets = [];
    	                for(i  = 0; i < contents.length ; i++){
    	                    if (contents[i].metadata.format === "bpmn2"){
    	                        var title = contents[i].title;
    	                        var uuid = contents[i].metadata.uuid
    	                        var asset = { "title":title, "uuid": uuid };
    	                        assets.push(asset);
    	                        console.log(contents[i].title);
    	                        console.log(contents[i].metadata.uuid);
    	                    }
    	                    else{
    	                        console.log(contents[i].title," Not bpmn2");
    	                    }
    	                }
    	                Session.set("assets",assets);
    	            }
	            }
    	});
    },
    
    'click .cento-get-pkg-list-btn': function () {
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
        url = 'http://localhost:8080/drools-guvnor/rest/packages';
        auth = "krisv:krisv"
        Meteor.call("drools_get",url,auth,function (err,result) {
	            if (err){
	                console.log(err);
	                throw err;
	            }
	            else{
    	            if (result.statusCode == 200){
    	                console.log(result);
    	                contents = JSON.parse(result.content);
    	                packages = [];
    	                for(var i = 0;i < contents.length ; i++){
    	                    var package = {"title": contents[i].title};
    	                    packages.push(package);
    	                    console.log(contents[i].title);
    	                    console.log(contents[i].assets);
    	                }
    	                Session.set("packages",packages);
    	            }
	            }
    	});
    },
    'click .cento-create-pkg-btn': function (event,template) {
      if (typeof console !== 'undefined')
        url = 'http://localhost:8080/drools-guvnor/rest/packages';
        auth = "krisv:krisv"
        pkg_name = template.find(".cento-create-pkg-text").value;
        if (pkg_name === ""){
            return;
        }

        data = "package "+pkg_name; //make the template
        console.log(data);
        Meteor.call("drools_post",url,auth,data,function (err,result) {
	            if (err){
	                console.log(err);
	                throw err;
	            }
	            else{
    	          console.log(result);
	            }
    	});
    },
    'click .cento-delete-pkg-btn': function (event,template) {
      if (typeof console !== 'undefined')
        url = 'http://localhost:8080/drools-guvnor/rest/packages';
        auth = "krisv:krisv"
        pkg_name = template.find(".cento-delete-pkg-text").value;
        if (pkg_name === ""){ // add the filter condition.(ex. number, etc..)
            return;
        } 
        data = pkg_name;
        Meteor.call("drools_delete",url,auth,data,function (err,result) {
	            if (err){
	                console.log(err);
	                throw err;
	            }
	            else{
    	          console.log(result);
	            }
    	});
    }
  });
}

if (Meteor.isServer) {
  Meteor.methods({
  drools_get : function(call_url, call_auth){
    console.log(call_url);
    var result = Meteor.http.call("GET", 
                                  call_url,
                                  {headers:{dataType:"application/json"},
                                   auth:call_auth
                                  });
    return result;
  },

  drools_post : function(call_url, call_auth, data){
    var result = Meteor.http.call("POST", 
                                  call_url,
                                  {headers:{"Content-Type":"application/octet-stream",},
                                   auth:call_auth,
                                   content:data}
                                  );
    return result;
  },
  
  drools_put : function(){},
  drools_delete : function(call_url, call_auth, data){
    delete_pkg_url = call_url+"/"+data;
    var result = Meteor.http.call("DELETE", 
                                  delete_pkg_url,
                                  {auth:call_auth}
                                  );
    return result;
  }
  });
}
