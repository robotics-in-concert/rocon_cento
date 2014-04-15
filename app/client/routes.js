

Router.configure({
  layoutTemplate: 'layout'
});


Router.map(function(){
  this.route('home', {
    path: '/',
    template: 'home'
  });

  this.route('admin_solution', {
    path: '/admin/solutions',
    template: 'admin_solutions',
    data: function(){
      return {
        solutions: Cento.Solutions.find({})
      };
    }

  });

  this.route('solution_ideation', {
    path: '/solutions/:solution/ideation',
    template: 'ideation',
    onBeforeAction: function(){
      var ITEMS_PER_PAGE = 10;
      Session.setDefault('itemsLimit', ITEMS_PER_PAGE);
      Session.set('filesToAttach', []);
    },
    data: function(){
      console.log("DATA!!!!")
      console.log(this.params);
      var categoryId = this.params.category;
    
      var data = {};
      if(this.params.solution){
        data.solution = Cento.Solutions.findOne({_id: this.params.solution});
      }
      var query = {type: 'ideation'};
      if(categoryId && categoryId !== ""){
        query.category = categoryId;
        data.category = categoryId;

        console.log(categoryId);
      }

      data['posts'] = Cento.Posts.find(query, {limit: Session.get('itemsLimit'), sort: {'created': -1},
        transform: function(doc){
          doc.user = Meteor.users.findOne(doc.user_id);
          return doc;
        }
       });

      if(categoryId){
        data.currentCategory = Cento.Categories.findOne(categoryId);
        return data;
      }
      return data;
    }
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
      var ITEMS_PER_PAGE = 10;
      Session.setDefault('itemsLimit', ITEMS_PER_PAGE);
      Session.set('filesToAttach', []);
    },
    data: function(){
      console.log("DATA!!!!")
      console.log(this.params);
      var categoryId = this.params.category;
    
      var data = {};
      if(this.params.solution){
        data.solution = Cento.Solutions.findOne({_id: this.params.solution});
      }
      var query = {type: 'ideation'};
      if(categoryId && categoryId !== ""){
        query.category = categoryId;
        data.category = categoryId;

        console.log(categoryId);
      }

      data['posts'] = Cento.Posts.find(query, {limit: Session.get('itemsLimit'), sort: {'created': -1},
        transform: function(doc){
          doc.user = Meteor.users.findOne(doc.user_id);
          return doc;
        }
       });

      if(categoryId){
        data.currentCategory = Cento.Categories.findOne(categoryId);
        return data;
      }
      return data;
    }
    });

  this.route('modeling', {
    path: '/modeling',
    template: 'modeling'
  });

  this.route('battle_loom', {
    path: '/battle_loom',
    template: 'battle_loom'
  });

  this.route('management', {
    path: '/management',
    template: 'management'
  });

  this.route('solution', {
    path: '/solution',
    template: 'solution'
  });

  this.route('google_drive', {
    path: '/google_drive',
    template: 'google_drive'
  });
  this.route('manage', {
    path: '/manage',
    template: 'manage'
  });

});
