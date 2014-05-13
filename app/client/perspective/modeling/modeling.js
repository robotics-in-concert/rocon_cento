Template.modelings.helpers({
  'users': function(){
    return Meteor.users.find({'services.github': {$exists: true}}).fetch();
  },

  'artifacts': function(wid){
    return Cento.Artifacts.find({work_item_id: wid});

 },
  'new_replys': function(login){
    return Cento.WorkItems.find({type: Cento.WorkItemTypes.MODELING, 'comments.body': new RegExp("@"+login)}).fetch();
  }
});

Template.modelings.events({

  'click .toggle_rel': function(e){
    var $e = $(e.target);
    var $tr = $e.closest('tr').next('tr');
    $tr.toggle();

    return false;
  },
  'click .show': function(e){
    var id = this._id;
    $('#modal-'+id).modal();
    return false;
  },
});
Template.modeling_item.events({
  'change select': function(e){
    var newStatus = $(e.target).val();
    Cento.WorkItems.update({_id: this._id}, {$set: {status: newStatus}});
  }

});

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

