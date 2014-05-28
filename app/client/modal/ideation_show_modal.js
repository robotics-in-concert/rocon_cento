Template.ideation_show_modal.helpers({
  'currentIdeation': function(){
    return Cento.WorkItems.findOne({_id: Session.get('currentIdeation')});
  }

});
Template.ideation_show_modal.rendered = function(){
  $('#modal-show-ideation').on('save', '.edit_description', function(e, data){
    var wid = Session.get('currentIdeation');
    return false;

  });


};
Template.ideation_show_modal.events({
  // 'click .edit_description': function(e){
    // $(e.target).on('save', function(e, x){
      // console.log(x);
      // return false;

    // });

  // },
  //
  'click button.create_checklist': function(e){
    var $popover = $('.popover.create_checklist');
    if($popover.is(':visible')){
      $popover.offset({left: 0, top: 0});
      // console.log('here');
      $popover.hide();

      return false;
    }

    var $e = $(e.target);
    var offset = {
      top: $e.outerHeight() + $e.offset().top + 5,
      left: $e.offset().left
    };
    $('.popover.create_checklist').offset(offset).show();
    
    return false;
  },
  'click .upvote': function(e){
    Cento.WorkItems.update({_id: this._id}, {$inc: {votes:1}});
    $(e.target).closest('.modal').modal('hide');

  },
  'click .downvote': function(e){
    Cento.WorkItems.update({_id: this._id}, {$inc: {votes:-1}});
    $(e.target).closest('.modal').modal('hide');
  },
  'click .create_modeling': function(){
    $('#modal-create-modeling').modal();
    return false;
  },

});
