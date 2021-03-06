Meteor.subscribe('userStatus');

Template.Lobby.helpers({
  // Returns characters for all users except current user
 'characters'(){
   var currentUserId = Meteor.userId()
   return Characters.find({ createdBy: { $ne: currentUserId }});
 },
 // Returns all users except current user
 'usersOnline'() {
   var currentUserId = Meteor.userId()
   return Meteor.users.find({ _id: { $ne: currentUserId } } )
 },
 // Returns the requester for a given request you've received
 'battleRequest'() {
   var currentUser = Meteor.user();
   userBattleRequestsId = currentUser.battleRequestObject.battleRequestFrom;
   battleRequestUser = Meteor.users.find(userBattleRequestsId);
   return battleRequestUser
 }
});

Template.User.helpers({
  // Returns the character name for a given online user
  'character'() {
    var characterId = this.characterId;
    var char = Characters.findOne( characterId );

    return char.name;
  },
  // changes the class of the fight request button
  'selectedClass'() {
    var playerId = this._id;
    var selectedPlayer = Session.get('selectedPlayer');
    $('button.send-battle-invite').text("Pending Battle Request") 
    if(playerId == selectedPlayer) {
      return "selected"
    }
  }
});

// on click sends a fight request
Template.Lobby.events({
  'click .send-battle-invite'() {
    var recipientId = this._id
    var senderId = Meteor.userId();
    Session.set('selectedPlayer', recipientId);
    var recipientPlayer = Session.get('selectedPlayer');
    Meteor.call('addPendingBattle', recipientId, senderId)
  },
  'click #edit-character-option-button'() {
    Session.set('editMode', !Session.get('editMode'));
  }
});
// Display name of the character who's challenged you
Template.UserAcceptFight.helpers({
  'character'() {
    var characterId = this.characterId;
    var char = Characters.findOne( characterId );

    return char.name;
  },
});
// on click 'accept', newBattle called in battlesCollection with user and requester
Template.UserAcceptFight.events({
  'click .accept-battle-invite'() {
    var currentUser = Meteor.user();
    var opponentId = currentUser.battleRequestObject.battleRequestFrom;
    Meteor.call('newBattle', currentUser._id, opponentId);
  }
});
