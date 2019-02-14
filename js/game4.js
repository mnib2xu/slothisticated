// Game 4
// Do not press the red Button!
class Game4 extends MasterGame {

  constructor() {
    super();
    this.pressButton;
    this.countdown;
    this.countdownTime;
  }

  create() {
    switch (this.level) {
      case 1:
        this.countdownTime = 50;
        break;
      case 2:
        this.countdownTime = 40;
        break;
      case 3:
        this.countdownTime = 30;
        break;
      case 4:
        this.countdownTime = 20;
        break;
      case 5:
        this.countdownTime = 15;
        break;
      case 6:
        this.countdownTime = 10;
        break;
      case 7:
        this.countdownTime = 0.75;
        break;
      case 8:
        this.countdownTime = 0.5;
        break;
      case 9:
        this.countdownTime = 0.4;
        break;
      default:
        this.countdownTime = 2;
        break;
    }
    $("#game4").css("display", "flex");
    this.pressButton = Math.round((Math.random() * 1) + 0) === 0;
    if(this.pressButton){
      $("#random-question").text("Do press the red sloth Button!")
    }else{
      $("#random-question").text("Do not press the red sloth Button!")
    }
    this.startCountdown();
    this.listenToButton();
  }

  listenToButton() {
    $(".red-btn").click(function (event) {
      this.checkSolution();
    }.bind(this));
  }

  checkSolution() {
    if (this.pressButton){
      this.increaseScore();
    }else{
      this.decreaseLive("game4");
    }
    this.remove();
  }

  remove() {
    $("#game4").css("display", "none");
    $(".red-btn").off("click");
    this.stopCountdown();
    this.pressButton = undefined;
  }

  startCountdown() {
    $("#myProgress").css("display","block")
    var elem = document.getElementById("myBar"); 
    var width = 100;
    this.countdown = setInterval(function(){
      if (width === 0) {
        if (!this.pressButton){
          this.increaseScore();
        }else{
          this.decreaseLive("game4");
        }
        this.remove();
      } else {
        width--; 
        elem.style.width = width + '%'; 
      }
    }.bind(this), this.countdownTime);
  }

  stopCountdown() {
    $("#myProgress").css("display","none")
    clearInterval(this.countdown);
  }
}