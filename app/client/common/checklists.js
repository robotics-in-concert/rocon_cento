Template.checklists.helpers({
  'progress': function(){
    var total = this.items.length;
    var done = _.filter(this.items, function(e){ return e.done; }).length;


    if(total == 0){
      return "";
    }
    return Math.round(done / total * 100) + "%";

  }

});

Template.checklists.events({

  'click .add_item': function(e){
    var $f = $(e.target).next('form').show();

  },

  'change input[type=checkbox]': function(e, tpl){
    var $chk = $(e.target);
    var idx = $(e.target).closest('ul').find('input[type=checkbox]').index($chk);
    var checked = $chk.prop('checked');

    var params = {};
    params["items."+idx+".done"] = checked;
    Cento.Checklists.update({_id: tpl.data._id}, {$set: params});

    console.log(tpl.data._id, params);

  },

  'click .create': function(e){
    var $f = $(e.target).closest('form')
    var txt = $f.find('textarea').val();

    Cento.Checklists.update({_id: this._id}, {$push: {items: {body: txt, done: false}}}, true);


    $f[0].reset();
    $f.hide();

    return false;
  }

});
