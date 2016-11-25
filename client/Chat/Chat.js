Meteor.subscribe('messages');

Template.Chat.helpers({
  messages: function() {
    return Messages.find({}, { sort: { createdAt: -1}});
  },

  formatTime: function(date){
    return `${date.toLocaleTimeString()}`
  }
});

Template.Chat.events({
  'keydown input#message'(event) {
    if (event.which == 13) { // 13 is the enter key event
      if (Meteor.user()) {
        var name = Meteor.user().username;
        var message = document.getElementById('message');
        if (message.value != '') {
          var date = new Date();
          Messages.insert({
            name: name,
            text: message.value,
            createdAt: date,
          });

          message.value = '';
        }
      }
    }
  }
});
