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

// FIXME
Handlebars.registerHelper('avatarUrl', function(user){
  var u = user;
  if(typeof user === 'string'){
    u = Meteor.users.findOne(u);
  }

  // if(!u) u = Meteor.user();
  
  if(typeof u !== 'undefined' && typeof u.services !== 'undefined' && u.services.google){
    if(u.services.github){
      return u.profile.avatar_url;
    }else if(u.services.google){
      return u.services.google.picture;
    }
  }

  return "";
  // else if(u.services.trello)
    // return "https://trello-avatars.s3.amazonaws.com/#{u.services.trello.avatarHash}/30.png";
});

// FIXME
Handlebars.registerHelper('username', function(user){
  var u = user;
  if(typeof user === 'string'){
    u = Meteor.users.findOne(u);
  }

  if(typeof u !== 'undefined' && typeof u.services !== 'undefined' && u.services.google){
    if(u.services.github){
      return u.profile.login;
    }else if(u.services.google){
      return u.services.google.name;
    }
  }
  return "";
});

