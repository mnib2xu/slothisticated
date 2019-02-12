// Game 2
// Reaction Game
class Game2 extends MasterGame{

  constructor(score, slothicles) {
    super(score, slothicles);
    this.timeLimit;
    this.startTime;
    this.elapsedTime;
    this.tooSoon = false;
    this.gameFinished = false;
  }
  create() {
    $("#random-question").text("React as fast as you can!");
    $("#game2").css("display","flex");
    switch (this.level) {
      case 1:
        this.timeLimit = 500;
        break;
      case 2:
        this.timeLimit = 450;
        break;
      case 3:
        this.timeLimit = 400;
        break;
      case 4:
        this.timeLimit = 350;
        break;
      default:
        break;
    }
    this.tooSoon = false;
    this.randomTimer();
  }

  randomTimer() {
    var sec = 0;
    var randomTime = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;  
    debugger
    var timer = setInterval(function () {
      sec++;
      if (sec > randomTime || this.tooSoon) {
        this.startTime = Date.now();
        clearInterval(timer);
        this.change();
      }
    }.bind(this), 1);
  }

  clickedToSoon() {
    this.tooSoon = true;
    this.reaction();
  }

  reaction() {
    if(this.gameFinished){
      this.gameFinished = false;
      this.remove();
      this.create();
    }
    this.elapsedTime = Date.now() - this.startTime;
    $("#reaction-time-box").toggleClass("hidden");
    $("#reaction-time").text(this.elapsedTime);
    $("#time-limit").text(this.timeLimit);
    if(this.elapsedTime < this.timeLimit){
      $("#reaction-go").addClass("passed");
      $("#random-question").text("Very slothisticated!")
    }else if(this.elapsedTime > this.timeLimit){
      $("#reaction-go").addClass("failed");
      $("#sloth-reaction").attr("src","img/come-on-man.jpg");
      $("#random-question").text("You were to slowth!")
    }else {
      $("#reaction-go").addClass("failed");
      $("#sloth-reaction").attr("src","img/come-on-man.jpg");
      $("#random-question").text("You were to fast!")
    }
    this.gameFinished = true;
  }

  change() {
    $("#reaction-wait").toggleClass("hidden");
    $("#reaction-go").toggleClass("hidden");
  }

  remove() {
    $("#game2").css("display","none");
    $("#reaction-wait").removeClass("hidden");
    $("#reaction-go").addClass("hidden");
    $("#reaction-go").removeClass("passed failed");
    $("#sloth-reaction").attr("src","img/react.jpg");
    $("#reaction-time-box").addClass("hidden");
    $("#random-question").text("");
  }
}
