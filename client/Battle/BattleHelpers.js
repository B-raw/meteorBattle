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
    console.log(targetCharacter);
    if (BattleHelpers.currentAttackerIs(BattleHelpers.currentAttacker())) {
      var hp = targetCharacter.hp;
      Characters.update(targetCharacter._id, { hp: hp-10 })
    }
  }
}
