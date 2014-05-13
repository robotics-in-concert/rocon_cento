
Template.modeling_show_modal.helpers({
  'artifacts': function(wid){
    return Cento.Artifacts.find({work_item_id: wid});

 }
});



Template.modeling_show_modal.events({
  'click .create_artifact': function(e){
    $('#modal-'+this._id+'.create_artifact').modal();
    return false;
  },


});
