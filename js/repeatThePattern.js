// Game 3
// Repeat the Pattern
class Game3 extends MasterGame {

  constructor(score, slothicles) {
    super(score, slothicles);
    this.timeLimit;
    this.startTime;
    this.elapsedTime;
    this.tooSoon = false;
    this.gameFinished = false;
  }

  newGame() {
    $("#game3").css("display", "flex");
    this.letButtonsListen();
    this.clearGame();
  }

  letButtonsListen() {
    $(".gamebutton").click(function (event) {
      console.log(event.currentTarget.id)
      this.addToPlayer(event.currentTarget.id);
    }.bind(this));
  }

  clearGame() {
    $("#random-question").text("Repeat the pattern");
    this.currentGame = [];
    this.gameCount = 0;
    this.possibilities = ['#green', '#blue', '#red', '#dark']
    this.addCount();
  }

  addCount() {
    this.gameCount++;
    this.generateMove();
  }

  generateMove() {
    this.currentGame.push(this.possibilities[(Math.floor(Math.random() * 4))]);
    this.showMoves();
  }

  showMoves() {
    var i = 0;
    var moves = setInterval(function () {
      this.playGame(this.currentGame[i]);
      i++;
      if (i >= this.currentGame.length) {
        clearInterval(moves);
      }
    }.bind(this), 500)
    this.clearPlayer();
  }

  playGame(field) {
    $(field).addClass('hover');
    setTimeout(function () {
      $(field).removeClass('hover');
    }, 500);
  }

  clearPlayer() {
    this.player = [];
  }

  addToPlayer(id) {
    var field = "#" + id;
    console.log(field);
    this.player.push(field);
    this.playerTurn(field);
  }

  nextLevel() {
    this.addCount();
  }

  playerTurn() {
    
    if (this.player[this.player.length - 1] !== this.currentGame[this.player.length - 1]) {

      alert('Try again! ...From scratch!');
      this.newGame();
      this.decreaseLive();
    } else {
      console.log('Good Move!');
      var check = this.player.length === this.currentGame.length;
      if (check) {
        if (this.gameCount == 10) {
          alert('You won! Congrats.');
        } else {
          alert('Next round!');
          this.nextLevel();
        }
      }
    }
  }
}