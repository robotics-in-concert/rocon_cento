
Template.projects.events({
  'click .delete': function(){
    Cento.Solutions.update({_id: this._id}, {$set: {deleted_at: new Date()}});
    return false;
  }

});
