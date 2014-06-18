
/*
 * Hooks
 *
 */
var Hooks = {
  'loginRequired': function(pause){
    if(!(Meteor.loggingIn() || Meteor.user())){
      alertify.error("Please login.");
      // this.render('login');
      // pause();
      this.redirect('login')
      return false;
    }
  }

};

Router.configure({
  layoutTemplate: 'layout',
});

Router.onBeforeAction(function(){
  Session.set('currentSolution', Cento.Solutions.findOne({_id: this.params.solution}));
});
Router.onBeforeAction(Hooks.loginRequired, {except: ['login']});


Router.map(function(){
  this.route('home', {
    path: '/',
    template: 'home',
    data: function(){
      return {
        solutions: Cento.solutions()
      }

    }
  });

  this.route('projects', {
    path: '/projects',
    template: 'projects',
    data: function(){
      return {
        solutions: Cento.solutions(),
        users: Meteor.users.find({'services.github': {$exists: true}}).fetch()
      }

    }
  });

  this.route('user_needs', {
    path: '/user_needs',
    template: 'user_needs',
    onBeforeAction: function(){
      Session.set('filesToAttach', []);
    },
    data: function(){
      var data = {};
      var groupId = this.params.group;

      data.workGroups = Cento.WorkGroups.find({solution_id: {$exists: false}});
      var query = {type: Cento.WorkItemTypes.USER_NEEDS, deleted_at: {$exists: false}};
      if(groupId && groupId !== ""){
        query.work_group_id = groupId;
        data.group_id = groupId;
        data.currentWorkGroup = Cento.WorkGroups.findOne(groupId);
      }

      data.workItems = Cento.WorkItems.find(query, {limit: Session.get('itemsLimit'), sort: {'created': -1},
        transform: function(doc){
          doc.user = Meteor.users.findOne(doc.user_id);
          doc.solutions = Cento.Solutions.find({'related.related_work_id': doc._id}).fetch();
          return doc;
        }
       });
      data.notifications = Cento.WorkItems.find(query, {limit: 4, sort: {'created': -1},
        transform: function(doc){
          doc.user = Meteor.users.findOne(doc.user_id);
          doc.solutions = Cento.Solutions.find({'related.related_work_id': doc._id}).fetch();
          return doc;
        }
       });
      data.actions = Cento.Actions.find({type: Cento.ActionTypes.COMMENT_ON_USERNEEDS}, {limit: 5, sort: {created_at: -1}});

      return data;
    }
  });

  this.route('projects_management', {
    path: '/projects/:solution/management',
    template: 'management',
    data: function(){
      var data = {};
      var sid = this.params.solution;
      data.ideations = Cento.WorkItems.find({type: Cento.WorkItemTypes.IDEA, solution_id: sid});
      data.modelings = Cento.WorkItems.find({type: {$ne: Cento.WorkItemTypes.IDEA}, solution_id: sid});
      return data;
    }
  });
  this.route('projects_solutions', {
    path: '/projects/:solution/solutions',
    template: 'solutions'
  });
  this.route('projects_battleloom', {
    path: '/projects/:solution/battle_loom',
    template: 'battle_loom'
  });
  this.route('projects_ideations', {
    path: '/projects/:solution/ideations',
    template: 'ideation',
    onBeforeAction: function(){
      var ITEMS_PER_PAGE = 10;
      Session.setDefault('itemsLimit', ITEMS_PER_PAGE);
      Session.set('filesToAttach', []);
    },
    onBeforeAction: function(){
      if(location.hash){
        Template.ideation_show_modal.rendered = function(){
          Session.set('currentIdeation', location.hash.substring(1));
          $('#modal-show-ideation').modal();
        };
      }
    },
    data: function(){
      var groupId = this.params.group;
      var sid = this.params.solution;
    
      var data = {};
      data.solutions = Cento.solutions();
      data.users = Meteor.users.find({});
      
      data.workGroups = Cento.WorkGroups.find({solution_id: sid});
      var query = {type: Cento.WorkItemTypes.IDEA, solution_id: sid, deleted_at:{$exists: false}};
      if(groupId && groupId !== ""){
        query.work_group_id = groupId;
        data.group_id = groupId;
        data.currentWorkGroup = Cento.WorkGroups.findOne(groupId);
      }

      data.notifications = Cento.WorkItems.find(query, {limit: 4, sort: {'created': -1}, deleted_at: {$exists: false},
        transform: function(doc){
          doc.user = Meteor.users.findOne(doc.user_id);
          doc.solutions = Cento.Solutions.find({'related.related_work_id': doc._id}).fetch();
          return doc;
        }
       });
      data.workItems = Cento.WorkItems.find(query, {limit: Session.get('itemsLimit'), sort: {'created': -1},
        transform: function(doc){
          doc.user = Meteor.users.findOne(doc.user_id);
          return doc;
        }
       });

      return data;
    }
  });




  this.route('projects_modelings', {
    path: '/projects/:solution/modelings',
    template: 'modelings',
    onAfterAction: function(){
      console.log(location.hash);

    },
    data: function(){
      var data = {};

      var sid = this.params.solution;
    
      data.solutions = Cento.solutions();
      data.users = Meteor.users.find({});
      
      data.workGroups = Cento.WorkGroups.find({solution_id: sid});
      var query = {type: Cento.WorkItemTypes.MODELING, solution_id: sid, deleted_at: {$exists: false}};

      data.notifications = Cento.WorkItems.find(query, {limit: 4, sort: {'created': -1},
        transform: function(doc){
          doc.user = Meteor.users.findOne(doc.user_id);
          doc.solutions = Cento.Solutions.find({'related.related_work_id': doc._id}).fetch();
          return doc;
        }
       });
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

  /*
   * admin
   */

  this.route('admin', {
    path: '/admin',
    layoutTemplate: 'admin_layout',
    template: 'admin',
    data: function(){
    }
  });
  this.route('admin_users', {
    path: '/admin/users',
    layoutTemplate: 'admin_layout',
    template: 'admin_users',
    data: function(){
      return {
        users: Meteor.users.find({'services.github':{$exists: true}})
      };
    }

  });
  this.route('admin_artifacts', {
    path: '/admin/artifacts',
    layoutTemplate: 'admin_layout',
    template: 'admin_artifacts',
    data: function(){
      return {
        artifacts: Cento.Artifacts.find({})
      };
    }

  });
  this.route('admin_user_needs', {
    path: '/admin/user_needs',
    layoutTemplate: 'admin_layout',
    template: 'admin_user_needs',
    data: function(){
      return {
        solutions: Cento.Solutions.find({})
      };
    }

  });
  this.route('admin_solutions', {
    path: '/admin/solutions',
    layoutTemplate: 'admin_layout',
    template: 'admin_solutions',
    data: function(){
      return {
        solutions: Cento.Solutions.find({})
      };
    }

  });

});
