Battles = new Mongo.Collection('battles');

Meteor.methods({
  // Start a battle
  newBattle: function(hostId, opponentId){
    var battleId = Battles.insert({ fighter1: hostId, fighter2: opponentId, currentAttackerId: opponentId, status: 'init' });
    Meteor.users.update(hostId, { $set: {battleId: battleId }});
    Meteor.users.update(opponentId, { $set: {battleId: battleId }});
    Meteor.users.update(hostId, { $unset: { battleRequestObject: "" } });
    Meteor.users.update(opponentId, { $unset: { battleRequestObject: "" } });
    FlowRouter.go('battle');
  },
  // Send a battle request
  'addPendingBattle'(recipientId, senderId) {
    Meteor.users.update(recipientId, { $set: { battleRequestObject: {battleRequest: "pending-battle-invite", battleRequestFrom: senderId }}});

    // listen for a battle request accepted
    // (new battle obj created with senderId)
    var query = Battles.find({fighter2: senderId});
    Battles.observer = query.observeChanges({
      added: function(id, battle){
        Battles.observer.stop();
        FlowRouter.go('battle');
      }
    });
  },

  'switchTurns'(nextAttackerId, battleId){
    Battles.update(battleId, {$set: { currentAttackerId: nextAttackerId }});
  },

  'battleOver'(battleId, loser, winner) {
    Battles.update(battleId, {$set: { status: 'over', winnerCharId: winner._id }});
    Characters.update(loser._id, {$inc: { losses: 1 }});
    Characters.update(winner._id, {$inc: { wins: 1 }});
    Meteor.users.update(loser.createdBy, { $unset: { battleId: "" } });
    Meteor.users.update(winner.createdBy, { $unset: { battleId: "" } });
  },

  'prepareForBattle'(battle) {
    Characters.update({createdBy: battle.fighter1}, {$set: {hp: 100}});
    Characters.update({createdBy: battle.fighter2}, {$set: {hp: 100}});
    Battles.update(battle._id, {$set: {status: 'started'}});
  }
});
