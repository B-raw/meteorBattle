import '../imports/accounts-config.js';

Meteor.subscribe('characters');
Meteor.startup(function(){
  TimeSync.loggingEnabled = false;
});
