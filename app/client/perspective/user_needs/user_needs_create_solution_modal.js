Template.user_needs_create_solution_modal.events({
  'click .create_solution': function(e){
    var f = $(e.target).closest('form');
    var modal = $(e.target).closest('.modal');
    var title = f.find('input[name=title]').val();
    var description = f.find('textarea').val();

    var sid = Cento.Solutions.insert({
      solution_id: this.solution_id,
      related: [
        {
          related_work_id: ideation._id,
          type: 'reference'
        }
      ],
      user_id: Meteor.userId(),
      title: title,
      description: description,
      created:new Date()
    });



    modal.modal('hide');
    return false;


  }

});
