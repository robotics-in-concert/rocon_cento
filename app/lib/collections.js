if(typeof Cento === 'undefined'){
  Cento = {};
}

Cento.Solutions = new Meteor.Collection('solutions');
Cento.WorkGroups = new Meteor.Collection('work_groups');
Cento.WorkItems = new Meteor.Collection('work_items');
Cento.Artifacts = new Meteor.Collection('artifacts');
Cento.Actions = new Meteor.Collection('actions');
Cento.Checklists = new Meteor.Collection('checklists');


Cento.WorkItemTypes = {
  IDEA: 'idea',
  MODELING: 'modeling',
  USER_NEEDS: 'user_needs'
};

Cento.WorkItemStatus = {
  TODO: 'todo',
  DOING: 'doing',
  DONE: 'done'
};

Cento.ActionTypes = {
  COMMENT: 'comment',
  COMMENT_ON_USERNEEDS: 'comment_on_user_needs',
  POST_IDEATION: 'post_ideation',
  POST_USER_NEEDS: 'post_user_needs',
  POST_ARTIFACTS: 'post_artifacts'
};




Cento.createAction = function(type, refId, extra){
  Cento.Actions.insert({type: type, user_id: Meteor.userId(), created_at: new Date(), ref_id: refId, extra: extra});
};

Cento.deleteWorkItem = function(id){
  Cento.WorkItems.update({_id: id}, {$set : {deleted_at: new Date}});
};


Cento.solutions = function(){
  return Cento.Solutions.find({deleted_at: {$exists: false}});
};
