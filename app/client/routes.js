

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
    path: '/ideation/:_id',
    template: 'ideation',
    before: function(){
      Session.set('filesToAttach', []);
    },
    data: function() {
      return Cento.WorkItems.findOne(this.params._id);
    }
  });

  this.route('modeling', {
    path: '/modeling/:_id',
    template: 'modeling',
    data: function() {
      return Cento.WorkItems.findOne(this.params._id);
    }
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
});
