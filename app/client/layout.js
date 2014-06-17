
Template.layout.events({

  'click .editable .edit_trigger': function(e){
    var $trigger = $(e.target);
    var $editable = $trigger.closest('.editable');
    var content = $editable.attr('data-content');


    var params = {content: content};
    if($editable.data('plain')){
      params.plain = true;

    }
    var tpl = UI.renderWithData(Template.edit_form, params);
    UI.insert(tpl, $editable.parent()[0], $editable[0])

    
    $editable.prev('form').attr('id', 'edit_form_'+this._id+'_'+$editable.data('field'));
    $editable.hide();
    

  },

  'done .editable': function(e){
    var $editable = $(e.target);
    var $f = $editable.prev('form[name=edit]');
    
    var newVal;
    if($f.find('textarea').length){
      newVal = $f.find('textarea').val();
    }else{
      var editor = window.editors[$f.attr('id')];
      // var newVal = $f.find('textarea').val();
      newVal = editor.getHTML();
      console.log("new content : ", newVal);

    }

    var field = $editable.data('field');
    var params = {};
    params[field] = newVal;
    Cento.WorkItems.update({_id: this._id}, {$set: params});

  }
});
