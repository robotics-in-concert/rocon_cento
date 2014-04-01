Trello = {} unless Trello?

if Meteor.isClient
  Accounts.oauth.registerService('trello')


  Trello.requestCredential = (options, credentialRequestCompleteCallback)->
    if !credentialRequestCompleteCallback && typeof options == 'function'
      credentialRequestCompleteCallback = options
      options = {}
  
    config = ServiceConfiguration.configurations.findOne({service: 'trello'})
    unless config
      credentialRequestCompleteCallback && credentialRequestCompleteCallback(new ServiceConfiguration.ConfigError("Service not configured"))
  
    credentialToken = Random.id()
    callbackUrl = Meteor.absoluteUrl('_oauth/trello?close&state=' + credentialToken)
  
    url = '/_oauth/trello/?requestTokenAndRedirect=' + encodeURIComponent(callbackUrl) + '&state=' + credentialToken
    Oauth.showPopup url, _.bind(credentialRequestCompleteCallback, null, credentialToken), width: 700, height: 600

  Meteor.loginWithTrello = (options, callback)->
    if not callback and typeof options == "function"
      callback = options
      options = null

    credentialRequestCompleteCallback = Accounts.oauth.credentialRequestCompleteHandler(callback)
    Trello.requestCredential(options, credentialRequestCompleteCallback)




else # isServer

  querystring = Npm.require('querystring')

  urls =
    requestToken: "https://trello.com/1/OAuthGetRequestToken"
    accessToken: "https://trello.com/1/OAuthGetAccessToken"
    authenticate: (oauthBinding)->
      params = {}

      # // allow for reading from config
      if(oauthBinding._config)

        if (oauthBinding._config.name)
          params['name'] = oauthBinding._config.name

        if (oauthBinding._config.scope)
          params['scope'] = oauthBinding._config.scope

        if (oauthBinding._config.expiration)
          params['expiration'] = oauthBinding._config.expiration

      params['oauth_token'] = oauthBinding.requestToken

      "https://trello.com/1/OAuthAuthorizeToken?" + querystring.stringify(params)

  Trello.otherUsersWhitelistedFields = [
    "id",
    "avatarHash",
    "bio",
    "fullName",
    "initials",
    "memberType",
    "status",
    "url",
    "username",
    "avatarSource",
    "gravatarHash",
    "idOrganizations",
    "prefs",
    "trophies",
    "uploadedAvatarHash"
  ]

  Trello.loggedInUserWhitelistedFields = [
    "id",
    "avatarHash",
    "bio",
    "confirmed",
    "fullName",
    "idPremOrgsAdmin",
    "initials",
    "memberType",
    "status",
    "url",
    "username",
    "avatarSource",
    "email",
    "gravatarHash",
    "idBoards",
    "idBoardsInvited",
    "idBoardsPinned",
    "idOrganizations",
    "idOrganizationsInvited",
    "loginTypes",
    "newEmail",
    "oneTimeMessagesDismissed",
    "prefs",
    "trophies",
    "uploadedAvatarHash"
  ]


  Oauth.registerService 'trello', 1, urls, (oauthBinding)->
    identity = oauthBinding.get('https://api.trello.com/1/members/me').data

    serviceData = {
      id: identity.id,
      screenName: identity.fullName,
      accessToken: oauthBinding.accessToken,
      accessTokenSecret: oauthBinding.accessTokenSecret
    }

    # // include helpful fields from trello
    fields = _.pick(identity, Trello.loggedInUserWhitelistedFields)
    _.extend(serviceData, fields)


    result =
      serviceData: serviceData
      options:
        profile:
          name: identity.fullName
    result


  Trello.retrieveCredential = (credentialToken)->
    return Oauth.retrieveCredential(credentialToken)

  forLoggedInUserAutopublishedFields = _.map Trello.loggedInUserWhitelistedFields.concat(['id', 'fullName']), (subfield)-> 'services.trello.' + subfield

  forOtherUsersAutopublishedFields = _.map Trello.otherUsersWhitelistedFields.concat(['id', 'fullName']), (subfield)-> 'services.trello.' + subfield

  Accounts.addAutopublishFields
    forLoggedInUser: forLoggedInUserAutopublishedFields,
    forOtherUsers: forOtherUsersAutopublishedFields



