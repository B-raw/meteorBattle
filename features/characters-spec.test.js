describe('Character', function() {
  describe('Add a character', function () {

    beforeEach( function(){
      server.call('logout');
      server.execute(function () {
        Package['xolvio:cleaner'].resetDatabase();
      });
      server.call('user.signup', 'Pikachu@pika.com', 'pikapika');
      browser.url('http://localhost:3000');
      browser.execute(function(){
        Meteor.loginWithPassword('Pikachu@pika.com', 'pikapika');
      });

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

    it('displays your characters on the fight page @watch', function() {
      var getLobbyUrl = browser.getUrl();

      expect(getLobbyUrl).to.equal("http://localhost:3000/lobby");
    });
  });
});
