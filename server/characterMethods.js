Meteor.methods({
  newCharacter: function(name){
    check(name, String);

    var currentUserId = Meteor.userId();
    var thisCharacterId = Characters.insert({name: name, createdBy: currentUserId}, Meteor.call('redirectToLobby'));
    Meteor.users.update(currentUserId, { $set: {characterId: thisCharacterId }});
  },
  redirectToLobby: function(){
    FlowRouter.go('lobby');
  },
  editCharacter: function(newName) {
    check(newName, String);

    characterId = Meteor.user().characterId
    Characters.update(characterId, { $set: { name: newName }});
  }
});
