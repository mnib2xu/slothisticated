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
        this.amountOfRepeats = 3;
        break;
      case 3:
        this.amountOfRepeats = 4;
        break;
      case 4:
        this.amountOfRepeats = 5;
        break;
      default:
        this.amountOfRepeats = 2;
        break;
    }
    $("#game3").css("display", "flex");
    this.clearGame();
  }

  remove() {
    $("#game3").css("display", "none");
    $("#random-question").text("");
  }

  letButtonsListen() {
    $(".gamebutton").click(function (event) {
      this.addToPlayer(event.currentTarget.id);

    }.bind(this));
  }

  clearGame() {
    $("#random-question").text("Repeat the pattern");
    this.currentGame = [];
    this.possibilities = ['#green', '#blue', '#red', '#dark']

    for (var i = 0; i < this.amountOfRepeats; i++) {
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
    }.bind(this), 600)
    this.clearPlayer();
  }

  playGame(field) {
    $(field).addClass('hover');
    setTimeout(function () {
      $(field).removeClass('hover');
    }, 200);
  }

  clearPlayer() {
    this.player = [];
    this.letButtonsListen();
  }

  addToPlayer(id) {
    var field = "#" + id;
    this.player.push(field);
    this.playerTurn(field);
  }

  playerTurn() {
    // EACH TIME A PLAYER CLICKS A BUTTON IT CHECKS IT CORRECTNESS
    if (this.player[this.player.length - 1] !== this.currentGame[this.player.length - 1]) {

      //ENTERS THIS PART IF INCORRECT
      $(".gamebutton").off("click");
      this.remove();
      this.decreaseLive("game3");
    } else {

      // ENTERS THIS PART IF CLICK IS CORRECT

      if (this.player.length === this.currentGame.length) {
        $(".gamebutton").off("click");
        this.remove();
        this.increaseScore("game3");
        // this.create();
      }
    }
  }
}