
Router.configure
  layoutTemplate: 'layout'


Router.map ()->
  @route 'home',
    path: '/',
    template: 'home'

  @route 'foo',
    path: '/foo',
    template: 'foo'
  
  @route 'd3',
    path: '/d3',
    template: 'd3'

  @route 'files',
    path: '/files',
    template: 'files'

