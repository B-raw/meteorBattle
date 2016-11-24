// import { Meteor } from 'meteor/meteor';
function signInHelper(email, password) {
  browser.url('http://localhost:3000');
  browser.click('#login-sign-in-link');
  browser.click("#signup-link");
  browser.setValue('input#login-email', email);
  browser.setValue('input#login-password', password);
  browser.click('div#login-buttons-password');
}

describe('Character', function() {
  describe('Add a character', function () {

    beforeEach( function(){
      server.call('logout');
      server.execute(function () {
        Package['xolvio:cleaner'].resetDatabase();
      });

      signInHelper('Pikachu@pika.com', "pikapika");
      browser.waitForExist("form.newCharacterForm", 4000);
      browser.setValue( '[name="name"]', 'Pikachu' )
             .submitForm( 'form.newCharacterForm' );
    });

    it('character gets created with a name', function () {
      var getCharacter = server.execute( function() {
        return Characters.findOne( { name: "Pikachu" } );
      });

      expect( getCharacter.name ).to.equal("Pikachu");
    });

    it('character gets created with a hp of 100', function () {
      var getCharacter = server.execute( function() {
        return Characters.findOne( { name: "Pikachu" } );
      });

      expect( getCharacter.hp ).to.equal(100);
    });
  });
});
