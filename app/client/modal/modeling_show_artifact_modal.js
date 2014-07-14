Template.modeling_show_artifact_modal.after_modal_rendered = function(){

  var $img = $(".annotate:eq(0)");
  var tpl = this.templateInstance;


  var a = Cento.Artifacts.findOne({_id: tpl.data._id});

  var notes = _.chain(a.comments)
    .filter(function(e){ return !!e.dimen; })
    .map(function(e){ return _.extend(e.dimen, {text: e.body, id: e._id}); })
    .value();

  console.log(notes);

  console.log($img);




  $img.load(function(){
    var that = this;
    _.defer(function(){
      $(that).attr('width', that.naturalWidth);
      $(that).attr('height', that.naturalHeight);


      $(that).annotateImage({
        editable: true,
        useAjax: false,
        notes: notes
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
  'note_created .annotate': function(e, tpl, note){

    var $img = $(e.target);
    console.log($img);

    console.log($img.notes);
    console.log(e.target.notes);

    var dimen = _.pick(note, 'left', 'top', 'width', 'height');
    console.log('artifact id', tpl.data._id);

    Cento.Artifacts.update({_id: tpl.data._id},
        {$push: {comments:{_id: Random.id(), body: note.text, type: 'annotate', dimen: dimen, 'created':new Date(), user_id: Meteor.userId()}}});

  },
  'click .delete': function(e){
    var $modal = $(e.target).closest('.modal');
    Cento.Artifacts.remove({_id: this._id});
    $modal.modal('hide');

    return false;

  }
});
