var sendEmail = function(from, to, subject, text){
  console.log("send email : ", arguments);
  return Email.send({from: from, to: to, subject: subject, text: text});
};
Meteor.methods({
  sendEmail: sendEmail,

  notify: function(login, subject, text){
    var u = Meteor.users.findOne({'profile.login': login});
    if(u) return sendEmail({to: u.profile.email, subject: subject, text: text});

  }
});
