Template.admin_user_needs.helpers({
  'groups': function(){
    return Cento.WorkGroups.find({solution_id: {$exists: false}});
  }

});
Template.admin_user_needs.events({
  'click form[name=group] .btn.add_group': function(e){
    var f = $(e.target).closest('form');
    var title = f.find('input').val();

    Cento.WorkGroups.insert({title:title});
    f[0].reset();
    return false;

  }
});
