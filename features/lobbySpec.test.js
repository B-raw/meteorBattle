describe('sign up and display character', function() {
  it('it can display a character ready to fight', function() {
    var hostBrowser = browser.instances[0]
    var opponentBrowser = browser.instances[1];
    hostBrowser.url('http://localhost:3000')
    opponentBrowser.url('http://localhost:3000/character/new')
    var hostText = hostBrowser.getUrl();
    var opponentText = opponentBrowser.getUrl();
    console.log(hostText)
    console.log(opponentText)

  });
});
