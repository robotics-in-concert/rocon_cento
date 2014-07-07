Template.modeling_show_bpmn_artifact_modal.created = function (){
    console.debug("Created!!! show modal");
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


Template.modeling_show_bpmn_artifact_modal.helpers({
  'drools_url': function(){
    var url = Session.get('drools_url');
    return url;
  },
});


