
function openModal(tpl, data){

    var tpl = UI.renderWithData(Template[tpl], data);
    tpl.events({
      'hidden.bs.modal .modal': function(e){
        console.log('hidden');
        $(e.target).remove();
      }

    });
    return UI.insert(tpl, document.body);

}

window.openModal = openModal;
