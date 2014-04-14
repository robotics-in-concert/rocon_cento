@Cento = {} unless @Cento?
# TODO: Merge these into main data model, as Artifacts or something like that
@Cento.Files = new Meteor.Collection('files')
@Cento.Posts = new Meteor.Collection('posts')
@Cento.Categories = new Meteor.Collection('categories')

@Cento.Solutions = new Meteor.Collection('solutions')
@Cento.WorkItems = new Meteor.Collection('work-items')
@Cento.Artifacts = new Meteor.Collection('artifacts')
@Cento.Actions = new Meteor.Collection('actions')

@Cento.WorkItemTypes =
  IDEA: 'idea'
  USER_STORY: 'user_story'
  BUSINESS_MODEL: 'business_model'
  SPECIFICATION: 'specification'

@Cento.WorkItemStatus =
  TODO: 'todo'
  DOING: 'doing'
  DONE: 'done'
