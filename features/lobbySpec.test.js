
var hostBrowser, opponentBrowser;

const signUp = function(browserName, email, password) {

  browserName.url('http://localhost:3000')
         .click('#login-sign-in-link')
         .click('#signup-link')
         .setValue( '[id="login-email"]', email )
         .setValue( '[id="login-password"]', password )
         .click("#login-buttons-password")
};

const signIn = function(browserName, email, password) {

  browserName.url('http://localhost:3000')
         .click('#login-sign-in-link')
         .setValue( '[id="login-email"]', email )
         .setValue( '[id="login-password"]', password )
         .click("#login-buttons-password")
  browserName.waitForExist("#login-name-link");

};

describe('Battle Lobby', function() {

  before(function(){
    hostBrowser = new Browser({ site: 'http://localhost:3000' });
    opponentBrowser = new Browser({ site: 'http://localhost:3000' });
    signUp(hostBrowser, 'asda@hotmail.com', 'testtest');
    signUp(opponentBrowser, 'tesco@hotmail.com', 'testtest');
  });

    it('Should show a list of signed in users', function () {
      var doesExist1 = hostBrowser.waitForExist(".user");
      var doesExist2 = hostBrowser.waitForExist(".user");
      expect doesExist1.to.equal('asda@hotmail.com')
      expect doesExist2.to.equal('tesco@hotmail.com')
    });
}
