
Template.solution_lnb.helpers({
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
  'change select[name=solutions]': function(e){
    var newSolutionId = $(e.target).val();
    if(location.pathname.match(/modelings/)){
      location.href = "/solutions/"+newSolutionId+"/modelings";

    }
    else if(location.pathname.match(/ideations/)){
      location.href = "/solutions/"+newSolutionId+"/ideations";

    }
  }

});
