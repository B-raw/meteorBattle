FlowRouter.route('/', {
  name: 'home',
  action() {
    BlazeLayout.render('HomeLayout');
  }
});

FlowRouter.route('/character/new', {
  name: 'newCharacter',
  action() {
    BlazeLayout.render('MainLayout', {main: 'NewCharacterForm'});
  }
});
