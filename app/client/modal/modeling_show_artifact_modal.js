Template.modeling_show_artifact_modal.after_modal_rendered = function(){


  console.log('x');

  $(".annotate").each(function(){

    $(this).on('load', function(){
        $(this).annotateImage({
        editable: true,
        useAjax: false,
        notes: [ { "top": 286, 
                   "left": 161, 
                   "width": 52, 
                   "height": 37, 
                   "text": "Small people on the steps", 
                   "id": "e69213d0-2eef-40fa-a04b-0ed998f9f1f5", 
                   "editable": false },
                 { "top": 134, 
                   "left": 179, 
                   "width": 68, 
                   "height": 74, 
                   "text": "National Gallery Dome", 
                   "id": "e7f44ac5-bcf2-412d-b440-6dbb8b19ffbe", 
                   "editable": true } ]   
      });
      
    });

    
  });
};

Template.modeling_show_artifact_modal.helpers({
  'currentArtifact': function(){
    return Cento.Artifacts.findOne({_id: this._id});

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
