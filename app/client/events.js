$(function(){

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
