Template.NewCharacterForm.events({
  'submit .newCharacterForm'(event){
    console.log("hello")
    event.preventDefault();
    var name = event.target.name.value;
    Session.set('editMode', false);
    Meteor.call('newCharacter', name);
    FlowRouter.go('lobby');
  }
});
