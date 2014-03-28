
Router.configure
  layoutTemplate: 'layout'


Router.map ()->
  this.route 'home',
    path: '/',
    template: 'home'

  this.route 'foo',
    path: '/foo',
    template: 'foo'
  
  this.route 'd3',
    path: '/d3',
    template: 'd3'

  this.route 'files',
    path: '/files',
    template: 'files'
