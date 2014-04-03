
Router.configure
  layoutTemplate: 'layout'


Router.map ()->
  @route 'home',
    path: '/',
    template: 'home'

  @route 'login',
    path: '/login',

  @route 'users',
    path: '/users',

  @route 'ideation',
    path: '/ideation',

  @route 'modeling',
    path: '/modeling',

  @route 'battle',
    path: '/battle',

  @route 'management',
    path: 'management/:_id'
    template: 'management'
    data: () -> Cento.Solutions.findOne @params._id

  @route 'configuration',
    path: '/configuration',

  @route 'google_drive',
    path: '/google_drive',

  @route 'catch_all',
    path: '*',
    action: () ->
      @redirect 'home'
