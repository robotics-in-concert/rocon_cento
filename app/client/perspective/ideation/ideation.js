Template.ideation.helpers({

  'filesToAttach': function(){
    Session.setDefault('filesToAttach', []);
    return Session.get('filesToAttach');
  },

  'categories': function(){
    return Cento.Categories.find({type: 'ideation'});
  }
});




Template.ideation.events({
  'dragenter .dropzone': function(e, t){
    $('.dropzone').addClass('dragenter');
    $('.dropmask').show();
    return false;
  },
  'dragleave .dropmask': function(e, t){
    $('.dropzone').removeClass('dragenter');
    $('.dropmask').hide();
    return false;

  },
  'dragover .dropzone': function(e, t){
    e.preventDefault();
    return false;
  },
  'drop .dropmask': function(e, t){
    $('.dropmask').hide();
    if (e.preventDefault) {
      e.preventDefault(); 
    }
    if(e.dataTransfer.files){
      var files = Session.get('filesToAttach');
      _.each(e.dataTransfer.files, function(f){ 
        files.push(f); 
        Meteor.saveFile(f);
      });
      Session.set('filesToAttach', files);
    }
    return false;
  },
  'blur .body': function(e, t){
    var $e = $(e.target);
    var id = $e.closest('li.post').data('post_id');
    Cento.Posts.update({_id:id}, {$set:{body: $e.html()}});

  },

  'click .delete_post': function(e, t){
    var id = $(e.target).closest('li.post').data('post_id');
    Cento.Posts.remove({_id: id});
    console.log('delete');
  },
  'click .upvote_post': function(e, t){
    var id = $(e.target).closest('li.post').data('post_id');
    Cento.Posts.update({_id: id}, {$inc: {votes:1}});
  },
  'click .downvote_post': function(e, t){
    var id = $(e.target).closest('li.post').data('post_id');
    Cento.Posts.update({_id: id}, {$inc: {votes:-1}});
  },
  'click .btn.post': function(e, t){
    var f = $(e.target).closest('form');
    var txt = $('textarea').val();
    var files = Session.get('filesToAttach');
    var attachments = _.map(files, function(f){
      return _.pick(f, 'name', 'size', 'type');
    });
    
    Cento.Posts.insert({type: 'ideation', category: f.data('current_category'), 'title': txt, 'body': txt, 'created':new Date(), 
      votes: 0,
      attachments: attachments, user_id: Meteor.userId()});
    if(files && files.length > 0)
      Meteor.saveFile(files[0], console.log);
    $('textarea').val('');
    return false;
  },
  'click .btn.comment': function(e, t){
    var f = $(e.target).closest('form');
    var id = f.data('post_id');
    var txt = f.find('textarea').val()
    
    Cento.Posts.update({_id: id},{$push: {comments:{body: txt, 'created':new Date(), user_id: Meteor.userId()}}});
    f.find('textarea').val('');
    return false;
  }

});
