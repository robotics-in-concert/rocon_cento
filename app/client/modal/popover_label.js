Template.popover_label.events({



  'mouseover .popover.labels li': function(e){
    $li = $(e.target);
    $li.siblings('li').removeClass('active');
    $li.addClass('active');

  },
  'click .popover.labels li': function(e){
    $li = $(e.target);
    $li.toggleClass('selected');

  },
  'click .save': function(e){
    $e = $(e.target);
    $popover = $e.closest('.popover');


    var labelNames = ['green', 'yellow', 'orange', 'red', 'purple', 'blue'];
    $lis = $e.closest('.popover').find('li');
    var labels = [];

    $lis.each(function(idx, e){
      if($(this).hasClass('selected'))
        labels.push(labelNames[idx]);
    });

    console.log(labels);

    Cento.updateWorkItem(this._id, {labels: labels});
    $popover.trigger('hide');


    return false;
  }

});
