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
    var re = openModal('ideation_create_modeling_modal', {item: this});
    $('#modal-create-modeling').modal();
    return false;
  },

});
