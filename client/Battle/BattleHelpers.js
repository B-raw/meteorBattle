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
  }
}
