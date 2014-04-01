
Template.modeling.events({
  'change input': function(e, t){
    _.each(e.target.files, function(file){
      Meteor.saveFile(file);
    });
    t.find('input[type=file]').value = '';
  }
});

Template.modeling.files = function(){
  return Cento.Files.find({}, {sort: {created: -1}});
};
