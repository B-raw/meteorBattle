// import { Meteor } from 'meteor/meteor';

describe('Character', function() {
  describe('Add a character', function () {
    it('user can add new character @watch', function () {
      browser.url('http://localhost:3000/character/new')
             .setValue( '[name="name"]', 'Pikachu' )
             .submitForm( '.newCharacterForm' );

      var getCharacter = server.execute( function() {
        return Characters.findOne( { name: "Pikachu" } );
      });

      expect( getCharacter.name ).to.equal("Pikachu")
    });

    afterEach( function() {
      server.execute( function() {
        var character = Characters.findOne( { name: "Pikachu" } );
        if ( character ) {
          Characters.remove( character._id );
        }
      });
    });
  });
});
