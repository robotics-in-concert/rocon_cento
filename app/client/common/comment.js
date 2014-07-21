Template.comment.helpers({
  'childComments': function(id){
    return Cento.Comments.find({parent_id: id});
  }

});
Template.comment.events({

  'click a.reply': function(e){
    var $wrap = $(e.target).closest('.comment');
    $wrap.find('form.reply:eq(0)').show();
    return false;
  },

  'click button.reply': function(e){
    var $f = $(e.target).closest('form');
    var body = $f.find('textarea').val();

    var parent = this;
    var data = {body: body, parent_item_id: parent.parent_item_id, parent_id: parent._id,  created:new Date(), user_id: Meteor.userId()};
    Cento.Comments.insert(data);
    Cento.WorkItems.update({_id: parent.parent_item_id}, {$inc: {comments_count: 1}});


    $f[0].reset();
    $f.hide();
    return false;

  },
  'click .delete_comment': function(e, tpl){
    var cid = this._id;
    Cento.Comments.remove({_id:cid});
    console.log("comment deleted : ", cid, pid);

    return false;
  },

});
