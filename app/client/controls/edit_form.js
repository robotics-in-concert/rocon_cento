

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
    $editable.trigger('done');
    console.log('done');
    $editable.show();
    $f.remove();
    return false;

  }

});
