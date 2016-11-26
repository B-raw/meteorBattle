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
    if (battle) {
      var opponentId = host._id === battle.fighter1 ? battle.fighter2 : battle.fighter1;
      var char = Characters.findOne({ createdBy: opponentId });
      return char;
    }
  },

  'currentAttackerIs'(hostCharacter){
    var currentAttacker = BattleHelpers.currentAttacker();
    return (currentAttacker._id === hostCharacter._id)
  },

  'currentAttacker'(){
    return BattleHelpers.currentAttacker();
  },

  'battleLoaded'(){
    return BattleHelpers.battle() !== undefined
  }
});

Template.BattleControls.events({
  'click #meteor_attack'(){
    var opponent = this; //'this' is passed when rendering template
    console.log(this);
  }
});
