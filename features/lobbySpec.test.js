var hostBrowser, opponentBrowser;

function signUp(email, password){
  server.call('user.signup', email, password);
}

function signIn(browserName, email, password) {

  browserName.url('http://localhost:3000/')
         .click('#login-sign-in-link')
         .setValue( '[id="login-email"]', email )
         .setValue( '[id="login-password"]', password )
         .click("#login-buttons-password")
  browserName.waitForExist("#login-name-link")
  browserName.url('http://localhost:3000/character/new');
};

// describe('Battle Lobby', function() {
//
//   before(function(){
//     hostBrowser = new Browser({ site: 'http://localhost:3000' });
//     opponentBrowser = new Browser({ site: 'http://localhost:3000' });
//     signUp(hostBrowser, 'asda@hotmail.com', 'testtest');
//     signUp(opponentBrowser, 'tesco@hotmail.com', 'testtest');
//   });

describe('sign up and display character @watch', function() {
  before(function() {

    server.execute(function () {
      Package['xolvio:cleaner'].resetDatabase();
    });

    signUp("one@hotmail.com", "asddsa");
    signUp("two@hotmail.com", "asddsa");

    hostBrowser = browser.instances[0]
    opponentBrowser = browser.instances[1];

    signIn(hostBrowser, "one@hotmail.com", "asddsa")
    hostBrowser.waitForExist("form.newCharacterForm", 4000);
    hostBrowser.setValue( '[name="name"]', 'Pikachu' )
           .submitForm( 'form.newCharacterForm' );

    signIn(opponentBrowser, "two@hotmail.com", "asddsa")
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
    var lobbyTextOpponent = opponentBrowser.getText('li:nth-of-type(2)');

    expect(lobbyTextHost).to.equal("Snorlax")
    expect(lobbyTextOpponent).to.equal("Pikachu")
  });
});
