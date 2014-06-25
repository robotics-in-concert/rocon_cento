
function openModal(tpl, data){

    var tpl = UI.renderWithData(Template[tpl], data);
    tpl.events({
      'hidden.bs.modal .modal': function(e){
        console.log('hidden');
        $(e.target).remove();
      }

    });
    tpl.rendered = function(){
      console.log(arguments);
      var opts = {};
      if($('.modal').length > 1){
        opts.backdrop = false;
      }
      this.$('.modal').modal(opts);


    };
    console.log(tpl);
    console.log(tpl.find);
    return UI.insert(tpl, document.body);

}

window.openModal = openModal;
