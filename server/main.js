import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {

});

Meteor.methods({
  'user.signup'(email, password) {
    Accounts.createUser({email: email, password: password});
  }
});
