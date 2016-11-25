Battles = new Mongo.Collection('battles');

Meteor.methods({
  newBattle: function(hostId, opponentId){
    var battleId = Battles.insert({ fighters: [hostId, opponentId] });
    Meteor.users.update(hostId, { $set: {battleId: battleId }});
    Meteor.users.update(opponentId, { $set: {battleId: battleId }});
    Meteor.users.update(hostId, { $unset: { battleRequestObject: "" } });
    Meteor.users.update(opponentId, { $unset: { battleRequestObject: "" } });
    FlowRouter.go('battle');
  }
});
