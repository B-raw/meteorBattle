Battles = new Mongo.Collection('battles');

Meteor.methods({
  // Start a battle
  newBattle: function(hostId, opponentId){
    var battleId = Battles.insert({ fighter1: hostId, fighter2: opponentId });
    Meteor.users.update(hostId, { $set: {battleId: battleId }});
    Meteor.users.update(opponentId, { $set: {battleId: battleId }});
    Meteor.users.update(hostId, { $unset: { battleRequestObject: "" } });
    Meteor.users.update(opponentId, { $unset: { battleRequestObject: "" } });
    FlowRouter.go('battle');
  },
  'addPendingBattle'(recipientId, senderId) {
    Meteor.users.update(recipientId, { $set: { battleRequestObject: {battleRequest: "pending-battle-invite", battleRequestFrom: senderId }}});

    // listening for a battle request accepted
    // (new battle obj created with senderId)
    var query = Battles.find({fighter2: senderId});
    var handle = query.observeChanges({
      added: function(id, battle){
        FlowRouter.go('battle')
      }
    });
  }
});
