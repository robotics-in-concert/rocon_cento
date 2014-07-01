
Template.modeling_create_artifact_modal.events({
  'click button.create_artifact': function(e){
    var f = $(e.target).closest('form');
    var modal = $(e.target).closest('.modal');
    var arr = f.serializeArray();
    var data = {work_item_id: this._id};
    _.each(arr, function(kv){
      data[kv.name] = kv.value;
    });
    console.log(data);

    var id = Cento.Artifacts.insert(data);
    console.log(id);

    var file = f.find('input[type=file]')[0].files[0];
    
    Meteor.saveFile(file, function(e, r){
      Cento.Artifacts.update({_id: id}, {$push: {attachments: {name: r}}});
      modal.modal('hide');

    });

    return false;
  }

});
