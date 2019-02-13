// Game Enginge
// The Brain of the Game!
class MasterGame {

  constructor() {
    this.slothicles = 4;
    this.__proto__.allGames = [];
    this.__proto__.score = 0;
  }

  decreaseLive() {
    if (this.slothicles === 0){
      $("#end-screen").css("display","flex");
      $("#random-question").text("The end!");
    }else{
      this.slothicles -= 1;
      $(".live-bar ul li:last-child").remove();
      $("#countdown").css("display","flex");
      $("#random-question").text("You Failed!");
      $("#countdown").children().children(":first-child").append('<img id="game-feedback-img" src="img/come-on-man.jpg" />');
      debugger
      var timeleft = 3;
      $("#get-ready").text(timeleft + "...");
      var downloadTimer = setInterval(function(){
      timeleft--;
      $("#get-ready").text(timeleft + "...");
      if(timeleft <= 0){
        clearInterval(downloadTimer);
        $("#countdown").css("display","none");
        $("#game-feedback-img").remove();
        this.loadRandomGame();
      }
      }.bind(this),1000);
    }
  }

  increaseScore() {
    this.__proto__.__proto__.score++;
    if (this.__proto__.__proto__.score > 12) {
      this.__proto__.level = 4;
    } else if (this.__proto__.__proto__.score > 8) {
      this.__proto__.level = 3;
    } else if (this.__proto__.__proto__.score > 4) {
      this.__proto__.level = 2;
    }
    $("#score").text(this.__proto__.__proto__.score);
    $("#level").text(this.__proto__.level);
    $("#countdown").css("display","flex");
    $("#random-question").text("You passed!");
    $("#countdown").children().children(":first-child").append('<img id="game-feedback-img" src="img/react.jpg" />');
    var timeleft = 3;
    $("#get-ready").text(timeleft + "...");
    var downloadTimer = setInterval(function(){
    timeleft--;
    $("#get-ready").text(timeleft + "...");
    if(timeleft <= 0){
      clearInterval(downloadTimer);
      $("#countdown").css("display","none");
      $("#game-feedback-img").remove();
      this.loadRandomGame();
    }
    }.bind(this),1000);
  }

  init() {
    this.__proto__.level = 1;
    $("#slothicles").text(this.slothicles)
    $("#score").text(this.score)
    this.timer();
    this.updateStats();
    this.loadRandomGame();
  }

  loadRandomGame() {
    var gameArray = [];
    if (this.__proto__.allGames.length > 0){
      gameArray = this.__proto__.allGames;
    }else if(this.__proto__.__proto__.allGames.length > 0){
      gameArray = this.__proto__.__proto__.allGames;
    }
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
/*
window.onresize = function(event) {
  createPatterns();
};
*/
function createPatterns() {
  $(".patterns").children().remove();
  var windowWidth = $(window).width();
  var colorArray = ["rgb(212, 156, 168)", "rgb(86, 52, 170)", "rgb(86, 52, 170)", "rgb(103, 154, 168)", "rgb(248, 60, 167)"];
  var patternArray = ['<div class="pattern-circle"></div>','<div class="pattern-triangle-upside-down"></div>',''];
  var patternArray2 = ['<div class="pattern-circle"></div>','<div class="pattern-triangle"></div>',''];
  var amountOfPatternBoxes = Math.floor(windowWidth / 80);
  for (var i = 0; i < amountOfPatternBoxes; i++){
    $(".patterns").append('<div class="pattern-box"></div>');
    $(".patterns").children(":last-child").append(patternArray[Math.floor(Math.random() * patternArray.length)])
    $(".patterns").children(":last-child").children().css("background-color",colorArray[Math.floor(Math.random() * colorArray.length)]);
    $(".patterns").children(":last-child").css("background-color",colorArray[Math.floor(Math.random() * colorArray.length)]);
  }
  for (var i = 0; i < amountOfPatternBoxes; i++){
    $(".patterns").append('<div class="pattern-box"></div>');
    $(".patterns").children(":last-child").append(patternArray2[Math.floor(Math.random() * patternArray2.length)])
    $(".patterns").children(":last-child").children().css("background-color",colorArray[Math.floor(Math.random() * colorArray.length)]);
    $(".patterns").children(":last-child").css("background-color",colorArray[Math.floor(Math.random() * colorArray.length)]);
  }
}



// document ready
$(document).ready(function () {
  createPatterns();
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

  // Start
  $(".start-the-game").click(function() {
    createPatterns();
    $("#end-screen").css("display","none");
    $("#menu").css("display","none");
    $("#countdown").css("display","flex");
    $(".live-bar").css("display","flex");
    $("footer").css("display","flex");
    var timeleft = 3;
    $("#get-ready").text(timeleft + "...");
    var downloadTimer = setInterval(function(){
    createPatterns();
    timeleft--;
    $("#get-ready").text(timeleft + "...");
    if(timeleft <= 0){
      clearInterval(downloadTimer);
      $("#countdown").css("display","none");
      $(".patterns").children().remove();
      brain.init();
    }
    },1000);
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

  // GAME THREE
  $("#start-game-3").click(function () {
    repeatThePattern.create();
  })
  $("#stop-game-3").click(function () {
    repeatThePattern.remove();
  })

})