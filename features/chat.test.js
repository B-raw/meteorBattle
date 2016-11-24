function getBrowser(i) {
  return browser.instances[i];
}
function signUp(email, password){
  server.call('user.signup', email, password);
}
function signIn(email, password, browserId){
  getBrowser(browserId).url('http://localhost:3000');
  getBrowser(browserId).execute(function(email, password){
    Meteor.loginWithPassword(email, password);
  }, email, password);
}
function signUpAndSignIn(email, password, browserId){
  signUp(email, password);
  signIn(email, password, browserId);
}

describe('Chat feature', function(){

  describe('both users signed in on different browser', function(){

    beforeEach(function(){
      server.call('logout');
      server.execute(function () {
        Package['xolvio:cleaner'].resetDatabase();
      });

      var user1 = {
        email: 'Pikachu@pika.com',
        password: 'pikapika'
      }
      var user2 = {
        email: 'tata@tata.com',
        password: 'tatatata'
      }

      signUpAndSignIn(user1.email, user1.password, 0);
      signUpAndSignIn(user2.email, user2.password, 1);
    });


    it('displays users messages', function(){
      browser.url('http://localhost:3000/chat');
      getBrowser(0).setValue('input#message', 'hello');
      getBrowser(0).keys("\uE006"); //press ENTER
      getBrowser(0).waitForExist('ul', 2000);
      expect(getBrowser(0).getValue('li#message0')).to.equal('hello');
      // console.log(getBrowser(0).hasFocus('input#message'));
    });
  });

});
