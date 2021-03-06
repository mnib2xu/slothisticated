// Game Enginge
// The Brain of the Game!
class MasterGame {

  constructor() {
    this.__proto__.slothicles = 2;
    this.__proto__.allGames = [];
    this.__proto__.score = 0;
  }

  decreaseLive(previousGame) {
    $(".live-bar ul li:last-child").remove();
    if (this.__proto__.__proto__.slothicles === 1) {
      $("#final-score").text(this.__proto__.__proto__.score);
      $("#end-screen").css("display", "flex");
      $(".live-bar").css("display", "none");
      $("footer").css("display", "none");
      $("#sloth-end-meme").attr("src", `img/end-screen-img/sloth-level-`+(this.__proto__.__proto__.level).toString()+'.jpg');
      // $("footer").css("display","none");
      // $(".live-bar").css("display","none");
      $("#random-question").text("You reached the end!");
    } else {
      this.__proto__.__proto__.slothicles -= 1;
      if (previousGame === "game2") {
        $("#reaction-result").css("display", "block");
      }
      $("#random-question").text("You Failed!");
      $(".question-area").css("background-color", "rgb(212, 156, 168)")
      this.getGetGreadyCountDown();
    }
  }
  increaseScore(previousGame) {
    this.__proto__.__proto__.score++;
    var levelUp = false;
    if (this.__proto__.__proto__.score === 32) {
      this.__proto__.__proto__.level = 9;
      levelUp = true;
    } else if (this.__proto__.__proto__.score === 29) {
      this.__proto__.__proto__.level = 8;
      levelUp = true;
    } else if (this.__proto__.__proto__.score === 26) {
      this.__proto__.__proto__.level = 7;
      levelUp = true;
    } else if (this.__proto__.__proto__.score === 23) {
      this.__proto__.__proto__.level = 6;
      levelUp = true;
    } else if (this.__proto__.__proto__.score === 20) {
      this.__proto__.__proto__.level = 5;
      levelUp = true;
    } else if (this.__proto__.__proto__.score === 15) {
      this.__proto__.__proto__.level = 4;
      levelUp = true;
    } else if (this.__proto__.__proto__.score === 10) {
      this.__proto__.__proto__.level = 3;
      levelUp = true;
    } else if (this.__proto__.__proto__.score === 5) {
      this.__proto__.__proto__.level = 2;
      levelUp = true;
    }

    if (previousGame === "game2") {
      $("#reaction-result").css("display", "block");
    }
    $("#score").text(this.__proto__.__proto__.score);
    $(".level").text(this.__proto__.__proto__.level);

    $("#random-question").text("You passed!");
    $(".question-area").css("background-color", "rgb(103, 154, 168)")
    if (levelUp) {
      $("#level-up-screen").css("display", "flex");
      $("#random-question").text("Level Up!");
      // Define text fo level Up screens here:
      var levelUpTextArray = ["That was only warm up!", "Let's sloth it up!", "Good Job, Human!", "Climbing the tree like me...", "Slothastic!", "Damn, Slohn!", "I wish my slohn was as slothisticated as you!", "You reached slothistication!"];
      $("#level-up-text").text(levelUpTextArray[this.__proto__.__proto__.level-2]);
      // $(".live-bar").css("display","none");
      // $("footer").css("display","none");
      this.listenToContinueButton();
    } else {
      this.continueGame();
    }
  }

  listenToContinueButton() {
    $("#continue-game").click(function (event) {
      this.continueGame();
    }.bind(this));
  }

  continueGame() {
    $("#continue-game").off("click");
    $("#level-up-screen").css("display", "none");
    $(".live-bar").css("display", "flex");
    $("footer").css("display", "flex");
    this.getGetGreadyCountDown();
  }

  getGetGreadyCountDown() {
    $("#countdown").css("display", "flex");
    var timeleft = 3;
    $("#get-ready").text(timeleft + "...");
    var downloadTimer = setInterval(function () {
      timeleft--;
      $("#get-ready").text(timeleft + "...");
      if (timeleft <= 0) {
        clearInterval(downloadTimer);
        $("#countdown").css("display", "none");
        $(".question-area").css("background-color", "rgb(86, 52, 170)")
        $("#reaction-result").css("display", "none");
        this.loadRandomGame();
      }
    }.bind(this), 1000);
  }

