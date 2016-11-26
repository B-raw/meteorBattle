import { signUp, signIn, getBrowser } from './testHelpers.test'

describe("User Login", function () {

  beforeEach(function(){
    server.call('logout');
    server.execute(function () {
      Package['xolvio:cleaner'].resetDatabase();
    });
  });

  describe("New user", function () {
    it("gets redirected to new character form on sign up", function () {
      var browserInstance = getBrowser(0)
      signUp('Pikachu@pika.com', 'pikapika')
      signIn(browserInstance, 'Pikachu@pika.com', 'pikapika');
      browserInstance.waitForExist("form.newCharacterForm", 2000);
      expect(browserInstance.getUrl()).to.equal('http://localhost:3000/character/new');
    });
  });

  describe("Signed out user", function () {
    it("redirects to home page if trying to access /character/new", function () {
      var browserInstance = getBrowser(0)
      signUp('Pikachu@pika.com', 'pikapika')
      browserInstance.url('http://localhost:3000/character/new')
      .waitForExist('div.billboard', 2000);
      expect(browserInstance.getUrl()).to.equal('http://localhost:3000/');
    });
  });

});
