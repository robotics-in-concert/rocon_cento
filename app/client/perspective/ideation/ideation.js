Template.ideation.posts = function(){
  return Cento.Posts.find({}, {'sort': {'created': -1},
    transform: function(doc){
      doc.user = Meteor.users.findOne(doc.user_id);
      return doc;

     }
  });
}

Template.ideation.events({

  'click .btn': function(e, t){
    var txt = $('textarea').val();
    Cento.Posts.insert({'title': txt, 'body': txt, 'created':new Date(), user_id: Meteor.userId()});
    $('textarea').val('');
    return false;
  }

});
