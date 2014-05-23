
$( function(){



  $(document.body).on('click', 'a.edit', function(e){
    $editable = $($(e.target).data('target'));



    if($editable.data('edit_type') == 'textarea'){
      var html = '<form class="edit_form">'+
         '   <div class="form-group">'+
         '     <textarea class="form-control">'+$editable.text()+'</textarea>'+
         '   </div>'+
         '   <div class="form-group">'+
         '     <button class="ct btn btn-sm save">save</button> <a href="#" class="cancel_edit">&times;</a>'+
         '   </div>'+
         ' </form>';
      $editable.after(html);

    }
    $editable.hide();
  });



});
