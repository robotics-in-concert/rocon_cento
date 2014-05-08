
Template.ideation.helpers({

  'filesToAttach': function(){
    Session.setDefault('filesToAttach', []);
    return Session.get('filesToAttach');
  },


  'users': function(){
    return Meteor.users.find({'services.github': {$exists: true}}).fetch();
    // return Meteor.users.find({});
  }
});

function showMoreVisible(){
  var target = $('#showMoreResults'),
      threshold;

  if(!target.length){
    return;
  }

  threshold = $(window).scrollTop() + $(window).height() + target.height();

  if (target.offset().top < threshold) {
    if (!target.data('visible')) {
      target.data('visible', true);
      Session.set('itemsLimit', Session.get('itemsLimit') + 10);
    }
  } else {
    if (target.data('visible')) {
      target.data('visible', false);
    }
  }
}

Template.ideation.rendered = function(){
  new Cento.DragAndDrop($('.dropzone'));
  $(window).scroll(showMoreVisible);

}


Template.ideation.events({
  'blur .body': function(e){
    var $e = $(e.target);
    Cento.WorkItems.update({_id:this._id}, {$set:{body: $e.html()}});

  },

  'click .toggle_rel': function(e){
    var $e = $(e.target);
    var $tr = $e.closest('tr').next('tr');
    $tr.toggle();

    return false;
  },

  'click .delete_post': function(){
    Cento.WorkItems.remove({_id: this._id});
  },
  'click .upvote_post': function(){
    Cento.WorkItems.update({_id: this._id}, {$inc: {votes:1}});
  },
  'click .downvote_post': function(){
    Cento.WorkItems.update({_id: this._id}, {$inc: {votes:-1}});
  },
  'click .btn.post': function(e){
    var f = $(e.target).closest('form');
    var txt = $('textarea').val();
    var files = Session.get('filesToAttach');
    var attachments = _.map(files, function(f){
      return _.pick(f, 'name', 'size', 'type');
    });

    
    try{
      Cento.WorkItems.insert({
        type: Cento.WorkItemTypes.IDEA,
        solution_id: Session.get('currentSolution')._id,
        work_group_id: this.currentWorkGroup._id,
        user_id: Meteor.userId(),
        title: txt,
        body: txt,
        created:new Date(),
        votes: 0,
        attachments: attachments
      });

      if(files && files.length > 0){
        Meteor.saveFile(files[0], console.log);
      }
      f[0].reset();
    }catch(e){
      console.error(e.message);
      console.trace(e);
    }
    return false;
  },
  'click .create_task': function(e){
    console.log('xxx');
    var ideation_id = this._id;
    $('#modal-'+ideation_id).find('select').select2();
    // $('#modal-'+ideation_id).find('select:not([name=type])').select2();
    // $('#modal-'+ideation_id).find('select').select2().on('change', function(e){
      // $(this).data("selected", e.val.join());
    // });
      
    $('#modal-'+ideation_id).modal();

    return false;
  },

  'click .create_modeling_task': function(e){
    var ideation = this;
    var f = $(e.target).closest('form');
    var modal = $(e.target).closest('.modal');
    var title = f.find('input[name=title]').val();
    var description = f.find('textarea').val();


    var workType = f.find('select[name=type]').select2('val');
    var assignee = f.find('select[name=assignee]').select2('val');
    var reviewers = f.find('select[name=reviewers]').select2('val');

    Cento.WorkItems.insert({
      type: workType,
      status: Cento.WorkItemStatus.TODO,
      solution_id: this.solution_id,
      related: [
        {
          related_work_id: ideation._id,
          type: 'reference'
        }
      ],
      user_id: Meteor.userId(),
      assignee: assignee,
      reviewers: reviewers,
      title: title,
      description: description,
      created:new Date()
    }, function(e, modelingId){
      Cento.WorkItems.update({_id: ideation._id},
        {$push: {related: {related_work_id: modelingId, type: 'referred'}}});
      modal.modal('hide');
      alertify.success('Successfully created.');
    });


    return false;


  }


});
