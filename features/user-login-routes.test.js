function signUpHelper(email, password) {
  browser.url('http://localhost:3000');
  browser.click('#login-sign-in-link');
  browser.click("#signup-link");
  browser.setValue('input#login-email', email);
  browser.setValue('input#login-password', password);
  browser.click('div#login-buttons-password');
}

function signInHelper(email, password) {
  browser.url('http://localhost:3000');
  browser.click('#login-sign-in-link');
  browser.setValue('input#login-email', email);
  browser.setValue('input#login-password', password);
  browser.click('div#login-buttons-password');
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
      signUpHelper("Pikachu@pika.com", "pikapika");
      browser.waitForExist("form.newCharacterForm", 4000);
      expect(browser.getUrl()).to.equal('http://localhost:3000/character/new');
    });
  });

  describe("Signed out user", function () {
    it("redirects to home page if trying to access /character/new", function () {
      browser.url('http://localhost:3000/character/new')
      .waitForExist('div.billboard', 4000);
      expect(browser.getUrl()).to.equal('http://localhost:3000/');
    });

    it("redirects to /character if user already has a character created", function () {
      signUpHelper('Pikachu@pika.com', "pikapika");
      browser.waitForExist("form.newCharacterForm", 4000);
      browser.setValue( '[name="name"]', 'Pikachu' )
             .submitForm( 'form.newCharacterForm' );
      server.call('logout');
      signInHelper('Pikachu@pika.com', "pikapika");
      browser.waitForExist("div.character", 4000);
      browser.url('http://localhost:3000/character')
    });
  });
});
