Template.popover_label.helpers({
  'checkSelected': function(workItem, color){
    var idx = _.include(workItem.labels, color);
    console.group('clickSelected');
    console.log(this);
    console.log(workItem);
    console.log(color);
    console.log(idx);

    console.groupEnd();
    return idx ? 'selected' : '';
  }

});
Template.popover_label.events({



  'mouseover .popover.labels li': function(e){
    $li = $(e.target);
    $li.siblings('li').removeClass('active');
    $li.addClass('active');

  },
  'mouseleave .popover.labels li': function(e){
    $li = $(e.target);
    $li.removeClass('active');

  },
  'click .popover.labels li': function(e){
    $li = $(e.target);
    $li.toggleClass('selected');

  },
  'click .change_titles': function(e){
    console.log('here');
    $e = $(e.target);
    $popover = $e.closest('.popover');
    $popover.trigger('changePage', 1);
    return false;
  },
  'click .cancel_label_titles': function(e){
    var $e = $(e.target);
    var $page = $e.closest('.page');
    var $popover = $e.closest('.popover');

    $popover.trigger('changePage', 0);

    return false;
    

    
  },
  'click .save_label_titles': function(e){
    var $e = $(e.target);
    var $page = $e.closest('.page');
    var $popover = $e.closest('.popover');

    var values = [];
    $page.find('input').each(function(e){
      values.push($(this).val());
    });

    var sol = Session.get('currentSolution');
    Cento.Solutions.update({_id: sol._id}, {$set: {label_titles: values}});
    $popover.trigger('changePage', 0);

    return false;
    

    
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
