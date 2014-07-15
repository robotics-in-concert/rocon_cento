
Template.layout.events({
});
Template.layout.events({
  'click .show_work_item': function(){
    var i = this;
    Router.go('work_item', {solution: i.solution_id, work_item_id: i._id});
    return false;

  }
});
