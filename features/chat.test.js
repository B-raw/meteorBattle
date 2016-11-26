var user1, user2;
var hostBrowser, opponentBrowser;

function signUp(email, password){
  server.call('user.signup', email, password);
}
function signIn(browserName, email, password){
  browserName.url('http://localhost:3000');
  browserName.execute(function(email, password){
    Meteor.loginWithPassword(email, password);
  }, email, password);
}
function signUpAndSignIn(browserName, email, password){
  signUp(email, password);
  signIn(browserName, email, password);
}

function sendText(text, browserName) {
  browserName.url('http://localhost:3000/chat');
  browserName.setValue('input#message', text);
  browserName.keys("\uE006"); //press ENTER
  browserName.waitForExist('li', 2000);
}

function getText(browserName) {
  var messageLi = browserName.element('li.message:nth-of-type(1)');
  return messageLi.getText('p.message_text');
}

function getUser(browserName) {
  var messageLi = browserName.element('li.message:nth-of-type(1)');
  return messageLi.getText('p.message_header strong');
}

describe('Chat feature', function(){

  describe('both users signed in on different browser', function(){

    beforeEach(function(){
      server.call('logout');
      server.execute(function () {
        Package['xolvio:cleaner'].resetDatabase();
      });

      user1 = {
        email: 'Pikachu@pika.com',
        password: 'pikapika'
      }
      user2 = {
        email: 'tata@tata.com',
        password: 'tatatata'
      }

      hostBrowser = browser.instances[0];
      opponentBrowser = browser.instances[1];

      signUpAndSignIn(hostBrowser, user1.email, user1.password);
      signUpAndSignIn(opponentBrowser, user2.email, user2.password);
    });


    it('displays usernames and messages', function(){
      var text = sendText('hello', hostBrowser);
      expect(getText(hostBrowser)).to.equal('hello');
      expect(getUser(hostBrowser)).to.equal('Pikachu@pika.com');

      var text2 = sendText('this is user 2', opponentBrowser);
      expect(getText(opponentBrowser)).to.equal('this is user 2');
      expect(getUser(hostBrowser)).to.equal('tata@tata.com');
    });
  });

});
