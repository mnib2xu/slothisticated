// Game 3
// Repeat the Pattern
class Game3 extends MasterGame {

  constructor(score, slothicles) {
    super(score, slothicles);
    this.amountOfRepeats;
    this.gamePassed = false;
  }

  create() {
    switch (this.level) {
      case 1:
        this.amountOfRepeats = 2;
        break;
      case 2:
        this.amountOfRepeats = 4;
        break;
      case 3:
        this.amountOfRepeats = 6;
        break;
      case 4:
        this.amountOfRepeats = 8;
        break;
      default:
        this.amountOfRepeats = 2;
        break;
    }
    $("#game3").css("display", "flex");
    this.letButtonsListen();
    this.clearGame();
  }

  remove() {
    $("#game3").css("display", "none");
    $("#random-question").text("");
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
    this.possibilities = ['#green', '#blue', '#red', '#dark']

    for (var i = 0; i < this.amountOfRepeats; i++){
      this.currentGame.push(this.possibilities[(Math.floor(Math.random() * 4))]);
    }
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

  playerTurn() {
    if (this.player[this.player.length - 1] !== this.currentGame[this.player.length - 1]) {
      //alert('Try again! ...From scratch!');
      this.decreaseLive();
    } else {
      //console.log('Good Move!');
      var check = this.player.length === this.currentGame.length;
      if (check) {
        this.increaseScore();
      }
    }
    this.loadRandomGame();
  }
}