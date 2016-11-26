Template.EditCharacterForm.events({
  'submit .editCharacterForm'(event){
    event.preventDefault();
    var name = event.target.name.value;
    Meteor.call('editCharacter', name);
  }
});
