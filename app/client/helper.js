UI.registerHelper('$include', function(arr, item){
  return _.include(arr, item);

});


UI.registerHelper('default', function(a, x) {
  if(typeof a === 'undefined'){
    return x;
  }
  return a;
});



UI.registerHelper('workGroups', function () {
  var sol = Session.get('currentSolution');
  if(!sol)
    return null;
  return Cento.WorkGroups.find({solution_id: sol._id});
});

UI.registerHelper('workItemsInGroup', function (gid) {
  var sol = Session.get('currentSolution');
  var filter = {work_group_id: {$exists: false}};
  if(sol){
    filter.solution_id = sol._id;
  }

  if(gid) filter.work_group_id = gid;


  console.log("management filter", filter);


  return Cento.WorkItems.find(filter);
});


UI.registerHelper('solutionLabelText', function(labelClr){
  var sol = Session.get('currentSolution');
  var colors =  ["green", "yellow", "orange", "red", "purple", "blue"];
  var idx = _.indexOf(colors, labelClr);
  console.group('labelText');
  console.log(idx);
  console.groupEnd();

  return sol.label_titles ? sol.label_titles[idx] : '';
});

UI.registerHelper('solutionLabels', function(){
  var sol = Session.get('currentSolution');
  var colors =  ["green", "yellow", "orange", "red", "purple", "blue"];
  var titles = sol.label_titles || [];

  data = _.reduce(_.zip(colors, titles), function(memo, arr){
    memo.push({color: arr[0], title: arr[1]});
    return memo;
  }, []);
  console.log(data);
  return data;
});

UI.registerHelper('$eq', function (a, b) {
  return (a === b); //Only text, numbers, boolean - not array & objects
});

UI.registerHelper('tagsJoin', function(tags){
  if(tags){
    return tags.join(", ");
  }
  return "";
});

UI.registerHelper('getChecklists', function(id){
  return Cento.Checklists.find({work_item_id: id}, {}, {sort: {created: -1}});
});

UI.registerHelper('getWorkItem', function(id){
  return Cento.WorkItems.findOne({_id: id});
});
UI.registerHelper('getArtifact', function(id){
  return Cento.Artifacts.findOne({_id: id});
});
UI.registerHelper('artifacts', function(wid){
  return Cento.Artifacts.find({work_item_id: wid});
});


UI.registerHelper('isActivePath', function(path){
  var current = Router.current();
  return current && current.route.name == path;
});
UI.registerHelper('solutions', function(a, x) {
  return Cento.solutions();
});

UI.registerHelper('currentSolution', function(){
  return Session.get('currentSolution');
});
UI.registerHelper('formatDate', function(dt, format){
  return moment(dt).format(format);
});

UI.registerHelper('activeIfEq', function(a, b){
  if(a === b) {
    return "active";
  } else {
    return "";
  }
});
UI.registerHelper('selectIfEq', function(a, b){
  if(a === b) {
    console.log('1');
    return "selected";
  } else {
    console.log('2');
    return "";
  }
});

UI.registerHelper('itemStatusLabelClass', function(status){
  if(status === 'todo'){
    return 'label-default';
  }else if(status == 'doing'){
    return 'label-info';
  }else if(status == 'done'){
    return 'label-success';
  }
});

UI.registerHelper('fileIconPath', function(name){
  var m = name.match(/\.([0-9a-zA-Z]+)$/i);
  var ext = "file";
  if(m){
    ext = m[1];
  }

  return "/fileicons/"+ext+".png";
});
UI.registerHelper('fileIsImage', function(name){
  var m = name.match(/\.([0-9a-zA-Z]+)$/i);
  if(_.include(['jpg', 'jpeg', 'png', 'gif'], m[1].toLowerCase()))
    return true;
  return false;
});

UI.registerHelper('nl2br', function(text){
  var nl2br = (text + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g,
    '$1' + '<br>' + '$2');
  return new Spacebars.SafeString(nl2br);
});

UI.registerHelper('avatarUrl', function(user){
  var u = user;
  if(typeof user === 'string'){
    u = Meteor.users.findOne(u);
  }
  try{
    return u.profile.avatar_url;
  }catch(e){
    return "";
  }

});

UI.registerHelper('allUsers', function(){
  return Meteor.users.find();
});

UI.registerHelper('username', function(user){
  var u = user;
  if(typeof user === 'string'){
    u = Meteor.users.findOne(u);
  }
  try{
    return u.profile.login;
  }catch(e){
    return "";
  }
});

