function signUp(){
  server.call('user.signup', 'Pikachu@pika.com', 'pikapika');
}
function signIn(){
  browser.url('http://localhost:3000');
  browser.execute(function(){
    Meteor.loginWithPassword('Pikachu@pika.com', 'pikapika');
  });
}
function signUpAndSignIn(){
  signUp();
  signIn();
}

describe("User Login", function () {

  beforeEach(function(){
    server.call('logout');
    server.execute(function () {
      Package['xolvio:cleaner'].resetDatabase();
    });
  });

  describe("New user", function () {
    it("gets redirected to new character form on sign up", function () {
      signUpAndSignIn();
      browser.waitForExist("form.newCharacterForm", 2000);
      expect(browser.getUrl()).to.equal('http://localhost:3000/character/new');
    });
  });

  describe("Signed out user", function () {
    it("redirects to home page if trying to access /character/new", function () {
      signUp();

      browser.url('http://localhost:3000/character/new')
      .waitForExist('div.billboard', 2000);
      expect(browser.getUrl()).to.equal('http://localhost:3000/');
    });
  });
  
});
