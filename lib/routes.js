Accounts.onLogin(function() {
  FlowRouter.go('newCharacter');
});

Accounts.onLogout(function(){
  FlowRouter.go('home')
});

FlowRouter.triggers.enter([function(context, redirect){
  if(!Meteor.userId()) {
    FlowRouter.go('home');
  }
}]);

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

FlowRouter.route('/lobby', {
 name: 'lobby',
 action() {
   BlazeLayout.render('MainLayout', {main: 'Lobby'});
 }
});
