

Router.configure({
  layoutTemplate: 'layout'
});


Router.map(function(){
  this.route('home', {
    path: '/',
    template: 'home'
  });

  this.route('solutions', {
    path: '/solutions',
    template: 'solutions',
    data: function(){
      return {
        solutions: Cento.Solutions.find({})
      }

    }
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

  this.route('solutions_ideations', {
    path: '/solutions/:solution/ideations',
    template: 'ideation',
    onBeforeAction: function(){
      var ITEMS_PER_PAGE = 10;
      Session.setDefault('itemsLimit', ITEMS_PER_PAGE);
      Session.set('filesToAttach', []);
    },
    data: function(){
      var groupId = this.params.group;
      var sid = this.params.solution;
    
      var data = {};
      
      if(this.params.solution){
        data.currentSolution = Cento.Solutions.findOne({_id: this.params.solution});
      }
      data.workGroups = Cento.WorkGroups.find({solution_id: sid});
      var query = {type: Cento.WorkItemTypes.IDEA, solution_id: sid};
      if(groupId && groupId !== ""){
        query.work_group_id = groupId;
        data.group_id = groupId;
        data.currentWorkGroup = Cento.WorkGroups.findOne(groupId);
      }

      data.workItems = Cento.WorkItems.find(query, {limit: Session.get('itemsLimit'), sort: {'created': -1},
        transform: function(doc){
          doc.user = Meteor.users.findOne(doc.user_id);
          return doc;
        }
       });

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
      var sid = this.params.solution;
    
      var data = {};
      if(this.params.solution){
        data.solution = Cento.Solutions.findOne({_id: this.params.solution});
      }
      var query = {type: 'ideation'};
      if(categoryId && categoryId !== ""){
        query.category = categoryId;
        data.category = categoryId;
        data.workGroups = Cento.WorkGroups.find({solution_id: sid});

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


  this.route('solutions_modelings', {
    path: '/solutions/:solution/modelings',
    template: 'modeling_list',
    data: function(){
      var data = {};

      if(this.params.solution){
        data.currentSolution = Cento.Solutions.findOne({_id: this.params.solution});
      }
      data.workItems = Cento.WorkItems.find({
        type: Cento.WorkItemTypes.MODELING
      });


      return data;
    }

  });
  this.route('solutions_modelings_show', {
    path: '/solutions/:solution/modelings/:item',
    template: 'modeling_show',
    data: function(){
      var data = {};

      if(this.params.solution){
        data.currentSolution = Cento.Solutions.findOne({_id: this.params.solution});
      }
      data.workItems = Cento.WorkItems.find({
        type: Cento.WorkItemTypes.MODELING
      });

      data.workItem = Cento.WorkItems.findOne({_id: this.params.item});
      data.artifacts = Cento.Artifacts.find({work_item_id: this.params.item});



      return data;
    }

  });
  this.route('modeling2', {
    path: '/modeling2',
    template: 'modeling2',
    onBeforeAction: function(){
      Session.set('selectedWorkItem', null);

    },
    data: function(){
      var data = {};

      data.workItems = Cento.WorkItems.find({
        type: Cento.WorkItemTypes.MODELING
      });


      return data;
    }
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
