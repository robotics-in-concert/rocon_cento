@Cento = {} unless @Cento?
@Cento.Files = new Meteor.Collection('files')
@Cento.Posts = new Meteor.Collection('posts')
@Cento.Categories = new Meteor.Collection('categories')

@Cento.Solutions = new Meteor.Collection('solutions')
@Cento.ItemGroups = new Meteor.Collection('item_groups')
@Cento.WorkItems = new Meteor.Collection('work_items')
