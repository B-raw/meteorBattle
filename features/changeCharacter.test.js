import { signUp, signIn, signUpAndSignIn, getBrowser, cleanDatabase, createCharacter } from './testHelpers.test'

var hostBrowser, opponentBrowser;

describe("New Character Form @watch", function () {

  beforeEach(function(){
    server.call('logout');
    cleanDatabase();

    hostBrowser = browser.instances[0];
    opponentBrowser = browser.instances[1];

    signUpAndSignIn(hostBrowser, "one@hotmail.com", "asddsa");
    createCharacter(hostBrowser, 'Pikachu')

    signUpAndSignIn(opponentBrowser, "two@hotmail.com", "asddsa");
    createCharacter(opponentBrowser, 'Snorlax')
  });

  it("there is a change character form in the lobby", function () {
    hostBrowser = browser.instances[0];
    opponentBrowser = browser.instances[1];

    hostBrowser.waitForExist('#edit-character-option')
    var newCharacterButton = hostBrowser.getText('#edit-character-option');

    expect(newCharacterButton).to.equal("Edit My Character")
    var doesFormExist = hostBrowser.waitForExist(".editCharacterForm", undefined, true);
    expect(doesFormExist).to.equal(true);
    hostBrowser.click("#edit-character-option")

    var doesFormExist = hostBrowser.waitForExist(".editCharacterForm");
    expect(doesFormExist).to.equal(true);

  });

});
