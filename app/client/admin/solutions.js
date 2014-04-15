Template.admin_solutions.events({
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
