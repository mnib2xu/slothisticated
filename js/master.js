// Game Enginge
// The Brain of the Game!
class MasterGame {

  constructor() {
    this.slothicles = 4;
    this.score = 0;
  }

  init() {
    this.__proto__.level = 1;
    $("#slothicles").text(this.slothicles)
    $("#score").text(this.score)
    this.timer();
    this.updateStats();
  }

  loadRandomGame(gameArray) {
    gameArray[0].remove();
    gameArray[1].remove();
    var randomGame = this.getRandomItem(gameArray);
    randomGame.create();
  }

  getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  // Fisher-Yates Shuffle
  shuffleArray(array) {
    var newArray = array.map((elem) => elem);
    let counter = newArray.length;
    while (counter > 0) {
      let index = Math.floor(Math.random() * counter);
      counter--;
      let temp = newArray[counter];
      newArray[counter] = newArray[index];
      newArray[index] = temp;
      console.log(this.__proto__.level)
    }
    return newArray;
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
      document.getElementById('time').innerHTML = '00:' + sec;
      sec++;
      if (sec > 10) {
        this.__proto__.level = 2;
      }
      if (sec > 20) {
        this.__proto__.level = 3;
      }
      if (sec > 30) {
        this.__proto__.level = 4;
      }
      if (sec > 1000) {
        clearInterval(timer);
        alert(this.score)
      }
    }.bind(this), 1000);
  }
}

window.onresize = function(event) {
  createPatterns();
};

function createPatterns() {
  $(".patterns").children().remove();
  var windowWidth = $(window).width();
  var colorArray = ["rgb(212, 156, 168)", "rgb(86, 52, 170)", "rgb(103, 154, 168)", "rgb(248, 60, 167)"];
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
  console.log(amountOfPatternBoxes);
}

// document ready
$(document).ready(function () {
  createPatterns();
  var brain = new MasterGame();
  $("#start-game").click(function () {
    brain.init();
  })
  let myGame = new Game1();
  let myGame2 = new Game2();
  var allGames = [myGame, myGame2];

  $("#start-game-1").click(function (event) {
    myGame.create();
  })
  $("#stop-game-1").click(function (event) {
    myGame.remove();
  })
  $(".object").click(function (event) {
    var object = event.currentTarget;
    if (myGame.checkAnswer(object.children[0].children[0].textContent, object.style.backgroundColor, object.style.borderColor, object.children[0].children[1].style.backgroundColor)) {
      brain.score++;
    } else {
      brain.slothicles -= 1;
      $(".live-bar ul li:last-child").remove()
    }
    brain.updateStats();
    brain.loadRandomGame(allGames);
  })
  $("#start-game-2").click(function () {
    myGame2.create();
  })
  $("#stop-game-2").click(function () {
    myGame2.remove();
  })
  $("#reaction-wait").click(function () {
    myGame2.clickedToSoon();
    if (myGame2.gamePassed) {
      brain.score++;
    } else {
      brain.slothicles -= 1;
      $(".live-bar ul li:last-child").remove()
    }
  })
  $("#reaction-go").click(function () {
    myGame2.reaction();
    if (myGame2.gamePassed) {
      brain.score++;
    } else {
      brain.slothicles -= 1;
      $(".live-bar ul li:last-child").remove()
    }
  })
  $("#reaction-result").click(function () {
    myGame2.remove();
    brain.loadRandomGame(allGames);
  })




})