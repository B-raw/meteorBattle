Meteor.subscribe('battles');

Template.Battle.helpers({
  'host'(){
    var host = Meteor.user();
    var char = Characters.findOne({ createdBy: host._id });
    return char;
  },

  'opponent'(){
    var host = Meteor.user();
    var battle = Battles.findOne(host.battleId);
    var fighters = battle.fighters;
    var opponentId = host._id === fighters[0] ? fighters[1] : fighters[0];
    var opponent = Meteor.users.findOne(opponentId);
    var char = Characters.findOne({ createdBy: opponent._id });
    return char;
  }
});
//
// Template.BattleControls.events({
//   'click .attack': function() {
//     var host = Meteor.user();
//     var battle = Battles.findOne(host.battleId);
//     var fighters = battle.fighters;
//     var opponentId = host._id === fighters[0] ? fighters[1] : fighters[0];
//     var opponent = Meteor.users.findOne(opponentId);
//     var selectedCharacter = Characters.findOne({ createdBy: opponent._id });
//     Meteor.call('updateHealth', selectedCharacter, -10);
//   }
// });
//
// Meteor.methods({
//   'updateHealth': function(selectedCharacter, hpValue) {
//     Characters.update( { _id: selectedCharacter, { $inc: { hp: hpValue }}});
//   }
// });
