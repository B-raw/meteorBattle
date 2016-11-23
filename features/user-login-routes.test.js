describe("User Login", function () {
  
  beforeEach(function(){
    server.call('logout');
    server.execute(function () {
      Package['xolvio:cleaner'].resetDatabase();
    });
  });

  describe("New user", function () {
    it("gets redirected to new character form on sign up", function () {
      browser.url('http://localhost:3000');
      browser.click('#login-sign-in-link');
      browser.click("#signup-link");
      browser.setValue('input#login-email','Pikachu@pika.com');
      browser.setValue('input#login-password', 'pikapika');
      browser.click('div#login-buttons-password');
      browser.waitForExist("form.newCharacterForm", 4000);
      expect(browser.getUrl()).to.equal('http://localhost:3000/character/new');
    });
  });

});
