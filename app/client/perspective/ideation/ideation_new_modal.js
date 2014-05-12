Template.ideation_new_modal.events({
  'click .btn.post': function(e){
    var f = $(e.target).closest('form');
    var title = $('input[name=title]').val();
    var txt = $('textarea').val();
    var files = Session.get('filesToAttach');
    var attachments = _.map(files, function(f){
      return _.pick(f, 'name', 'size', 'type');
    });
    var tags = $('.tag').toArray().map(function(e){ return e.value; });
    tags = _.compact(tags);
    
    try{
      Cento.WorkItems.insert({
        type: Cento.WorkItemTypes.IDEA,
        // work_group_id: this.currentWorkGroup._id,
        solution_id: Session.get('currentSolution')._id,
        user_id: Meteor.userId(),
        title: title,
        body: txt,
        created:new Date(),
        votes: 0,
        tags: tags,
        attachments: attachments
      });

      if(files && files.length > 0){
        Meteor.saveFile(files[0], console.log);
      }
      f[0].reset();
      $('.modal.ideation_form').modal('hide');
      alertify.success('Successfully created.');
    }catch(e){
      console.error(e.message);
      console.trace(e);
    }
    return false;
  },
});
