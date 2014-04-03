Handlebars.registerHelper('formatDate', function(dt, format, options){
  return moment(dt).format(format);
});

Handlebars.registerHelper('nl2br', function(text){
  var nl2br = (text + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + '<br>' + '$2');
  return new Handlebars.SafeString(nl2br);0
});


Handlebars.registerHelper('avatarUrl', function(user, options){
  var u = user;
  // if(!u) u = Meteor.user();
  
  if(typeof u != 'undefined' && typeof u.services != 'undefined' && u.services.google){
  console.log(u);
    if(u.services.github){
      console.log(1);
      return u.profile.avatar_url;
    }else if(u.services.google){
      console.log(2);
      return u.services.google.picture;
    }
  }
  return "";
  // else if(u.services.trello)
    // return "https://trello-avatars.s3.amazonaws.com/#{u.services.trello.avatarHash}/30.png";
});


// Handlebars.registerHelper 'avatarUrl', (context, options)->
  
  // u = Meteor.user()
  // if u.services.github?
    // u.profile.avatar_url
  // else if u.services.trello?
    // "https://trello-avatars.s3.amazonaws.com/#{u.services.trello.avatarHash}/30.png"

// Handlebars.registerHelper 'username', (context, options)->
  // u = Meteor.user()
  // if u.services.github?
    // u.profile.login
  // else if u.services.trello?
    // u.services.trello.username
