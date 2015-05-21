Template.admin_solutions.rendered = function() {
  console.log('rendered::::', this);

  $(document.body).on('xxx', '.popover', function(){
    console.log('ERERERERER');
    return false;


  });
}
Template.admin_solutions.helpers({
  'workGroupsFor': function(solutionId){
    return Cento.WorkGroups.find({solution_id: solutionId});
  }

});
Template.admin_solutions.events({
  'click .delete_project': function(e){
    Cento.Solutions.update({_id: this._id}, {deleted_at: new Date()})

  },
  'xxx .popover': function(e){
    console.log('HEREERERERERERE');
    


  },
  'click .add_work_group': function(e){
    var f = $(e.target).closest('form');
    var title = f.find('input[name=title]').val();

    Cento.WorkGroups.insert({solution_id: this._id, title: title});
    f[0].reset();
    return false;

  },
  'click .add_work_item_type': function(e){
    var f = $(e.target).closest('form');
    var title = f.find('input[name=title]').val();

    Cento.Solutions.update({_id: this._id}, {$push: {work_item_types: title}});
    f[0].reset();
    return false;

  },
  'click .save_solution': function(e){
    var f = $(e.target).closest('form');

    var s = {
      title: f.find('input[name=title]').val(),
      description: f.find('textarea').val()
    };

    Cento.Solutions.insert(s);
    f[0].reset();
    return false;

  }

});
