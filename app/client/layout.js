
Template.layout.events({
  'done .editable': function(e){
    console.log('here!!!!!!!!!!!!!!!!!!!!!!!!!');
    var $editable = $(e.target);
    var $f = $editable.next('form[name=edit]');
    var newVal = $f.find('textarea').val();

    var field = $editable.data('field');
    var params = {};
    params[field] = newVal;
    Cento.WorkItems.update({_id: this._id}, {$set: params});

  }
});
