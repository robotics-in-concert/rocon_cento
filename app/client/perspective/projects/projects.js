
Template.projects.events({
  'click .delete': function(){
    Cento.Solutions.update({_id: this._id}, {$set: {deleted_at: new Date()}});
    return false;
  },
  'click .go': function(e){
    var t = $(e.target).siblings('select').val();
    location.href = '/projects/'+this._id+'/'+t;
    return false;
  }


});
