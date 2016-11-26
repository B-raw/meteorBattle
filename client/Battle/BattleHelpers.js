BattleHelpers = {
  battle: function(){
    var host = Meteor.user();
    if (host) {
      return Battles.findOne(host.battleId);
    }
  },

  currentAttacker: function(){
    var battle = BattleHelpers.battle();
    if (battle) {
      return Characters.findOne( { createdBy: battle.currentAttackerId } );
    }
  },

  currentAttackerIs: function(hostChar){
    return hostChar._id === BattleHelpers.currentAttacker()._id
  },

  throwMeteorTo: function(targetCharacter){
    if (BattleHelpers.currentAttackerIs(BattleHelpers.currentAttacker())) {
      var damage = BattleHelpers.randomDamage(5, 15);
      Characters.update({_id: targetCharacter._id}, {$inc: { hp: (-1 * damage) }})
      var battle = BattleHelpers.battle();
      Meteor.call('switchTurns', targetCharacter.createdBy, battle._id);
    }
  },

  randomDamage(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
