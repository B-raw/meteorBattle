Characters = new Mongo.Collection('characters');

CharacterSchema = new SimpleSchema({
  name: {
    type: String,
    label: 'Name'
  },

  hp: {
    type: Number,
    label: 'hp',
    autoValue: function() {
      return 100
    }
  },

  createdAt: {
    type: Date,
    label: "Created At",
    autoValue: function() {
      return new Date()
    },
    autoform: { type: 'hidden'}
  },
  createdBy: {
    type: String,
    label: "Created By",
    autoform: { type: 'hidden'}
  }
});

Meteor.methods({
  newCharacter: function(name){
    check(name, String)

    var currentUserId = Meteor.userId();

    Characters.insert({name: name, createdBy: currentUserId});
  }
});

Characters.attachSchema( CharacterSchema );
