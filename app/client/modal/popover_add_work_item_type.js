
Template.popover_add_work_item_type.events({
  'click .btn.create': function(e){
    var $f = $(e.target).closest('form');
    var v = $f.find('input[type=text]').val();


    var sol = Session.get('currentSolution');
    Cento.Solutions.update({_id: sol._id}, {$push: {work_item_types: v}});

    $(e.target).closest('.popover').hide();

    return false;

  }

});
