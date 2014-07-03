Meteor.users.allow
  'update': (userId, doc)->
    true
Accounts.onCreateUser (opts, user)->

  if user.services.github?
    accessToken = user.services.github.accessToken

    result = Meteor.http.get "https://api.github.com/user",
      headers: {"User-Agent": "Rocon/0.1"}
      params:
        access_token: accessToken

    if result.error?
      throw result.error

    user.profile = result.data
  user
