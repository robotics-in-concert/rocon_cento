
Template.modeling_show_modal.helpers({
  'artifacts': function(wid){
    return Cento.Artifacts.find({work_item_id: wid});

  },
  'currentModelingItem': function(){
    return Cento.WorkItems.findOne({_id: Session.get('currentModelingItem')});
  }
});



Template.modeling_show_modal.events({
  'click .upvote': function(e){
    Cento.WorkItems.update({_id: this._id}, {$inc: {votes:1}});
    $(e.target).closest('.modal').modal('hide');

  },
  'click .downvote': function(e){
    Cento.WorkItems.update({_id: this._id}, {$inc: {votes:-1}});
    $(e.target).closest('.modal').modal('hide');
  }


});
