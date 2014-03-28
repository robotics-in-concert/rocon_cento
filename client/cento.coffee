Deps.autorun (c)->
  console.log 'autorun called'
  unless Session.equals("shouldAlert", true)
    return

  c.stop()
  console.log("Oh no!")

Template.d3.rendered = ->
  svg = @find('#svg')
  new TrelloCards(svg)

Template.foo.value = ->
  Session.get('foo.value')

Template.foo.value2 = -> Session.get('foo.value2')
Template.foo.events =
  'click .save': (e)->
    v = $('input').val()
    Session.set('foo.value2', v)

Template.files.events
  'change input': (e, t)->
    _.each e.target.files, (file)->
      Meteor.saveFile(file);


    t.find('input[type=file]').value = ''
Template.files.files = ->
  Cento.Files.find({}, {sort: {created: -1}})



Template.layout.events
  'click #github_login': ->
    Meteor.loginWithGithub requestPermissions: ['user'], (e)->
      console.log(e)
  'click #github_logout': ->
    Meteor.logout (e)->
      if e?
        console.log e
      else
        alert('logged out!')

