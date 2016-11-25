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
  'character'(){
    var characterId = this.characterId;
    var char = Characters.findOne( characterId );

    return char.name;
  }
});

Template.Lobby.events({
  'click .player': function(){
        Session.set('selectedPlayer', this._id);
        var selectedPlayer = Session.get('selectedPlayer');
        console.log(selectedPlayer);
    },
    'click .player .button': function(){
          Session.set('selectedPlayer', this._id);
          var selectedPlayer = Session.get('selectedPlayer');
          console.log(selectedPlayer);
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
