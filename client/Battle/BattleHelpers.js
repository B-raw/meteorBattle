BattleHelpers = {
  battle: function(){
    var host = Meteor.user();
    if (host) {
      if (BattleHelpers._battleId) {
        return Battles.findOne(BattleHelpers._battleId)
      } else {
        var battle = Battles.findOne(host.battleId);
        BattleHelpers._battleId = battle._id;
        return battle
      }
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

  throwMeteorTo: function(targetChar){
    var attackerChar = BattleHelpers.currentAttacker();
    if (BattleHelpers.currentAttackerIs(attackerChar)) {
      var battle = BattleHelpers.battle();

      var damage = BattleHelpers.randomDamage(5, 15);
      Characters.update({_id: targetChar._id}, {$inc: { hp: (-1 * damage) }})

      var updatedTargetChar = Characters.findOne(targetChar._id);
      if (updatedTargetChar.hp <= 0) {
        Meteor.call('battleOver', battle._id, targetChar, attackerChar);
      } else {
        Meteor.call('switchTurns', targetChar.createdBy, battle._id);
      }
    }
  },

  randomDamage(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
