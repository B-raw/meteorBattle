Meteor.subscribe('battles');

Template.Battle.helpers({
  'host'(){
    var host = Meteor.user();
    var char = Characters.findOne({ createdBy: host._id });
    return char;
  },

  'opponent'(){
    var host = Meteor.user();
    var battle = BattleHelpers.battle();
    if (battle) {
      var opponentId = host._id === battle.fighter1 ? battle.fighter2 : battle.fighter1;
      var char = Characters.findOne({ createdBy: opponentId });
      return char;
    }
  },

  'currentAttackerIs'(hostCharacter){
    return BattleHelpers.currentAttackerIs(hostCharacter);
  },

  'currentAttacker'(){
    return BattleHelpers.currentAttacker();
  },

  'battleLoaded'(){
    return BattleHelpers.battle() !== undefined
  },

  'battleIsOver'(){
    return BattleHelpers.battle().status === 'over'
  },

  'winnerOrLoserMessage'(){
    var host = Meteor.user();
    var hostChar = Characters.findOne({createdBy: host._id});
    var battle = BattleHelpers.battle();
    if (hostChar._id === battle.winnerCharId) {
      return `${hostChar.name} won the battle! :)`
    } else {
      return `${hostChar.name} lost... :(`
    }
  },

  'resetHitPointsOnLoad'(){
    var battle = BattleHelpers.battle();
    if (battle.status === 'init') {
      Meteor.call('prepareForBattle', battle)
    }
  }
});

Template.Battle.events({
  'click #return_to_lobby'(){
    FlowRouter.go('lobby');
  }
});

Template.BattleControls.events({
  'click #meteor_attack'(){
    var opponent = this; //'this' is passed when rendering template
    BattleHelpers.throwMeteorTo(opponent);
  }
});
