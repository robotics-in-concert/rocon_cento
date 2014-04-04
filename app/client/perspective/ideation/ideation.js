Template.ideation.helpers({
  'posts': function(){
    return Cento.Posts.find({}, {'sort': {'created': -1},
      transform: function(doc){
        doc.user = Meteor.users.findOne(doc.user_id);
        return doc;

       }
    });
  },

  'filesToAttach': function(){
    Session.setDefault('filesToAttach', []);
    return Session.get('filesToAttach');
  }
});




Template.ideation.events({
  'dragenter .dropzone': function(e, t){
    $(e.target).addClass('dragenter');
  },
  'dragleave .dropzone': function(e, t){
    $(e.target).removeClass('dragenter');
  },
  'dragover .dropzone': function(e, t){
    return false;
  },
  'drop .dropzone': function(e, t){
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

  'click .btn.post': function(e, t){
    var txt = $('textarea').val();
    var files = Session.get('filesToAttach');
    var attachments = _.map(files, function(f){
      return _.pick(f, 'name', 'size', 'type');
    });
    
    Cento.Posts.insert({type: 'ideation', 'title': txt, 'body': txt, 'created':new Date(), attachments: attachments, user_id: Meteor.userId()});
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
