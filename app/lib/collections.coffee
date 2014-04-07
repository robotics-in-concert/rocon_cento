@Cento = {} unless @Cento?
@Cento.Files = new Meteor.Collection('files')
@Cento.Posts = new Meteor.Collection('posts')
@Cento.Categories = new Meteor.Collection('categories')
