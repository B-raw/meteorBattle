Template.NewCharacterForm.events({
  'submit .newCharacterForm'(event){
    event.preventDefault();
    var name = event.target.name.value;
    Meteor.call('newCharacter', name);
  }
});
