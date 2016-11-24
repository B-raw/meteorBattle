import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
  'user.signup'(email, password) {
    Accounts.createUser({email: email, password: password});
  }
});
