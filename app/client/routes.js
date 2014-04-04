

Router.configure({
  layoutTemplate: 'layout'
});


Router.map(function(){
  this.route('home', {
    path: '/',
    template: 'home'
  });


  this.route('login', {
    path: '/login',
  });

  this.route('users', {
    path: '/users',
  });

  this.route('ideation', {
    path: '/ideation',
    template: 'ideation',
    before: function(){
      Session.set('filesToAttach', []);
    }
  });

  this.route('modeling', {
    path: '/modeling',
    template: 'modeling'
  });

  this.route('battle', {
    path: '/battle',
    template: 'battle'
  });

  this.route('management', {
    path: '/management/:_id',
    template: 'management',
    data: function() {
      return Cento.Solutions.findOne(this.params._id);
    }
  });

  this.route('configuration', {
    path: '/configuration',
    template: 'configuration'
  });

  this.route('google_drive', {
    path: '/google_drive',
    template: 'google_drive'
  });

  this.route('catch_all', {
    path: '*',
    action: function() {
      this.redirect('home');
    }
});
