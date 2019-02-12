// Game Enginge
// The Brain of the Game!
class MasterGame {

  constructor() {
    this.slothicles = 4;
    this.score = 0;
    this.__proto__.allGames = [];
  }

  decreaseLive() {
    this.slothicles -= 1;
    $(".live-bar ul li:last-child").remove();
  }

  increaseScore() {
    this.score++;
    $("#score").text(this.score);
    if (this.score > 2) {
      this.__proto__.level = 2;
    }
    if (this.score > 4) {
      this.__proto__.level = 3;
    }
    if (this.score > 6) {
      this.__proto__.level = 4;
    }
  }

  init() {
    this.__proto__.level = 1;
    $("#slothicles").text(this.slothicles)
    $("#score").text(this.score)
    this.timer();
    this.updateStats();
  }

  loadRandomGame() {
    var gameArray = this.__proto__.__proto__.allGames;
    gameArray[0].remove();
    gameArray[1].remove();
    gameArray[2].remove();
    var randomGame = this.getRandomItem(gameArray);
    randomGame.create();
  }

  getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  updateStats() {
    $("#slothicles").text(this.slothicles)
    $("#score").text(this.score)
    $("#level").text(this.level)
    if (this.slothicles === 0) {
      alert("you are not slothisticated enough for this game!");
      this.slothicles = 3;
    }
  }

  timer() {
    var sec = 0;
    var timer = setInterval(function () {
      $("#time").innerHTML = '00:' + sec;
      sec++;
      if (sec > 1000) {
        clearInterval(timer);
      }
    }.bind(this), 1000);
  }
}

// document ready
$(document).ready(function () {
  let brain = new MasterGame();
  let myGame = new Game1();
  let myGame2 = new Game2();
  let repeatThePattern = new Game3();
  brain.__proto__.allGames.push(myGame);
  brain.__proto__.allGames.push(myGame2);
  brain.__proto__.allGames.push(repeatThePattern);
  $("#start-game").click(function () {
    brain.init();
  })
  // Game ONE
  $("#start-game-1").click(function (event) {
    myGame.create();
  })
  $("#stop-game-1").click(function (event) {
    myGame.remove();
  })
  $(".object").click(function (event) {
    myGame.updateMaster(event.currentTarget);
  })

  // GAME TWO
  $("#start-game-2").click(function () {
    myGame2.create();
  })
  $("#stop-game-2").click(function () {
    myGame2.remove();
  })
  $("#reaction-wait").click(function () {
    myGame2.clickedToSoon();
  })
  $("#reaction-go").click(function () {
    myGame2.reaction();
  })
  $("#reaction-result").click(function () {
    myGame2.remove();
    brain.loadRandomGame();
  })

  // GAME THREE
  $("#start-game-3").click(function () {
    repeatThePattern.create();
  })
  $("#stop-game-3").click(function () {
    repeatThePattern.remove();
  })

})