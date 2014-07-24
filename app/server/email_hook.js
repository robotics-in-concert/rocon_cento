function parse_user_tags(txt){
  // at tags
  var re = (/(^|\s)@(\w+)\b/g);
  var match = re.exec(txt);
  var ids = [];
  while (match != null) {
    var userLogin = match[2];
    var user = Meteor.users.findOne({"profile.login": userLogin});
    ids.push(user._id);
    match = re.exec(txt);
  }
  return ids;

}
console.log('hook setup on ', moment().toString());
Cento.WorkItems.find({created: {$gt: new Date()}}).observe({
  'added': function(newDoc){


    var solution = Cento.Solutions.findOne({_id: newDoc.solution_id});


    var subs = _.union(
      parse_user_tags(newDoc.body),
      solution.subscribers,
      newDoc.assignee,
      newDoc.reviewers)

    subs = _.chain(subs)
      .without(newDoc.user_id)
      .uniq()
      .value()
    console.log(subs);

    var currentLogin = Meteor.users.findOne({_id: newDoc.user_id}).profile.login;
    subs.forEach(function(uid){
      var from = currentLogin + " <noreply@gmail.com>";
      var title = "["+solution.title+"] " + newDoc.title;
      var url = Meteor.absoluteUrl("projects/"+solution._id+"/ideations#"+newDoc._id);
      var html =  newDoc.body + "<hr />" + "<a href='"+url+"'>"+url+"</a>";
      var u = Meteor.users.findOne({_id: uid});

      Meteor.call('sendEmail', {from: from, to: u.profile.email, subject: title, html: html});

    });
  }
});

Cento.WorkItems.find({}).observe({
  'changed': function(newDoc, oldDoc){
    var a = 0, b = 0;
    
    if(oldDoc.comments){ a = oldDoc.comments.length; }
    if(newDoc.comments){ b = newDoc.comments.length; }

    if(a === b){
      return;
    }
    if(!newDoc){ //delete
      return;
    }


    // new comments
    var lastComment = _.last(newDoc.comments);
    if(!lastComment){
      return;
    }

    var subs = newDoc.subscribers || [];
    console.log(subs);

    subs = subs.concat(parse_user_tags(lastComment.body));

    subs = _.chain(subs)
      .without(lastComment.user_id)
      .uniq()
      .value()
    console.log(subs);

    var solution = Cento.Solutions.findOne({_id: newDoc.solution_id});
    var currentLogin = Meteor.users.findOne({_id: lastComment.user_id}).profile.login;
    subs.forEach(function(uid){
      var from = currentLogin + " <noreply@gmail.com>";
      var title = "["+solution.title+"] " + newDoc.title;
      
      var text = (lastComment.body).replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + '<br>' + '$2');


      var url = Meteor.absoluteUrl("projects/"+solution._id+"/ideations#"+newDoc._id);
      var html =  text + "<hr />" + "<a href='"+url+"'>"+url+"</a>";
      var u = Meteor.users.findOne({_id: uid});

      Meteor.call('sendEmail', {from: from, to: u.profile.email, subject: title, html: html});

    });
  }

});

