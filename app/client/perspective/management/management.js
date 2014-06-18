Template.management.rendered = function(){

  $('body').click(function(){
    var dd = $('#card_actions_dropdown');
    dd.hide();
  });

};

Template.management.events({
  'click #card_actions_dropdown .show': function(){
    var cid = Session.get('selectedCardId');
    var m = Cento.WorkItems.findOne({_id: cid});
    console.log(m);
    if(m.type == Cento.WorkItemTypes.IDEA){
      Session.set('currentIdeation', m._id);
      $('#modal-show-ideation').modal();
    }else if(m.type == Cento.WorkItemTypes.MODELING){
      Session.set('currentModelingItem', m._id);
      $('#modal-show-modeling').modal();

    }
    $('#card_actions_dropdown').hide();
    return false;

  },
  'click #card_actions_dropdown .delete': function(){
    var cid = Session.get('selectedCardId');
    var m = Cento.WorkItems.remove({_id: cid});
    $('#card_actions_dropdown').hide();
    return false;

  }

});
Template.card.events({
  'click .card': function(e){
    var m = this;
    if(m.type == Cento.WorkItemTypes.IDEA){
      Session.set('currentIdeation', this._id);
      $('#modal-show-ideation').modal();
    }else if(m.type == Cento.WorkItemTypes.MODELING){
      Session.set('currentModelingItem', this._id);
      $('#modal-show-modeling').modal();

    }else{
      Session.set('currentModelingItem', this._id);
      $('#modal-show-modeling').modal();

    }


    // Router.go('solutions_modelings_show', {solution: m.solution_id, item: m._id});

    return false;
  },
  'click .more': function(e){
    var m = this;

    Session.set('selectedCardId', m._id);
    var a = $(e.target);
    var dd = $('#card_actions_dropdown');

    dd.show()
      .css('top', a.offset().top + a.height())
      .css('left', a.offset().left);
    return false;
  }

});


