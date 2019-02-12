// Game 2
// Reaction Game
class Game2 extends MasterGame{

  constructor(score, slothicles) {
    super(score, slothicles);
    this.timer;
    this.timeLimit;
    this.startTime;
    this.elapsedTime;
    this.tooSoon = false;
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
    this.randomTimer(); 
  }

  randomTimer() {
    var sec = 0;
    var randomTime = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;  
    var timer = setInterval(function () {
      sec++;
      console.log(sec);
      if (sec > randomTime) {
        this.startTime = Date.now();
        clearInterval(timer);
        this.change();
      }
      if (this.tooSoon) {
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
    if(!this.tooSoon){
      this.elapsedTime = Date.now() - this.startTime;
      $("#reaction-time").text(this.elapsedTime);
      $("#time-limit").text(this.timeLimit);
    }
    $("#reaction-go").toggleClass("hidden");
    $("#reaction-result").toggleClass("hidden");

    if(this.tooSoon){
      $("#reaction-time").text("too fast");
      $("#reaction-result").addClass("failed");
      $("#sloth-result").attr("src","img/come-on-man.jpg");
      $("#random-question").text("You were to fast!")
    }else if(this.elapsedTime < this.timeLimit){
      $("#reaction-result").addClass("passed");
      $("#sloth-result").attr("src","img/react.jpg");
    }else if(this.elapsedTime > this.timeLimit){
      $("#reaction-result").addClass("failed");
      $("#sloth-result").attr("src","img/come-on-man.jpg");
      $("#random-question").text("You were to slowth!")
    }
  }

  change() {
    $("#reaction-wait").toggleClass("hidden");
    $("#reaction-go").toggleClass("hidden");
  }

  remove() {
    this.tooSoon = false;
    clearInterval(this.timer);
    $("#game2").css("display","none");
    $("#reaction-result").addClass("hidden");
    $("#reaction-result").removeClass("passed failed");
    $("#reaction-wait").removeClass("hidden");
    $("#random-question").text("");
  }
}
