Meteor.methods({
  sendEmail: function(to, subject, text){
    console.log("send email : ", arguments);
    return Email.send({to: to, subject: subject, text: text});

  }
});
