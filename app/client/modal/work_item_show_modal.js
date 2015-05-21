Template.work_item_show_modal.helpers({
  Type: function(){ return this.type.charAt(0).toUpperCase() + this.type.slice(1); }

});

Template.work_item_show_modal.events({
  'click .unsubscribe': function(e){
    var uid = Meteor.userId();
    Cento.WorkItems.update({_id: this._id}, {$pull: {subscribers: uid}});
    return false;

  },

  'click .subscribe': function(e){
    var uid = Meteor.userId();
    Cento.WorkItems.update({_id: this._id}, {$addToSet: {subscribers: uid}});
    return false;

  },

  'currentModelingItem': function(){
    return Cento.WorkItems.findOne({_id: this._id});
  },

  'click .upvote': function(e){
    Cento.WorkItems.update({_id: this._id}, {$inc: {votes:1}});
    $(e.target).closest('.modal').modal('hide');

  },

  'click .archive': function(e){
    Cento.WorkItems.update({_id: this._id}, {$set: {archive:true}});
    $(e.target).closest('.modal').modal('hide');
    return false;
  },

  'click .downvote': function(e){
    Cento.WorkItems.update({_id: this._id}, {$inc: {votes:-1}});
    $(e.target).closest('.modal').modal('hide');
  },

  'click .create_modeling': function(){
    openModal('ideation_create_modeling_modal', {_id: this._id});
    return false;
  },

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
    console.log("change status : ",this._id);
    Cento.WorkItems.update({_id: this._id}, {$set: {status: newVal}});
  },
});

