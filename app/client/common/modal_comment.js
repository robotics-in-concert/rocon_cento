Template.modal_comment.helpers({
  'commentFiles': function(){
    return Session.get('currentCommentFiles');
  }

});
Template.modal_comment.events({
  'click .attach': function(e){
    $('input[type=file]').click();

  },
  'change input[type=file]': function(e){
    $input = $(e.target);
    var file = $input[0].files[0];
    
    Meteor.saveFile(file, function(e, r){
      console.log(r);
      $input.val('');
      Session.set('currentCommentFiles', [r]);

      
      // Cento.Artifacts.update({_id: id}, {$push: {attachments: {name: r}}});
    });

  },
  'click .btn.comment': function(e){

    var f = $(e.target).closest('form');
    var id = this._id;
    var txt = f.find('textarea').val();

    var attachments = [];

    var curFiles = Session.get('currentCommentFiles');
    if(curFiles && curFiles.length > 0){
      attachments = curFiles;
    }

    if(this.type != null && this.type != ''){
      Cento.WorkItems.update({_id: id},
          {$push: {comments:{_id: Random.id(), body: txt, 'created':new Date(), user_id: Meteor.userId(), attachments: attachments}}});
    }else{
      Cento.Artifacts.update({_id: id},
          {$push: {comments:{_id: Random.id(), body: txt, 'created':new Date(), user_id: Meteor.userId()}}});
    }
    Cento.createAction(Cento.ActionTypes.COMMENT_ON_USERNEEDS, id, {body: txt});
    f[0].reset();
    Session.set('currentCommentFiles', null);
    return false;
  },

  'click .delete_comment': function(e){
    var pid = $(e.target).closest('li.post').data('post_id');
    var cid = $(e.target).closest('li').data('comment_id');
    console.log(cid);
    Cento.WorkItems.update({_id:pid}, {$pull:{comments:{_id: cid}}});
    return false;
  },
  'done .editable': function(e){
    var $editable = $(e.target);
    var $f = $editable.next('form[name=edit]');
    var newVal = $f.find('textarea').val();

    var field = $editable.data('field');
    var params = {};
    var cid = this._id;
    params[field] = newVal;

    console.log(this._id, newVal);
    var wi = Cento.WorkItems.findOne({'comments._id': this._id});
    var comments = _.map(wi.comments, function(c){
      if(c._id === cid){
        c.body = newVal;
      }
      return c;

    });
    

    try{
      console.log(comments);
    Cento.WorkItems.update({_id: wi._id}, {$set: {'comments': comments}});
    }catch(e){
      console.error(e);
    }

  },
});
