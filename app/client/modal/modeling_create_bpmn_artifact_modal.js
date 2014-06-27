Template.modeling_create_bpmn_artifact_modal.rendered = function (){
    Session.set('jbpm_viewer_uuid', false);
    Session.set('jbpm_artifact_id', false);
};

Template.modeling_create_bpmn_artifact_modal.helpers({
  'jbpm_viewer_uuid': function(wid){
    var uuid = Session.get('jbpm_viewer_uuid');
    if (uuid === ""){
        uuid = false;
    }
    return uuid;
  }
});

Template.modeling_create_bpmn_artifact_modal.events({
  'click .create_bpmn_artifact_create': function(e,t){
    var uuid = Session.get('jbpm_viewer_uuid');
    var id = Session.get('jbpm_artifact_id');
    if(!uuid){
        console.log("First open and save BPMN");
        return;
    }  
    var data = {};
    data['_id'] = id;
    data['work_item_id'] = this._id;
    data['title'] = t.find(".bpmn_artifact_title").value;
    data['description'] = t.find(".bpmn_artifact_desc").value;
    data['uuid'] = uuid;
    console.log('data: ',data);
    var id = Cento.Artifacts.insert(data);
    console.log('id: ',id);
    var modal = $(e.target).closest('.modal');
    modal.modal('hide');
  },
    
 'click .create_bpmn_artifact_cancel': function(e){
    var uuid = Session.get('jbpm_viewer_uuid');
    Session.set('jbpm_viewer_uuid', false);
    $(e.target).closest('.modal').modal('hide');
    return false;
  },
  
 'click .open_bpmn': function(e,template){
    var pkg_name = this._id;
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
            	                
            	                if (window.DOMParser){
            	                    // It does not work in ie env.
                                    var parser = new DOMParser();
                                    var resultDoc = parser.parseFromString(result.content,"text/xml");
                                    uuid = resultDoc.getElementsByTagName('uuid')[0].childNodes[0].childNodes[0].nodeValue;
                                }
                                else{
                                    Session.set('jbpm_viewer_uuid', false);
                                }
                                Session.set('jbpm_viewer_uuid', uuid);
                                Session.set('jbpm_artifact_id', id);
                            }
                      });
	        }
	       }
    });
	return false;
  },
  
 'click .close_bpmn': function(e,template){
    Session.set('jbpm_viewer_uuid', false);
    return false;
  }
});
