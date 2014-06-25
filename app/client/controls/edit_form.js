

Template.edit_form.rendered = function(){
  if(!window.editors){
    window.editors = {}
  }
  var formId = this.$('form').attr('id')

  if(this.$('.editor').length){
    var fullEditor = new Quill( "#" + formId + " .editor", {
      modules: {
        'toolbar': { container: '#full-toolbar' },
        'link-tooltip': true
      },
      theme: 'snow'
    });
    window.editors[formId] = fullEditor;
  }


};
Template.edit_form.events({

  'click .cancel_edit': function(e){
    var $f = $(e.target).closest('form'); 
    $f.next('.editable').show();
    $f.remove();
    return false;

  },
  'click .save_edit': function(e){
    var $f = $(e.target).closest('form'); 
    var $editable = $f.next('.editable:eq(0)');


    console.log(this);


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



    $editable.trigger('done');
    $editable.show();
    $f.remove();
    return false;

    
  }

});
