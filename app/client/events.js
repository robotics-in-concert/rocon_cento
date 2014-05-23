
$( function(){



  $(document.body).on('click', 'a.edit', function(e){
    var $trigger = $(e.target);
    var $editable = $($(e.target).data('target'));



    // TODO : use handlebar
    if($editable.data('edit_type') === 'textarea'){
      var html = '<form class="edit_form">'+
         '   <div class="form-group">'+
         '     <textarea name="body" class="form-control">'+$editable.text()+'</textarea>'+
         '   </div>'+
         '   <div class="form-group">'+
         '     <button class="ct btn btn-sm save_edit">save</button> <a href="#" class="cancel_edit">&times;</a>'+
         '   </div>'+
         ' </form>';
      var $form = $(html);
      $form.find('.save_edit').click( function(){
        console.log('save!');
        $editable.show();

        $trigger.trigger('save', $form.serializeArray());
        $form.hide();

        
        return false;

      });
      $form.find('.cancel_edit').click( function(){
        $editable.show();
        $form.hide();
        return false;

      });
      $editable.after($form);


    }
    $editable.hide();
  });



});
