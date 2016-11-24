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

describe('sign up and display character', function() {
  beforeEach(function() {

    server.execute(function () {
      Package['xolvio:cleaner'].resetDatabase();
    });

    hostBrowser = browser.instances[0];
    opponentBrowser = browser.instances[1];

    signUpAndSignIn(hostBrowser, "one@hotmail.com", "asddsa");

    hostBrowser.waitForExist("form.newCharacterForm", 4000);
    hostBrowser.setValue( '[name="name"]', 'Pikachu' )
           .submitForm( 'form.newCharacterForm' );

    signUpAndSignIn(opponentBrowser, "two@hotmail.com", "asddsa");

    opponentBrowser.waitForExist("form.newCharacterForm", 4000);
    opponentBrowser.setValue( '[name="name"]', 'Snorlax' )
           .submitForm( 'form.newCharacterForm' );
  });

  it('it can display a character name in the lobby', function() {

    hostBrowser.url('http://localhost:3000/lobby')
               .waitForExist('.player', 800);
    opponentBrowser.url('http://localhost:3000/lobby')
                   .waitForExist('.player', 800);
    var lobbyTextHost = hostBrowser.getText('li:nth-of-type(1)');
    var lobbyTextOpponent = opponentBrowser.getText('li:nth-of-type(1)');

    expect(lobbyTextHost).to.equal("Snorlax");
    expect(lobbyTextOpponent).to.equal("Pikachu");
  });

  it("it doesn't display the logged in users character @watch", function() {
    opponentBrowser.click('#login-name-link').click('#login-buttons-logout');

    var lobbyTextHost = hostBrowser.getText('ul');
    expect(lobbyTextHost).to.equal("");
  });
});