  init() {
    this.__proto__.level = 1;
    this.__proto__.score = 0;
    this.__proto__.slothicles = 4;
    for (var i = 0; i < this.__proto__.slothicles; i++) {
      $(".live-bar ul").append('<li class="live live"><img src="img/sloth.svg"></li>')
    }
    $("#score").text(this.__proto__.score)
    $(".level").text(this.__proto__.level)
    this.updateStats();
  }

  loadRandomGame() {
    var gameArray = [];
    if (this.__proto__.allGames.length > 0) {
      gameArray = this.__proto__.allGames;
    } else if (this.__proto__.__proto__.allGames.length > 0) {
      gameArray = this.__proto__.__proto__.allGames;
    }
    gameArray[0].remove();
    gameArray[1].remove();
    gameArray[2].remove();
    gameArray[3].remove();
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
}

// document ready
$(document).ready(function () {
  createPatterns();

  // Initializing
  let brain = new MasterGame();
  let myGame = new Game1();
  let myGame2 = new Game2();
  let repeatThePattern = new Game3();
  let myGame4 = new Game4();
  brain.__proto__.allGames.push(myGame);
  brain.__proto__.allGames.push(myGame2);
  brain.__proto__.allGames.push(repeatThePattern);
  brain.__proto__.allGames.push(myGame4);

  // Start
  $(".start-game").click(function () {
    $("#random-question").text("");
    createPatterns();

    $("#menu").css("display", "none");
    $("#countdown").css("display", "flex");
    $("#end-screen").css("display", "none");

    $(".live-bar").css("display", "flex");
    $("footer").css("display", "flex");
    brain.init();

    var timeleft = 3;
    $("#get-ready").text(timeleft + "...");
    var downloadTimer = setInterval(function () {
      createPatterns();
      timeleft--;
      $("#get-ready").text(timeleft + "...");
      if (timeleft <= 0) {
        clearInterval(downloadTimer);
        $("#countdown").css("display", "none");
        removePatterns();
        brain.loadRandomGame();
      }
    }, 1000);
  })

  // Game ONE
  $(".object").click(function (event) {
    myGame.updateMaster(event.currentTarget);
  })

  // GAME TWO
  $("#reaction-wait").click(function () {
    myGame2.clickedToSoon();
  })
  $("#reaction-go").click(function () {
    myGame2.reaction();
  })
})

function createPatterns() {
  $(".patterns").children().remove();
  var windowWidth = $(window).width();
  var windowHeight = $(window).height();
  var factor = 0;
  if(windowWidth < 800){
    factor = 0.1
  }else{
    factor = 0.09
  }
  var colorArray = ["rgb(212, 156, 168)", "rgb(86, 52, 170)", "rgb(86, 52, 170)", "rgb(103, 154, 168)", "rgb(248, 60, 167)"];
  var patternArray = [
    ['<div class="pattern-circle"></div>', '<div class="pattern-triangle-upside-down"></div>', ''],
    ['<div class="pattern-circle"></div>', '<div class="pattern-triangle"></div>', '']
  ];
  var amountOfPatternBoxes = Math.floor(windowWidth / (windowHeight * factor));
  for (var i = 0; i < 2; i++) {
    for (var j = 0; j < amountOfPatternBoxes; j++) {
      $(".patterns").append('<div class="pattern-box"></div>');
      $(".patterns").children(":last-child").append(patternArray[i][Math.floor(Math.random() * patternArray[i].length)])
      $(".patterns").children(":last-child").children().css("background-color", colorArray[Math.floor(Math.random() * colorArray.length)]);
      $(".patterns").children(":last-child").css("background-color", colorArray[Math.floor(Math.random() * colorArray.length)]);
    }
  }
}

function removePatterns() {
  $(".patterns").children().remove();
}