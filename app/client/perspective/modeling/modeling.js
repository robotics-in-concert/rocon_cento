
Template.modeling_show.events({
  'change input': function(e, t){
    _.each(e.target.files, function(file){
      console.log(file);
      // Meteor.saveFile(file);
    });
    // t.find('input[type=file]').value = '';
  },
  'click .create_artifact': function(e){
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

