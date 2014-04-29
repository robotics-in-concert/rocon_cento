
Template.comments.events({
  'click .btn.comment': function(e){

    var f = $(e.target).closest('form');
    var id = this._id;
    var txt = f.find('textarea').val();
    
    Cento.WorkItems.update({_id: id},
        {$push: {comments:{_id: Random.id(), body: txt, 'created':new Date(), user_id: Meteor.userId()}}});
    f[0].reset();


    //email
    var m = txt.match(/@(\S+)/g);
    if(m){
      m.forEach(function(login){
        login = login.substr(1);
        Meteor.call('notify', login, 'notification : commented', txt);
      });

    }
      



    return false;
  },

  'click .delete_comment': function(e){
    var pid = $(e.target).closest('.work_item[data-id]').data('id');
    var cid = $(e.target).closest('li').data('comment_id');
    Cento.WorkItems.update({_id:pid}, {$pull:{comments:{_id: cid}}});
    return false;
  }
});
