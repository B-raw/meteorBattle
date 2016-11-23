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
  }
});

Meteor.methods({
  newCharacter: function(name){
    Characters.insert({name: name});
  }
});

Characters.attachSchema( CharacterSchema );
