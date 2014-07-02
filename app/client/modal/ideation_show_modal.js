Template.ideation_show_modal.events({

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

});
