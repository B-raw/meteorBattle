Template.NewCharacterForm.events({
  'submit .newCharacterForm'(event){
    event.preventDefault();
    var name = event.target.name.value;
    Session.set('editMode', false);
    Meteor.call('newCharacter', name);
  }
});
