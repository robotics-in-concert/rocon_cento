Template.modal_comment.helpers({
  'attachmentsForComment': function(cid){
    return Cento.Artifacts.find({comment_id: cid});
  },
  'commentFiles': function(){
    return Session.get('currentCommentFiles');
  }

});
Template.modal_comment.events({
  'focus form.comment textarea': function(e){
    $f = $(e.target).closest('form');
    $f.addClass('focus')

  },
  'click .cancel_comment': function(e){
    $f = $(e.target).closest('form');
    $f.removeClass('focus')
    Session.set('currentCommentFiles', []);
    $f.find('textarea').val('');
    return false;

  },
  'click .attach': function(e){
    $('input[type=file]').click();

  },
  'change input[type=file]': function(e){
    $input = $(e.target);
    Session.set('currentCommentFiles', []);

    [].slice.apply($input[0].files).forEach(function(file){
      Meteor.saveFile(file, function(e, r){
        var files = Session.get('currentCommentFiles');
        files.push(r);
        Session.set('currentCommentFiles', files);
        // console.log(r);
        // $input.val('');
        // Session.set('currentCommentFiles', [r]);

        
        // Cento.Artifacts.update({_id: id}, {$push: {attachments: {name: r}}});
      });

    });

  },
  'click .btn.comment': function(e){

    var f = $(e.target).closest('form');
    var id = this._id;
    var txt = f.find('textarea').val();
    var workItem = this;

    var attachments = [];

    var curFiles = Session.get('currentCommentFiles');
    if(curFiles && curFiles.length > 0){
      attachments = curFiles;
    }


    if(this.type != null && this.type != ''){
      var cid = Random.id();
      Cento.WorkItems.update({_id: id},
          {$inc: {comments_count: 1}, $push: {comments:{_id: cid, body: txt, 'created':new Date(), user_id: Meteor.userId()}}});
      attachments.forEach(function(a){
        var data = {
          work_item_id: id,
          comment_id: cid,
          file: a,
          created: new Date(),
          user_id: Meteor.userId()
        };

        Cento.Artifacts.insert(data);

      });



    }else{
      Cento.Artifacts.update({_id: id},
          {$push: {comments:{_id: Random.id(), body: txt, 'created':new Date(), user_id: Meteor.userId()}}});
    }
    Cento.createAction(Cento.ActionTypes.COMMENT_ON_USERNEEDS, id, {body: txt});
    f[0].reset();
    Session.set('currentCommentFiles', null);
    return false;
  },

  'click .delete_comment': function(e, tpl){
    var pid = tpl.data._id;
    var cid = this._id;
    console.log(cid);
    Cento.WorkItems.update({_id:pid}, {$pull:{comments:{_id: cid}}});
    return false;
  },
  'done .editable': function(e){
    var $editable = $(e.target);
    var $f = $editable.prev('form[name=edit]');
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
