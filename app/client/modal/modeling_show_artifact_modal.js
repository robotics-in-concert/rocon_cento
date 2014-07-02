
Template.modeling_show_artifact_modal.helpers({
  'currentArtifact': function(){
    return Cento.Artifacts.findOne({_id: this._id});

  }

});
