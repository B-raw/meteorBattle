Meteor.publish('characters', function(){
  return Characters.find({});
});

Meteor.publish("userStatus", function() {
  return Meteor.users.find({"status.online": true});
});

// Meteor.publish("pendingBattleInvites", function() {
//   return Meteor.users.find({})
// });
