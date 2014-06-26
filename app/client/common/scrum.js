Template.scrum.helpers({
  'scrumLogs': function(workItemId){
    var solution = Session.get('currentSolution');

    return _.filter(solution.scrum, function(log){
      return log.work_item_id == workItemId;
    });

  }

});

Template.scrum.events({

  'click .save_scrum': function(e){

    var $f = $(e.target).closest('form');
   
    var sid = Session.get('currentSolution')._id;
    var data = {
      work_item_id: this._id,
      created: new Date(),
      spent: $f.find('input[name=spent]').val(),
      estimation: $f.find('input[name=estimation]').val(),
      description: $f.find('input[name=description]').val(),
      user_id: Meteor.userId()

    };
    Cento.Solutions.update({_id: sid}, {$push: {scrum: data}});

    return false;


  }

});
