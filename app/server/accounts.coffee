Meteor.users.allow
  'update': (userId, doc)->
    true

get_remote_profile = (user)->
  if user.services.github?
    accessToken = user.services.github.accessToken

    result = Meteor.http.get "https://api.github.com/user",
      headers: {"User-Agent": "Rocon/0.1"}
      params:
        access_token: accessToken

    if result.error?
      throw result.error

    result.data

  else if user.services.google?
    accessToken = user.services.google.accessToken

    result = Meteor.http.get "https://www.googleapis.com/oauth2/v3/userinfo",
      headers: {"User-Agent": "Meteor/1.0"}
      params:
        access_token: accessToken

    if result.error?
      throw result.error

    profile = _.pick result.data,
      "name",
      "given_name",
      "family_name",
      "profile",
      "picture",
      "email",
      "email_verified",
      "birthdate",
      "gender",
      "locale",
      "hd"
    profile.avatar_url = profile.picture
    profile.login = profile.given_name
    profile

Accounts.onLogin (attempt)->
  # console.log 'onLogin', attempt
  # console.log attempt.user._id
  user = Meteor.users.findOne(attempt.user._id)
  profile = get_remote_profile(user)
  Meteor.users.update({_id: user._id}, {$set: {profile: profile}})

  user


  

Accounts.onCreateUser (opts, user)->
  console.log 'onCreateUser'
  profile = get_remote_profile(user)
  user.profile = profile

  user
