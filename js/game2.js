// Game 2
// Reaction Game
class Game2 extends MasterGame{

  constructor() {
    super();
    this.timeLimit;
    this.startTime;
    this.elapsedTime;
    this.tooSoon = false;
    this.gamePassed = true;
  }
  create() {
    $("#random-question").text("React as fast as you can!");
    $("#game2").css("display","flex");
    switch (this.level) {
      case 1:
        this.timeLimit = 1000;
        break;
      case 2:
        this.timeLimit = 750;
        break;
      case 3:
        this.timeLimit = 500;
        break;
      case 4:
        this.timeLimit = 400;
        break;
      case 5:
        this.timeLimit = 350;
        break;
      case 6:
        this.timeLimit = 325;
        break;
      case 7:
        this.timeLimit = 300;
        break;
      case 8:
        this.timeLimit = 280;
        break;
      case 9:
        this.timeLimit = 260;
        break;
      default:
        this.timeLimit = 500;
        break;
    }
    this.randomTimer(); 
  }

  randomTimer() {
    var sec = 0;
    var randomTime = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;  
    var timer = setInterval(function () {
      sec++;
      if (sec > randomTime) {
        this.startTime = Date.now();
        clearInterval(timer);
        this.change();
      }
      if (this.tooSoon) {
        clearInterval(timer);
      }
    }.bind(this), 1);
  }

  clickedToSoon() {
    this.tooSoon = true;
    this.reaction();
  }

  reaction() {
    if(!this.tooSoon){
      this.elapsedTime = Date.now() - this.startTime;
      $("#reaction-ms").text(this.elapsedTime);
      $("#reaction-go").toggleClass("hidden");
    }else{

    }
    $("#time-limit").text(this.timeLimit);
    if(this.tooSoon){
      $("#reaction-ms").text("-");
      this.gamePassed = false;
    }else if(this.elapsedTime < this.timeLimit){
      this.gamePassed = true;
    }else if(this.elapsedTime > this.timeLimit){
      this.gamePassed = false;
    }
    this.updateMaster();
  }

  updateMaster() {
    this.remove();
    if(this.gamePassed){
      this.increaseScore("game2");
    }else{
      this.decreaseLive("game2");
    }
  }

  change() {
    $("#reaction-wait").toggleClass("hidden");
    $("#reaction-go").toggleClass("hidden");
  }

  remove() {
    this.tooSoon = false;
    $("#game2").css("display","none");
      $("#reaction-wait").removeClass("hidden");
    $("#reaction-go").addClass("hidden");
    $("#random-question").text("");
  }
}
