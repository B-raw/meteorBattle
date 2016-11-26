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
    var opponentId = host._id === battle.fighter1 ? battle.fighter2 : battle.fighter1;
    var char = Characters.findOne({ createdBy: opponentId });
    return char;
  },

  'battle'(){
    var host = Meteor.user();
    var battle = Battles.findOne(host.battleId);
    return battle;
  },

  'currentAttackerIs'(hostCharacter, battle){
    var currentAttacker = Characters.findOne( { createdBy: battle.currentAttackerId } );
    return (currentAttacker._id === hostCharacter._id)
  },
});

Template.Battle.events({
  'click #meteor_attack'(){
    // console.log(Template.Battle);

  }
});
