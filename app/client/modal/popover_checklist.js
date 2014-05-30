Template.popover_checklist.events({
  'click .create': function(e){
    var $popover = $(e.target).closest('.popover');
    var txt = $popover.find('input[type=text]').val();
    

    console.log(this._id);
    Cento.Checklists.insert({title: txt, items: [], work_item_id: this._id, created: new Date()});

    $popover.hide();

    return false;
  }


});
