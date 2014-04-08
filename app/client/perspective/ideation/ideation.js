
Template.ideation.helpers({

  'filesToAttach': function(){
    Session.setDefault('filesToAttach', []);
    return Session.get('filesToAttach');
  },

  'categories': function(){
    return Cento.Categories.find({type: 'ideation'});
  }
});

function showMoreVisible(){
  var target = $('#showMoreResults'),
      threshold;

  if(!target.length){
    return;
  }

  threshold = $(window).scrollTop() + $(window).height() + target.height();
  console.log(target.offset().top, threshold);

  if (target.offset().top < threshold) {
    console.log('1');
    if (!target.data('visible')) {
      target.data('visible', true);
      Session.set('itemsLimit', Session.get('itemsLimit') + 10);
    }
  } else {
    console.log('2');
    if (target.data('visible')) {
      target.data('visible', false);
    }
  }
}

Template.ideation.rendered = function(){
  console.log('rendered');
  $(window).scroll(showMoreVisible);

}


Template.ideation.events({
  'dragenter .dropzone': function(){
    $('.dropzone').addClass('dragenter');
    $('.dropmask').show();
    return false;
  },
  'dragleave .dropmask': function(){
    $('.dropzone').removeClass('dragenter');
    $('.dropmask').hide();
    return false;

  },
  'dragover .dropzone': function(e){
    e.preventDefault();
    return false;
  },
  'drop .dropmask': function(e){
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
  'blur .body': function(e){
    var $e = $(e.target);
    var id = $e.closest('li.post').data('post_id');
    Cento.Posts.update({_id:id}, {$set:{body: $e.html()}});

  },

  'click .delete_post': function(e){
    var id = $(e.target).closest('li.post').data('post_id');
    Cento.Posts.remove({_id: id});
    console.log('delete');
  },
  'click .upvote_post': function(e){
    var id = $(e.target).closest('li.post').data('post_id');
    Cento.Posts.update({_id: id}, {$inc: {votes:1}});
  },
  'click .downvote_post': function(e){
    var id = $(e.target).closest('li.post').data('post_id');
    Cento.Posts.update({_id: id}, {$inc: {votes:-1}});
  },
  'click .btn.post': function(e){
    var f = $(e.target).closest('form');
    var txt = $('textarea').val();
    var files = Session.get('filesToAttach');
    var attachments = _.map(files, function(f){
      return _.pick(f, 'name', 'size', 'type');
    });
    
    Cento.Posts.insert({
      type: 'ideation',
      category: f.data('current_category'),
      title: txt,
      body: txt,
      created:new Date(),
      votes: 0,
      attachments: attachments,
      user_id: Meteor.userId()
    });

    if(files && files.length > 0){
      Meteor.saveFile(files[0], console.log);
    }
    $('textarea').val('');
    return false;
  },
  'click .btn.comment': function(e){
    var f = $(e.target).closest('form');
    var id = f.data('post_id');
    var txt = f.find('textarea').val();
    
    Cento.Posts.update({_id: id},
        {$push: {comments:{_id: Random.id(), body: txt, 'created':new Date(), user_id: Meteor.userId()}}});
    f.find('textarea').val('');
    return false;
  },

  'click .delete_comment': function(e){
    var pid = $(e.target).closest('li.post').data('post_id');
    var cid = $(e.target).closest('li').data('comment_id');
    console.log(cid);
    Cento.Posts.update({_id:pid}, {$pull:{comments:{_id: cid}}});
    return false;
  }

});
