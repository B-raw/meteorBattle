describe('Chimp Mocha', function() {

  describe('Login Links', function () {
    beforeEach(function(){
      server.call('logout');
      server.execute(function () {
        Package['xolvio:cleaner'].resetDatabase();
      });
    });

    it('Should exist on homepage', function () {
      browser.url('http://localhost:3000');
      expect(browser.getTitle()).to.equal("meteorBattle");
    });

    it("Should have user login links on homepage", function () {
      browser.url('http://localhost:3000');
      browser.waitForExist("#login-sign-in-link");
      var actualText = browser.getText("#login-sign-in-link");

      expect(actualText).to.equal("Sign in ▾");
      // expect(browser.getAttribute('sign-in-login-links')).to.('Sign in')
    });
  });
});
