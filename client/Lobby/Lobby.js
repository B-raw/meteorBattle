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
// Template.userPill.labelClass = function() {
//   if (this.status.idle)
//     return "label-warning"
//   else if (this.status.online)
//     return "label-success"
//   else
//     return "label-default"
// };
