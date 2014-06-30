$( function(){
  var $body = $(document.body)

  $body.on('click', '.editable .edit_trigger', function(e){
    var $trigger = $(e.target);
    var $editable = $trigger.closest('.editable');
    var content = $editable.attr('data-content');
    var id = $editable.attr('data-id');


    var params = {content: content, _id: id};
    if($editable.data('plain')){
      params.plain = true;

    }
    var tpl = UI.renderWithData(Template.edit_form, params);
    UI.insert(tpl, $editable.parent()[0], $editable[0])

    
    $editable.prev('form').attr('id', 'edit_form_'+this._id+'_'+$editable.data('field'));
    $editable.hide();
    

  });

  // $body.on('done__', '.editable', function(e){
    // var $editable = $(e.target);
    // var $f = $editable.prev('form[name=edit]');
    
    // var newVal;
    // if($f.find('textarea').length){
      // newVal = $f.find('textarea').val();
    // }else{
      // var editor = window.editors[$f.attr('id')];
      // // var newVal = $f.find('textarea').val();
      // newVal = editor.getHTML();
      // console.log("new content : ", newVal);

    // }

    // var field = $editable.data('field');
    // var params = {};
    // params[field] = newVal;
    // Cento.WorkItems.update({_id: this._id}, {$set: params});

  // });


  
  /*
  * Popover
  */

  $(document.body).on('hidden.bs.modal', '.modal', function(e, page){

    var $m = $(e.target);

    if($m.find('form').length){
      $m.find('form').each(function(){
        $(this).get(0).reset();

      });
    }



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
  $(document.body).on('click', 'button[data-toggle=popover2], a[data-toggle=popover2]', function(e){

    var $e = $(e.target);
    if($e.data('popover')){
      return;
    }
    
    var tplName = $(this).data('target');
    var tpl = UI.renderWithData(Template[tplName]);





    UI.insert(tpl, $e.parent()[0])


    var $popover = tpl.templateInstance.$('.popover');

    var hide = function(){
        $popover.remove();
        $e.removeData('popover');
    };
    var clean = function(e){
      if($(e.target).closest('.popover').length)
        return;

      if($popover.is(':visible')){
        $popover.remove();
        $e.removeData('popover');
      }
      return false;
    };
    $('body').on('mousedown', clean);
    $('body').on('hide', hide);

    
    $popover.show();
    $popover.position({
      of: $e,
      at: 'left bottom+5',
      my: 'left top'
    });
    $e.data('popover', 'on');

    // $popover = $(popoverCss);
    // if($popover.is(':visible')){
      // // $popover.trigger('hide');
    // }else{
      // $popover.position({
        // of: $e,
        // at: 'left bottom+5',
        // my: 'left top'
      // });

    // }
    return false;

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



  $(document.body).on('click', 'table.ct th.sortable', function(e){
    var $e = $(this);
    var fld = $e.data('field');
    var itemType = $e.data('item_type');
    var sorts = Session.get('ideation:sort');
    if(!sorts){ sorts = {}; }

    sorts[fld] = $(e.target).hasClass('desc') ? 1 : -1;

    if(sorts[fld] == 1){
      $e.removeClass('desc').addClass('asc');
    }else{
      $e.removeClass('asc').addClass('desc');
    }


    Session.set(itemType+':sort', sorts);
  });

});
