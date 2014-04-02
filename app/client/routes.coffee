
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
    template: 'ideation'

  @route 'modeling',
    path: '/modeling',
    template: 'modeling'

  @route 'battle',
    path: '/battle',
    template: 'battle'

  @route 'management',
    path: '/management',
    template: 'management'

  @route 'configuration',
    path: '/configuration',
    template: 'configuration'

  @route 'google_drive',
    path: '/google_drive',
    template: 'google_drive'

