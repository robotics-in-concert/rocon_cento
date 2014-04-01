Handlebars.registerHelper 'avatarUrl', (context, options)->
  u = Meteor.user()
  if u.services.github?
    u.profile.avatar_url
  else if u.services.trello?
    "https://trello-avatars.s3.amazonaws.com/#{u.services.trello.avatarHash}/30.png"

Handlebars.registerHelper 'username', (context, options)->
  u = Meteor.user()
  if u.services.github?
    u.profile.login
  else if u.services.trello?
    u.services.trello.username
