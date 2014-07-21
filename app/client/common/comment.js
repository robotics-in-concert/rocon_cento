Template.comment.events({

  'click .reply': function(e){
    var $f = $(e.target).closest('form');
    var body = $f.find('textarea').val();

  }

});
