Meteor.subscribe('userStatus');

Template.Lobby.helpers({
 'characters'(){
   var currentUserId = Meteor.userId()
   return Characters.find({ createdBy: { $ne: currentUserId }});
 },
 'usersOnline'() {
   var currentUserId = Meteor.userId()
   return Meteor.users.find({ _id: { $ne: currentUserId } } )
 },
 'battleRequest'() {
   var currentUser = Meteor.user();
   userBattleRequestsId = currentUser.battleRequestObject.battleRequestFrom;
   battleRequestUser = Meteor.users.find(userBattleRequestsId);
   return battleRequestUser
 }
});

Template.User.helpers({
  'character'() {
    var characterId = this.characterId;
    var char = Characters.findOne( characterId );

    return char.name;
  },
  'selectedClass'() {
    var playerId = this._id;
    var selectedPlayer = Session.get('selectedPlayer');
    if(playerId == selectedPlayer) {
      return "selected"
    }
  }
});

Template.UserAcceptFight.helpers({
  'character'() {
    var characterId = this.characterId;
    var char = Characters.findOne( characterId );

    return char.name;
  },
});

Template.UserAcceptFight.events({
  'click .accept-battle-invite'() {
    var currentUser = Meteor.user();
    var opponentId = currentUser.battleRequestObject.battleRequestFrom;
    Meteor.call('newBattle', currentUser._id, opponentId);
  }
});

Template.Lobby.events({
  'click .player button'() {
    var recipientId = this._id
    var senderId = Meteor.userId();
    Session.set('selectedPlayer', recipientId);
    var recipientPlayer = Session.get('selectedPlayer');
    Meteor.call('addPendingBattle', recipientId, senderId)
  }
});
