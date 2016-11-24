Meteor.subscribe('userStatus');

Template.Lobby.helpers({
 'characters': function(){
   var currentUserId = Meteor.userId()
   return Characters.find({ createdBy: { $ne: currentUserId }});
 },
 'usersOnline': function() {
   var currentUserId = Meteor.userId()
   console.log(Meteor.users.find({ "status.online": true }).fetch())
   return Meteor.users.find({ "status.online": true, _id: { $ne: currentUserId } }, )
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
