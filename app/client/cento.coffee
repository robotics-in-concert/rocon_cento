Deps.autorun (c)->
  solution = Session.get('currentSolution')
  $('.navbar select option').removeAttr('selected')
  if solution?
    console.log "SS", solution._id
    $('.navbar select option[value='+solution._id+']').attr('selected', 'selected')

Template.layout.rendered = ->
  sid = $('.navbar select').data('current_solution')
  $('.navbar select option[value='+sid+']').attr('selected', 'selected')


  $('.navbar select').change ->
    sid = $(@).val()
    # location.href = '/solutions/'+sid+'/ideations'
    Router.go('solutions_ideations', {solution: sid})
    false


Template.layout.isActivePath = (path)->
  current = Router.current()
  return current && current.route.name == path

Template.layout.selectIfCurrentSolution = (currentSolution)->
      # return "selected=\"selected\""
      return "selected"
  # console.log(currentSolution);
  # unless currentSolution?
    # return ""
  # else
    # if @_id == currentSolution._id
      # return "selected='selected'"
    # else
      # ""

Template.layout.solutions = ->
  Cento.Solutions.find({})


  
Template.layout.solution = ->
  Session.get('currentSolution')


Template.layout.events
  'click #github_login': ->
    Meteor.loginWithGithub requestPermissions: ['user'], (e)->
      console.log(e)
      location.href = "/"

  'click #google_login': ->
    Meteor.loginWithGoogle requestPermissions: ['https://www.googleapis.com/auth/drive.readonly',
      'https://www.googleapis.com/auth/userinfo.profile'], (e)->
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


Template.google_drive.items = ->
  Session.get("google_drive_items", [])

Template.google_drive.events =
  'click #google_drive_items a': (e, t)->
    embedLink = $(e.target).data('embed_link')
    console.log embedLink
    $('iframe#embed_frame').attr('src', embedLink)

Template.google_drive.rendered = _.once(->
  url = "https://www.googleapis.com/drive/v2/files"
  auth = 'Bearer ' + Meteor.user().services.google.accessToken
  clientId = Accounts.loginServiceConfiguration.findOne({service: 'google'}).clientId
  
  Meteor.http.get url,
    params: {key: clientId, maxResults: 10}
    data: event
    headers: {'Authorization': auth }
    (err, result)->
      unless err?
        data = JSON.parse(result.content)
        Session.set("google_drive_items", data.items)
        console.log data
)
