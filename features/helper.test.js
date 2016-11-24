function signInHelper(email, password) {
  browser.url('http://localhost:3000')
  .click('#login-sign-in-link')
  .click("#signup-link")
  .setValue('input#login-email', email)
  .setValue('input#login-password', password)
  .click('div#login-buttons-password')
}
