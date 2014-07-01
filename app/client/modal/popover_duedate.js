Template.popover_duedate.events({



});
Template.popover_duedate.rendered = function(){
  $('input.date').val(moment().format('YYYY-MM-DD'));
  $('input.time').val(moment().format('HH:mm'));
  $('.datepicker').datepicker({
    dateFormat: 'yy-mm-dd',
    onSelect: function(dateText, obj){
      var $f = $(obj.input).closest('form');
      $f.find('input.date').val(dateText);
    }
  });

};

Template.popover_duedate.events({
  'click .test': function(e){
    console.log('xxx');
    var $pop = $(e.target).closest('.popover');

    $pop.trigger('xxx');
    $pop.trigger('hide');
    return false;

  },
  'click .save': function(e){
    var $f = $(e.target).closest('form');
    var dd = $f.find('input.date').val();
    var tt = $f.find('input.time').val();


    var m = moment(dd+"T"+tt, 'YYYY-MM-DDTHH:mm');


    Cento.WorkItems.update({_id: this._id}, {$set: {duedate: m.format()}});
    var $popover = $(e.target).closest('.popover');
    $popover.trigger('hide');
    console.log(m.format());
    return false;
  }


});
