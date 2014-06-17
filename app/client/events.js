
$( function(){


  
  $(document.body).mouseup(function(e){

    
    // console.log('1111');
    // if(!$(e.target).parents('.popover').length){
      // console.log('2222');
      // $('.popover:visible').each(function(){
        // $(this).hide();
          // // $(this).offset({left: 0, top: 0}).hide();
      // });
    // }


  });

  /*
  * Popover
  */

  $(document.body).on('hidden.bs.modal', '.modal', function(e, page){
    if($('form.comment').length){
      var $f = $('form.comment');
      $f.get(0).reset();
      $f.removeClass('focus')
      Session.set('currentCommentFiles', []);
    }

    if($('form.new_ideation').length){
      $('form.new_ideation').get(0).reset();
    }
  });
  $(document.body).on('changePage', '.popover', function(e, page){
    console.log(arguments);
    $popover.find('.page:not(:eq('+page+'))').hide();
    $popover.find('.page:eq('+page+')').show();

  });
  $(document.body).on('click', 'button[data-toggle=popover], a[data-toggle=popover]', function(e){
    var popoverCss = $(this).data('target');
    $popover = $(popoverCss);
    var $e = $(e.target);
    if($popover.is(':visible')){
      $popover.trigger('hide');
    }else{
      $popover.position({
        of: $e,
        at: 'left bottom+5',
        my: 'left top'
      });

      $popover.find('.page:not(:first-child)').hide();
      $popover.find('.page:eq(0)').show();
      $popover.show();

    }
    return false;

  });

  $(document.body).on('hide', '.popover', function(e){
    $(this).offset({top: 0, left: 0});
    $(this).hide();

  });


  /*
  * Editing
  */


});
