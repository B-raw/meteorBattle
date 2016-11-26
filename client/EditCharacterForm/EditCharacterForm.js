Template.EditCharacterForm.events({
  'submit .editCharacterForm'(event){
    event.preventDefault();
    var name = event.target.name.value;
    Session.set('editMode', !Session.get('editMode'));
    Meteor.call('editCharacter', name);
  },
  'click .cancelEditCharacter'() {
    Session.set('editMode', false);
  }
});
