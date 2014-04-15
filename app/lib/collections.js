if(typeof this.Cento === 'undefined'){
  this.Cento = {};
}

this.Cento.Solutions = new Meteor.Collection('solutions');
this.Cento.WorkGroups = new Meteor.Collection('work_groups');
this.Cento.WorkItems = new Meteor.Collection('work_items');
this.Cento.Artifacts = new Meteor.Collection('artifacts');
this.Cento.Actions = new Meteor.Collection('actions');


this.Cento.WorkItemTypes = {
  IDEA: 'idea',
  MODELING: 'modeling'
};

this.Cento.WorkItemStatus = {
  TODO: 'todo',
  DOING: 'doing',
  DONE: 'done'
};

// old stuff, should be removed
this.Cento.Files = new Meteor.Collection('files');
this.Cento.Posts = new Meteor.Collection('posts');
this.Cento.Categories = new Meteor.Collection('categories');
