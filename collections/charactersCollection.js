Characters = new Mongo.Collection('characters');

Characters.allow({
  update: function(userId, doc, fields, modifier) {
    return !!userId;
  }
});

CharacterSchema = new SimpleSchema({
  name: {
    type: String,
    label: 'Name'
  },

  hp: {
    type: Number,
    label: 'hp',
    defaultValue: 100
  },

  wins: {
    type: Number,
    defaultValue: 0
  },

  losses: {
    type: Number,
    defaultValue: 0
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

Characters.attachSchema( CharacterSchema );
