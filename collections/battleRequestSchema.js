BattleRequests = new Mongo.Collection('battleRequests');

BattleRequestSchema = new SimpleSchema({
  challenger: {
    type: String,
    label: "Challenger",
    autoValue: function() {
      return Meteor.userId()
    }
  },
  recipient: {
    type: String,
    label: "Recipient"
  },
  createdAt: {
    type: Date,
    label: "Created At",
    autoValue: function() {
      return new Date()
    }
  },
})

Meteor.methods({
  newBattleRequest: function(requestRecipient) {
    check(requestRecipient, String);

    BattleRequests.insert({recipient: requestRecipient })
  }
})

BattleRequests.attachSchema( BattleRequestSchema );
