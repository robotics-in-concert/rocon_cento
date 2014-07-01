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
      openWorkItemModal(cid)
    }else if(m.type == Cento.WorkItemTypes.MODELING){
      openWorkItemModal(cid)
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
      openWorkItemModal(m._id);
    }else if(m.type == Cento.WorkItemTypes.MODELING){
      openWorkItemModal(m._id);
    }else{
      openWorkItemModal(m._id);

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


