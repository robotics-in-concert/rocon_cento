
Template.modeling_show_artifact_modal.helpers({
  'currentArtifact': function(){
    return Cento.Artifacts.findOne({_id: Session.get('currentArtifact')});

  }

});
Template.modeling_show_artifact_modal.events({
  'click .delete': function(e){
    var $modal = $(e.target).closest('.modal');
    Cento.Artifacts.remove({_id: this._id});
    $modal.modal('hide');

    return false;

  }
});
