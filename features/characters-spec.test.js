// import { Meteor } from 'meteor/meteor';

describe('Character', function() {
  describe('Add a character', function () {

    beforeEach( function(){
      browser.url('http://localhost:3000/character/new')
             .setValue( '[name="name"]', 'Pikachu' )
             .submitForm( 'form.newCharacterForm' );
    });

    it('character gets created with a name @watch', function () {
      var getCharacter = server.execute( function() {
        return Characters.findOne( { name: "Pikachu" } );
      });

      expect( getCharacter.name ).to.equal("Pikachu");
    });

    it('character gets created with a hp of 100 @watch', function () {
      var getCharacter = server.execute( function() {
        return Characters.findOne( { name: "Pikachu" } );
      });

      expect( getCharacter.hp ).to.equal(100);
    });    

    afterEach( function() {
      server.execute( function() {
        Characters.remove({});
      });
    });
  });
});
