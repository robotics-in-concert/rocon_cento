
Template.ideation_manage.helpers({
  'categories': function(){
    return Cento.Categories.find({type: 'ideation'});
  }

});
Template.ideation_manage.events({
  'click form[name=ideation_category] .btn': function(e, t){
    var $e = $(e.target);
    var f = $e.closest('form');

    var title = f.find('input').val();

    Cento.Categories.insert({type:'ideation', title:title});
    f.find('input').val('');
    return false;  

  }
});
