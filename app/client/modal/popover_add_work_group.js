Template.popover_add_work_group.events({
  'click .btn.create': function(e){
    var $f = $(e.target).closest('form');
    var v = $f.find('input[type=text]').val();


    var sol = Session.get('currentSolution');
    Cento.WorkGroups.insert({solution_id: sol._id, title:v, created: new Date()})

    $(e.target).closest('.popover').hide();

    return false;

  }

});
