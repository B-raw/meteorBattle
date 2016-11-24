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
  browserName.waitForExist("#login-name-link");

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
    // signUp("one@hotmail.com", "asddsa");
    // signUp("two@hotmail.com", "asddsa");

    hostBrowser = browser.instances[0]
    opponentBrowser = browser.instances[1];

    signIn(hostBrowser, "one@hotmail.com", "asddsa")
    signIn(opponentBrowser, "two@hotmail.com", "asddsa")
  })

  it('it can display a user in the lobby', function() {
    hostBrowser.url('http://localhost:3000/lobby')
               .waitForExist('.player', 800);
    opponentBrowser.url('http://localhost:3000/lobby')
                   .waitForExist('.player', 800);
    lobbyTextHost = hostBrowser.getText('.player');
    lobbyTextOpponent = opponentBrowser.getText('.player');

    expect(lobbyTextHost).to.equal("two@hotmail.com")
    expect(lobbyTextOpponent).to.equal("one@hotmail.com")
  });
});




//
