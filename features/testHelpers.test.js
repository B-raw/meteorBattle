export function signUp(email, password){
  server.call('user.signup', email, password);
}
export function signIn(browserName, email, password) {
  browserName.url('http://localhost:3000');
  browserName.execute(function(email, password){
    Meteor.loginWithPassword(email, password);
  }, email, password);
}

export function getBrowser(i) {
  return browser.instances[i];
}

export function signUpAndSignIn(browserName, email, password) {
  signUp(email, password);
  signIn(browserName, email, password);

}
