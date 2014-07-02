
Template.solution_lnb.helpers({
  'watching': function(){
    var uid = Meteor.userId();
    var sol = Session.get('currentSolution');
    
    if(!sol.subscribers){
      return false;
    }
    return _.include(sol.subscribers, uid);

  },
  'users': function(){

    return Meteor.users.find({'services.github': {$exists: true}}).fetch();
    // return Meteor.users.find({});
  },
  'solution': function(){
    var cur = Session.get('currentSolution');
    return cur;
  },
});

Template.solution_lnb.events({
  'click .watch': function(e){
    var s = Session.get('currentSolution');
    Cento.Solutions.update({_id: s._id}, {$push: {subscribers: Meteor.userId()}});
    return false;
  },
  'click .unwatch': function(e){
    var s = Session.get('currentSolution');
    Cento.Solutions.update({_id: s._id}, {$pull: {subscribers: Meteor.userId()}});
    return false;
  },
  'change select[name=solutions]': function(e){
    var newSolutionId = $(e.target).val();
    var m = null;
    if(m = location.pathname.match(/projects\/[^/]+\/(\w+)/)){
      location.href = "/projects/"+newSolutionId+"/"+m[1];
    }
    // else if(location.pathname.match(/ideations/)){
      // location.href = "/solutions/"+newSolutionId+"/ideations";

    // }
  }

});
