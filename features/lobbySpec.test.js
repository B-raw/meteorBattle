import { signUp, signIn, signUpAndSignIn, getBrowser, cleanDatabase, createCharacter } from './testHelpers.test'

var hostBrowser, opponentBrowser;

describe('sign up and display character', function() {
  beforeEach(function() {
    // this creates two new players, signs them in, creates their characters
    cleanDatabase();

    hostBrowser = browser.instances[0];
    opponentBrowser = browser.instances[1];

    signUpAndSignIn(hostBrowser, "one@hotmail.com", "asddsa");
    createCharacter(hostBrowser, 'Pikachu')

    signUpAndSignIn(opponentBrowser, "two@hotmail.com", "asddsa");
    createCharacter(opponentBrowser, 'Snorlax')
  });

  it('it can display a character name in the lobby', function() {

    var lobbyTextHost = hostBrowser.getText('li:nth-of-type(1)');
    var lobbyTextOpponent = opponentBrowser.getText('li:nth-of-type(1)');

    expect(lobbyTextHost).to.equal("Snorlax Fight");
    expect(lobbyTextOpponent).to.equal("Pikachu Fight");
  });

  it("it doesn't display the logged in users character", function() {
    opponentBrowser.click('#login-name-link').click('#login-buttons-logout');

    var doesNotExist = hostBrowser.waitForExist("selector", undefined, true);
    expect(doesNotExist).to.equal(true);
  });

  // it("it can select a player to battle and they receive a invitation", function() {
  //   hostBrowser.click('button .send-battle-invite')
  //   var lobbyTextHost = hostBrowser.getText('#pending-battle-invite')
  //   var lobbyTextOpponent = opponentBrowser.getText('#battle-invite')
  //   expect(lobbyTextOpponent).to.equal('Accept Battle')
  //
  // });
  //
  // it("opponent can accept invitation to battle", function() {
  //   hostBrowser.click('li:nth-of-type(1)').click('send-battle-invite')
  //   host
  //
  //
  //   opponentBrowser.click('#accept-battle-invite')
  //
  //   expect(hostTextOpponent).to.equal('Pikachu wants to fight you')
  //
  // });
});
