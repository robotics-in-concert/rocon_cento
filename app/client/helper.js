UI.registerHelper('currentSolution', function(){
  return Session.get('currentSolution');
});
Handlebars.registerHelper('formatDate', function(dt, format){
  return moment(dt).format(format);
});

Handlebars.registerHelper('activeIfEq', function(a, b){
  if(a === b) {
    return "active";
  } else {
    return "";
  }
});
Handlebars.registerHelper('selectIfEq', function(a, b){
  if(a === b) {
    return "select='selected'";
  } else {
    return "";
  }
});

Handlebars.registerHelper('fileIconPath', function(name){
  var m = name.match(/\.([0-9a-zA-Z]+)$/i);
  var ext = "file";
  if(m){
    ext = m[1];
  }

  return "/fileicons/"+ext+".png";
});

Handlebars.registerHelper('nl2br', function(text){
  var nl2br = (text + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g,
    '$1' + '<br>' + '$2');
  return new Handlebars.SafeString(nl2br);
});

Handlebars.registerHelper('avatarUrl', function(user){
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

Handlebars.registerHelper('username', function(user){
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

