
Template.modeling_show_modal.helpers({
  'artifacts': function(wid){
    return Cento.Artifacts.find({work_item_id: wid});

  },
  'currentModelingItem': function(){
    return Cento.WorkItems.findOne({_id: this._id});
  }
});



Template.modeling_show_modal.events({
  'click .create_bpmn_artifact': function(){
    openModal('modeling_create_bpmn_artifact_modal', {_id: this._id});
    return false;
  },
  'click .create_artifact': function(){
    openModal('modeling_create_artifact_modal', {_id: this._id});
    return false;
  },
  'click .show_artifact': function(e){
    var aid = $(e.target).closest('li').data('artifact_id');
    openModal('modeling_show_artifact_modal', {_id: aid});
    return false;
  },
  'click .show_bpmn_artifact': function(e){
    var aid = $(e.target).closest('li').data('artifact_id');
    openModal('modeling_show_bpmn_artifact_modal', {_id: aid});
    return false;
  },
  

  'change select[name=status]': function(e){
    var newVal = $(e.target).val();
    console.log(newVal);
    Cento.WorkItems.update({_id: this._id}, {$set: {status: newVal}});
  },
  'click .upvote': function(e){
    Cento.WorkItems.update({_id: this._id}, {$inc: {votes:1}});
    $(e.target).closest('.modal').modal('hide');

  },
  'click .downvote': function(e){
    Cento.WorkItems.update({_id: this._id}, {$inc: {votes:-1}});
    $(e.target).closest('.modal').modal('hide');
  }


});
