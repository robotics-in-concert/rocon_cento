
$( function(){


  
  // $(document.body).on('click', 'button[data-toggle]', function(e){
    // $(this).popover('show');

  // });
  //
  //


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

  $(document.body).on('changePage', '.popover', function(e, page){
    console.log(arguments);
    $popover.find('.page:not(:eq('+page+'))').hide();
    $popover.find('.page:eq('+page+')').show();
  });
  $(document.body).on('click', 'button[data-toggle=popover]', function(e){
    var popoverCss = $(this).data('target');
    $popover = $(popoverCss);
    var $e = $(e.target);
    if($popover.is(':visible')){
      $popover.trigger('hide');
    }else{
      $popover.position({
        of: $e,
        at: 'left bottom+10',
        my: 'left top'
      });

      $popover.find('.page:not(:first-child)').hide();
      $popover.find('.page:eq(0)').show();
      $popover.show();

    }

  });

  $(document.body).on('hide', '.popover', function(e){
    $(this).offset({top: 0, left: 0});
    $(this).hide();

  });


  $(document.body).on('click', '.editable .edit_trigger', function(e){
    var $trigger = $(e.target);
    var $editable = $trigger.closest('.editable');
    // var content = $editable.data('content');
    var content = $editable.attr('data-content');

    console.log("CON", content);

    // TODO : use handlebar
    var html = '<form name="edit" class="edit_form">'+
       '   <div class="form-group">'+
       '     <textarea name="body" class="form-control">'+content+'</textarea>'+
       '   </div>'+
       '   <div class="form-group">'+
       '     <button class="ct btn btn-sm save_edit">save</button> <a href="#" class="cancel_edit">&times;</a>'+
       '   </div>'+
       ' </form>';
    var $form = $(html);
    
    $form.find('.save_edit').click( function(){
      console.log('save!');
      $editable.show();

      $editable.trigger('done');
      $form.remove();

      
      return false;

    });
    
    $form.find('.cancel_edit').click( function(){
      $editable.show();
      $form.remove();
      return false;

    });
    $editable.after($form);
    $editable.hide();
  });



});
