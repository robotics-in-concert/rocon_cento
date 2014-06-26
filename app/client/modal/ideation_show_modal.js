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

  
  // $(function(){
    // var $popover = $('.popover.duedate');
    // $popover.position({
      // of: 'button.duedate',
      // at: 'left bottom+10',
      // my: 'left top'
      


    // });

  // });
  //
  //


};
Template.ideation_show_modal.events({
  
  'hidden.bs.modal .modal':function (e) {
    console.log('hidden');

      
  },
  // 'click .edit_description': function(e){
    // $(e.target).on('save', function(e, x){
      // console.log(x);
      // return false;

    // });

  // },
  //
  // 'click button.duedate': function(e){



    // var $popover = $('.popover.duedate');
    // var $e = $(e.target);
    // if($popover.is(':visible')){
      // $popover.trigger('hide');
    // }else{
      // $popover.position({
        // of: 'button.duedate',
        // at: 'left bottom+10',
        // my: 'left top'
      // });

      // $popover.show();
    // }


    // // console.log('VISIBLE : ', $popover.is(':visible'));
    // // if($popover.is(':visible')){
      // // console.log('visible, will hide');
      // // $popover.offset({left: 0, top: 0});
      // // // console.log('here');
      // // $popover.hide();

      // // return false;
    // // }




    // // var offset = {
      // // top: $e.outerHeight() + $e.offset().top + 5,
      // // left: $e.offset().left
    // // };
    // // console.log('new offset', offset);
    // // if($popover.offset().top == 0)
      // // $popover.offset(offset);

    
    // return false;
  // },
  // 'click button.create_checklist': function(e){
    
    // var $popover = $('.popover.create_checklist');
    // var $e = $(e.target);
    // if($popover.is(':visible')){
      // $popover.trigger('hide');
    // }else{
      // $popover.position({
        // of: $e,
        // at: 'left bottom+10',
        // my: 'left top'
      // });

      // $popover.show();
    // }

    // return false;
  // },
  'click .upvote': function(e){
    Cento.WorkItems.update({_id: this._id}, {$inc: {votes:1}});
    $(e.target).closest('.modal').modal('hide');

  },
  'click .archive': function(e){
    Cento.WorkItems.update({_id: this._id}, {$set: {archive:true}});
    $(e.target).closest('.modal').modal('hide');
    return false;
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
