
$( function(){


  
  $(document.body).on('click', 'button[data-toggle]', function(e){
    $(this).popover('show');

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
