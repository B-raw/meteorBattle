Accounts.onLogin(function() {

  // if (Meteor.user().characterId){
  //   FlowRouter.go('lobby');
  // } else {
    FlowRouter.go('newCharacter');
  // }
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

FlowRouter.route('/chat', {
  name: 'chat',
  action() {
    BlazeLayout.render('MainLayout', {main: 'Chat'});
  }
});

FlowRouter.route('/lobby', {
  name: 'lobby',
  action() {
    BlazeLayout.render('MainLayout', {main: 'Lobby'});
  }
});

FlowRouter.route('/battle', {
 name: 'battle',
 action() {
   BlazeLayout.render('MainLayout', {main: 'Battle'});
 }
});
