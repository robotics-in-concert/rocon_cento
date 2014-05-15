
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
    var m = null;
    if(m = location.pathname.match(/projects\/[^/]+\/(\w+)/)){
      location.href = "/projects/"+newSolutionId+"/"+m[1];
    }
    // else if(location.pathname.match(/ideations/)){
      // location.href = "/solutions/"+newSolutionId+"/ideations";

    // }
  }

});
