describe("User Login", function () {
  describe("New user", function () {
    it("gets redirected to new character form on sign up", function () {
      browser.url('http://localhost:3000');
      browser.click('#login-sign-in-link');
      browser.click("#signup-link");
      browser.setValue('inputlogin-email','Pikachu@pika.com');
      // browser.setValue('[type="password"]', 'pikapika');
      // browser.click('#login-buttons-password');
      // expect(browser.url([url]).to.equal('http://localhost:3000/character/new');
    });
  });
});
