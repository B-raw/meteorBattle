function signUp(){
  server.call('user.signup', 'Pikachu@pika.com', 'pikapika');
}
function signIn(){
  getBrowser(0).url('http://localhost:3000');
  getBrowser(0).execute(function(){
    Meteor.loginWithPassword('Pikachu@pika.com', 'pikapika');
  });
}
function signUpAndSignIn(){
  signUp();
  signIn();
}

function getBrowser(i) {
  return browser.instances[i];
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
      getBrowser(0).waitForExist("form.newCharacterForm", 2000);
      expect(getBrowser(0).getUrl()).to.equal('http://localhost:3000/character/new');
    });
  });

  describe("Signed out user", function () {
    it("redirects to home page if trying to access /character/new", function () {
      signUp();

      getBrowser(0).url('http://localhost:3000/character/new')
      .waitForExist('div.billboard', 2000);
      expect(getBrowser(0).getUrl()).to.equal('http://localhost:3000/');
    });
  });

});
