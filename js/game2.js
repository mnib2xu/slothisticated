// Game 2
// Reaction Game
class Game2 extends MasterGame{

  constructor(score, slothicles) {
    super(score, slothicles);
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
      $("#reaction-ms").text(this.elapsedTime);
    }
    $("#time-limit").text(this.timeLimit);
    $("#master-level").text(this.level);
    $("#reaction-go").toggleClass("hidden");
    $("#reaction-result").toggleClass("hidden");

    if(this.tooSoon){
      $("#reaction-ms").text("-");
      $("#reaction-result").addClass("failed");
      $("#sloth-result").attr("src","img/come-on-man.jpg");
      $("#random-question").text("You were to fast!")
      this.gamePassed = false;
    }else if(this.elapsedTime < this.timeLimit){
      $("#reaction-result").addClass("passed");
      $("#sloth-result").attr("src","img/react.jpg");
      this.gamePassed = true;
    }else if(this.elapsedTime > this.timeLimit){
      $("#reaction-result").addClass("failed");
      $("#sloth-result").attr("src","img/come-on-man.jpg");
      $("#random-question").text("You were to slowth!")
      this.gamePassed = false;
    }
    this.updateMaster();
  }

  updateMaster() {
    if(this.gamePassed){
      this.increaseScore();
    }else{
      this.decreaseLive();
    }
    setTimeout(function(){ this.loadRandomGame() }.bind(this),3000);
  }

  change() {
    $("#reaction-wait").toggleClass("hidden");
    $("#reaction-go").toggleClass("hidden");
  }

  remove() {
    this.tooSoon = false;
    $("#game2").css("display","none");
    $("#reaction-result").addClass("hidden");
    $("#reaction-result").removeClass("passed failed");
    $("#reaction-wait").removeClass("hidden");
    $("#random-question").text("");
  }
}
