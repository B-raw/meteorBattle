const signUpSignIn = function() {

  browser.url('http://localhost:3000')
         .click('#login-sign-in-link')
        //  .click('#signup-link')
         .setValue( '[id="login-email"]', 'asda@hotmail.com' )
         .setValue( '[id="login-password"]', 'asddsa' )
         .click("#login-buttons-password")
  browser.waitForExist("#login-name-link");
  // var actualText = browser.getText("#login-name-link", "x") // Get x or y, if not specified, an object {x, y} is returned.

  // expect(actualText).to.equal("asda@hotmail.com ▾");
};

describe('Battle Lobby', function() {

  // describe('Login Links', function () {

    it('Should exist on homepage', function () {
      signUpSignIn();
      expect(browser.getTitle()).to.equal("meteorBattle");
    });

    // it("Should have user login links on homepage", function () {
    //   browser.url('http://localhost:3000');
    //   browser.waitForExist("#login-sign-in-link");
    //   var actualText = browser.getText("#login-sign-in-link");
    //
    //   expect(actualText).to.equal("Sign in ▾");
    //   // expect(browser.getAttribute('sign-in-login-links')).to.('Sign in')
    // });
  // });
});
