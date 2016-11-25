Meteor.publish('characters', function(){
  return Characters.find({});
});

Meteor.publish("userStatus", function() {
  return Meteor.users.find({"status.online": true});
});

Meteor.publish("userBattleRequestsReceived", function() {
  return BattleRequests.find({ recipient: this.userId });
});

// Meteor.publish("pendingBattleInvites", function() {
//   return Meteor.users.find({})
// });
