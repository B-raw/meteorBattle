function getBrowser(i) {
  return browser.instances[i];
}

describe('Chimp Mocha', function() {

  describe('Login Links', function () {
    beforeEach(function(){
      server.call('logout');
      server.execute(function () {
        Package['xolvio:cleaner'].resetDatabase();
      });
    });

    it('Should exist on homepage', function () {
      getBrowser(0).url('http://localhost:3000');
      expect(getBrowser(0).getTitle()).to.equal("meteorBattle");
    });

    it("Should have user login links on homepage", function () {
      getBrowser(0).url('http://localhost:3000');
      getBrowser(0).waitForExist("#login-sign-in-link");
      var actualText = getBrowser(0).getText("#login-sign-in-link");

      expect(actualText).to.equal("Sign in ▾");
    });
  });
});
