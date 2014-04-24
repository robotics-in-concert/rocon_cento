UI.registerHelper('$eq', function (a, b) {
  return (a === b); //Only text, numbers, boolean - not array & objects
});


UI.registerHelper('isActivePath', function(path){
  var current = Router.current();
  console.log(current);
  return current && current.route.name == path;
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

