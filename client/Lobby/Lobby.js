Meteor.subscribe('userStatus');

Template.Lobby.helpers({
 'characters': function(){
   var currentUserId = Meteor.userId()
   return Characters.find({ createdBy: { $ne: currentUserId }});
 },
 'usersOnline': function() {
   var currentUserId = Meteor.userId()
   return Meteor.users.find({ _id: { $ne: currentUserId } } )
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
    var req = Meteor.users.findOne(playerId);
    
    console.log(req.battleRequestObject.battleRequestFrom);
    // .battleRequestObject.battleRequestFrom
    console.log(req);
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
})

// Template.userPill.labelClass = function() {
//   if (this.status.idle)
//     return "label-warning"
//   else if (this.status.online)
//     return "label-success"
//   else
//     return "label-default"
// };
