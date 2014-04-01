Template.layout.isActivePath = (path)->
  current = Router.current()
  return current && current.route.name == path

Template.layout.events
  'click #github_login': ->
    Meteor.loginWithGithub requestPermissions: ['user'], (e)->
      console.log(e)
      location.href = "/"
Template.layout.events
  'click #trello_login': ->
    Meteor.loginWithTrello requestPermissions: ['user'], (e)->
      console.log(e)
      location.href = "/"
  'click #github_logout': ->
    Meteor.logout (e)->
      if e?
        console.log e
      else
        alert('logged out!')

