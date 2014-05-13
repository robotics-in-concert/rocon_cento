Template.ideation_show_modal.helpers({
  'currentIdeation': function(){
    return Cento.WorkItems.findOne({_id: Session.get('currentIdeation')});
  }

});
Template.ideation_show_modal.events({
  'click .upvote': function(e){
    Cento.WorkItems.update({_id: this._id}, {$inc: {votes:1}});
    $(e.target).closest('.modal').modal('hide');

  },
  'click .downvote': function(e){
    Cento.WorkItems.update({_id: this._id}, {$inc: {votes:-1}});
    $(e.target).closest('.modal').modal('hide');
  },
  'click .create_modeling': function(){
    $('#modal-create-modeling').modal();
    return false;
  },

});
