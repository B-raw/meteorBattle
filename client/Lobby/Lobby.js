Template.Lobby.helpers({
 'characters': function(){
   var currentUserId = Meteor.userId()
   console.log(currentUserId)
   return Characters.find({ createdBy: { $ne: currentUserId }});
 }

});
