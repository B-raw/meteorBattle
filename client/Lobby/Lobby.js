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
  },

  // 'pendingClass'() {
  //   var playerIdInList = this._id;
  //   var currentUser = Meteor.users.findOne(Meteor.userId());
  //
  //   var requestSenderId = currentUser.battleRequestObject.battleRequestFrom
  //   // console.log("user object is " + currentUser)
  //   // console.log("current user is " + currentUserId)
  //   // console.log("player in list is " + playerIdInList);
  //   // console.log("request sender is " + requestSenderId);
  //   if (playerIdInList === requestSenderId) {
  //     return "pending-battle-invite"
  //   }
  // }
});

Template.UserAcceptFight.helpers({
  'character'() {
    var currentUser = Meteor.user();
    var array = [];
    userBattleRequests = currentUser.battleRequestObject;
    for(var i = 0; i < userBattleRequests.length; i++) {
      array.push(userBattleRequests[i]);
      console.log(userBattleRequests);
    }
    return array;
    console.log(array);
  }
});

Template.UserAcceptFight.events({
  'click .pending-battle-invite'() {
    var currentUser = Meteor.user();
    userBattleRequestsId = currentUser.battleRequestObject.battleRequestFrom;
    opponent = Meteor.users.find(userBattleRequestsId);
    FlowRouter.go('fight')
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
