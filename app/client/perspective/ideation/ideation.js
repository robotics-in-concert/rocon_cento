
Template.ideation.helpers({

  'filesToAttach': function(){
    Session.setDefault('filesToAttach', []);
    return Session.get('filesToAttach');
  },
  'new_replys': function(login){
    return Cento.WorkItems.find({type: Cento.WorkItemTypes.IDEA, 'comments.body': new RegExp("@"+login), deleted_at: {$exists: false}}).fetch();
  },
  'currentIdeation': function(){
    return Session.get('currentIdeation');
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
  // 'click table.ct th.sortable': function(e){
    // var fld = $(e.target).data('field');
    // var sorts = Session.get('ideation:sort');
    // if(!sorts){ sorts = {}; }

    // sorts[fld] = $(e.target).hasClass('desc') ? 1 : -1;

    // if(sorts[fld] == 1){
      // $(e.target).removeClass('desc').addClass('asc');
    // }else{
      // $(e.target).removeClass('asc').addClass('desc');
    // }


    // Session.set('ideation:sort', sorts);
  // },

  'change select[name=filter_type]': function(e){
    var filterType = $(e.target).val();
    Session.set('ideationFilterType', filterType);

    return false;
  },
  'click .show_modeling': function(){
    Session.set('currentModelingItem', this._id);
    $('#modal-show-modeling').modal();
    return false;
  },
  'click .show': function(e){
    Session.set('currentIdeation', this._id);
    $('#modal-show-ideation').modal();
    return false;
  },
  'click .delete': function(e){
    Cento.deleteWorkItem(this._id);
    console.log('deleted')
    return false;
  },
  'click .new_ideation': function(e){
    $('.modal.ideation_form').modal();
    return false;
  },
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

});
