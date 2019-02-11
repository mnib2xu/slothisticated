// Game Enginge
// The Brain of the Game!
class MasterGame {

  constructor() {
    this.slothicles = 3;
    this.score = 0;
    this.level = 1;
  }

  init() {
    $("#slothicles").text(this.slothicles)
    $("#score").text(this.score)
    this.timer();
    this.updateStats();
  }

  loadRandomGame() {

  }

  getRandomItem(array){
    return array[Math.floor(Math.random()*array.length)];
  }

  // Fisher-Yates Shuffle
  shuffleArray(array) {
    let counter = array.length;
    while (counter > 0) {
      let index = Math.floor(Math.random() * counter);
      counter--;
      let temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }
    return array;
  }

  updateStats() {
    $("#slothicles").text(this.slothicles)
    $("#score").text(this.score)
    if(this.slothicles < 0){
      alert("you are not slothisticated enough for this game!");
      this.slothicles = 3;
    }
  }

  timer() {
    var sec = 0;
    var timer = setInterval(function(){
      document.getElementById('time').innerHTML='00:'+sec;
      sec++;
      if (sec > 10) {
        this.level = 2;
      }
      if (sec > 1000) {
          clearInterval(timer);
          alert(this.score)
      }
    }.bind(this), 1000);
  }
}


// document ready
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