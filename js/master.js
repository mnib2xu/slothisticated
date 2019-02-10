// Game Enginge
// The Brain of the Game!
function MasterGame() {
  this.slothicles = 3;
  this.score = 0;
  this.level = 1;

  this.init = function() {
    $("#slothicles").text(this.slothicles)
    $("#score").text(this.score)
    this.timer(30);
    this.updateStats();
  }

  this.start = function() {

  }

  this.timer = function() {

  }

  this.loadRandomGame = function() {

  }

  this.updateStats = function() {
    $("#slothicles").text(this.slothicles)
    $("#score").text(this.score)
    if(this.slothicles < 0){
      alert("you are not slothisticated enough for this game!");
      this.slothicles = 3;
    }
  }

  this.timer = function(sec) {
    var timer = setInterval(function(){
      document.getElementById('time').innerHTML='00:'+sec;
      sec--;
      if (sec < 20) this.level = 2;
      if (sec < 10) this.level = 3;
      if (sec < 0) {
          clearInterval(timer);
          alert(myGame.score)
      }
    }.bind(this), 1000);
  }
}

$(document).ready(function () {
  var brain = new MasterGame();
  $("#start-game").click(function(){
    brain.init();
  })


  var myGame = new Game1();
  $("#start-game-1").click(function(event){
    myGame.create();
  })
  $("#stop-game-1").click(function(event){
    myGame.remove();
  })
  $(".object").click(function(event){
    var object = event.currentTarget;
    if (myGame.checkAnswer(object.textContent, object.style.backgroundColor ,object.style.borderColor)){
      brain.score++;
    }else{
      brain.slothicles -= 1;
    }
    brain.updateStats();
    myGame.create();
  })


  let myGame2 = new Game2();
  $("#start-game-2").click(function(){
    myGame2.create();
  })
  $("#stop-game-2").click(function(){
    myGame2.remove();
  })
  $(".answer").click(function(){
    if (myGame2.checkAnswer(event.currentTarget.textContent)){
      brain.score++;
    }else{
      brain.slothicles -= 1;

    }
    brain.updateStats();
    myGame2.create();
  })


})