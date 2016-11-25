import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // console.log(Meteor.users.find({ "status.online": false }).fetch());
});

Meteor.methods({
  'user.signup'(email, password) {
    Accounts.createUser({email: email, password: password});
  },
  'addPendingBattle'(recipientId, senderId) {
    Meteor.users.update(recipientId, { $set: { battleRequestObject: {battleRequest: "pending-battle-invite", battleRequestFrom: senderId }}});
  }
});
