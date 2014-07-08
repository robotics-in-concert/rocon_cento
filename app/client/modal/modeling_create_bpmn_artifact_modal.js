Template.modeling_create_bpmn_artifact_modal.created = function (){
    console.debug("Created!!! create modal");
    Session.set('jbpm_viewer_uuid', false);
    Session.set('jbpm_artifact_id', false);
    Session.get('jbpm_viewer_validation', false);
    
    Meteor.call('drools_url', function(err, result) {
      if (err){
        console.log(err);
        Session.set('drools_url', false);
      }
      else{
        Session.set('drools_url', result);
      }
    });
};

Template.modeling_create_bpmn_artifact_modal.helpers({
  'jbpm_viewer_uuid': function(wid){
    var uuid = Session.get('jbpm_viewer_uuid');
    if (uuid === ""){
        uuid = false;
    }
    return uuid;
  },
  'drools_url': function(){
    var url = Session.get('drools_url');
    return url;
  },
  
});

Template.modeling_create_bpmn_artifact_modal.events({
  'click .create_bpmn_artifact_create': function(e,t){
    Session.get('jbpm_viewer_validation');
    if(!Session.get('jbpm_viewer_validation')){
        alert("First save BPMN");
        return;
    }
    var uuid = Session.get('jbpm_viewer_uuid');
    var id = Session.get('jbpm_artifact_id');
    if(!uuid){
        alert("First open and save BPMN");
        console.log("First open and save BPMN");
        return;
    }  
    var data = {};
    data['_id'] = id;
    data['work_item_id'] = this._id;
    data['title'] = t.find(".bpmn_artifact_title").value;
    data['description'] = t.find(".bpmn_artifact_desc").value;
    data['uuid'] = uuid;
    var id = Cento.Artifacts.insert(data);
    var modal = $(e.target).closest('.modal');
    modal.modal('hide');
  },
    
 'click .create_bpmn_artifact_cancel': function(e){
    deleteOpendAsset();
    $(e.target).closest('.modal').modal('hide');
    return false;
  },
  
 'click .open_bpmn': function(e,template){
    
    var pkg_name = this._id;
    Session.set('jbpm_artifact_name', this._id);
    var data = "package "+pkg_name; //make the template
    var url= '';
    Meteor.call("drools_post", url, {}, data, function (err,result) {
            if (err){
                console.log(err);
                throw err;
            }
            else{
	          if(result.statusCode === 200){
	             var url = "/"+pkg_name+"/assets";
	             var id = Random.id()
	             header = {"Slug":id+".bpmn2"};
	             Meteor.call("drools_post",url,header,"",function (err,result) {
                            if (err){
                                console.log(err);
                                throw err;
                            }
                            else{
            	                var uuid = "";
            	                var version = "";
            	                if (window.DOMParser){
            	                    // It does not work in ie env.
                                    var parser = new DOMParser();
                                    var resultDoc = parser.parseFromString(result.content,"text/xml");
                                    uuid = resultDoc.getElementsByTagName('uuid')[0].childNodes[0].childNodes[0].nodeValue;
                                    version = resultDoc.getElementsByTagName('versionNumber')[0].childNodes[0].childNodes[0].nodeValue;
                                }
                                else{
                                    Session.set('jbpm_viewer_uuid', false);
                                }
                                Session.set('jbpm_viewer_uuid', uuid);
                                Session.set('jbpm_viewer_version', version);
                                Session.set('jbpm_artifact_id', id);
                                
                                
                                console.debug('jbpm_viewer_uuid', uuid);
                                console.debug('jbpm_viewer_version', version);
                                console.debug('jbpm_artifact_id', id);
                               
                                if(changeAssetTimerId === ""){ 
                                    changeAssetTimerId = Meteor.setInterval(checkChangeAsset, 3000);
                                }
                                else{
                                    Meteor.clearInterval(changeAssetTimerId);
                                    changeAssetTimerId = "";
                                    changeAssetTimerId = Meteor.setInterval(checkChangeAsset, 3000);
                                }
                            }
                      });
	        }
	       }
    });
	return false;
  },

 'click .create_bpmn_artifact_exit': function(e,template){
    return deleteOpendAsset();
  },
 'click .close_bpmn': function(e,template){
    return deleteOpendAsset();
  },
 
});

var changeAssetTimerId = "";
var checkChangeAsset = function(){
    var uuid = Session.get('jbpm_viewer_uuid');
    var version = Session.get('jbpm_viewer_version');
    var asset_name = Session.get('jbpm_artifact_id');
    var pkg_name = Session.get('jbpm_artifact_name');
    if (pkg_name === "" || pkg_name === undefined){
        return;
    }
    else if(asset_name === "" || asset_name === undefined){
        return;
    }
    var url = "/"+pkg_name+"/assets/"+asset_name; 
    Meteor.call("drools_get",url,function (err,result) {
            if (err){
                throw err;
            }
            else{
	            var contents = JSON.parse(result.content);
	            var current_version = version;
                if(current_version.toString() === contents.metadata.versionNumber.toString()){
                    
                }
                else{
                    Meteor.clearInterval(changeAssetTimerId);
                    changeAssetTimerId = ""
                    Session.set('jbpm_viewer_validation', true);
                }
                
            }
	});
};

var deleteOpendAsset = function(){
    var asset_name = Session.get('jbpm_artifact_id');
    var pkg_name = Session.get('jbpm_artifact_name');
    
    if (pkg_name === "" || pkg_name === undefined || pkg_name === false){
        return false;
    }
    else if(asset_name === "" || asset_name === undefined || asset_name === false){
        return false;
    }  
    var url = "/"+pkg_name+"/assets/"+asset_name;
    Meteor.call("drools_delete", url, function (err,result) {
        if (err){
        }
        else{
        }
    });
    Session.set('jbpm_viewer_uuid', false);
    Session.set('jbpm_artifact_id', false);
    Session.set('jbpm_artifact_name', false);
    Session.set('jbpm_viewer_validation', false);
    Meteor.clearInterval(changeAssetTimerId);
    changeAssetTimerId = ""
    return true;
};
