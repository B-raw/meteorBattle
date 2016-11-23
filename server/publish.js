Meteor.publish('characters', function(){
  return Characters.find({});
});
