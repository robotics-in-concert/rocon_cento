if(typeof Cento === 'undefined'){
  Cento = {};
}

Cento.Solutions = new Meteor.Collection('solutions');
Cento.WorkGroups = new Meteor.Collection('work_groups');
Cento.WorkItems = new Meteor.Collection('work_items');
Cento.Artifacts = new Meteor.Collection('artifacts');
Cento.Actions = new Meteor.Collection('actions');


Cento.WorkItemTypes = {
  IDEA: 'idea',
  MODELING: 'modeling'
};

Cento.WorkItemStatus = {
  TODO: 'todo',
  DOING: 'doing',
  DONE: 'done'
};

