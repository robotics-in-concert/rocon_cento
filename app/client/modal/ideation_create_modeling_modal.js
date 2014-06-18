Template.ideation_create_modeling_modal.helpers({
  'currentIdeation': function(){
    return Cento.WorkItems.findOne({_id: Session.get('currentIdeation')});
  },
  'workItemTypes': function(){
    var sol = Session.get('currentSolution');
    var defaults = ['modeling'];
    if(sol){
      var types = sol.work_item_types || []
      _.each(defaults, function(d){ types.push(d); })
      // types.splice(0, 0, 'modeling');
      return _.unique(types);
    }else{
      return defaults;
    }
  }


});
Template.ideation_create_modeling_modal.rendered = function(){
  $(function(){
  $('select.select2').select2({width: '200px'});
  });

};
Template.ideation_create_modeling_modal.events({
  'click .create_task': function(e){
    var ideation = Cento.WorkItems.findOne({_id: Session.get('currentIdeation')});
    var f = $(e.target).closest('form');
    var modal = $(e.target).closest('.modal');
    var title = f.find('input[name=title]').val();
    var description = f.find('textarea').val();


    // var workType = f.find('select[name=type]').select2('val');
    var assignee = f.find('select[name=assignees]').select2('val');
    var work_item_type = f.find('select[name=work_item_type]').select2('val');
    var reviewers = f.find('select[name=reviewers]').select2('val');
    console.log(assignee, reviewers);

    try {
      Cento.WorkItems.insert({
        type: work_item_type,
        status: Cento.WorkItemStatus.TODO,
        solution_id: ideation.solution_id,
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
    }catch(e){
      console.error(e);
    }


    return false;


  }
});
