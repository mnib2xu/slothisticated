// Game 4
// Do not press the red Button!
class Game4 extends MasterGame {

  constructor(score, slothicles) {
    super(score, slothicles);

  }

  create() {
    switch (this.level) {
      case 1:
        this.amountOfRepeats = 2;
        break;
      case 2:
        this.amountOfRepeats = 3;
        break;
      case 3:
        this.amountOfRepeats = 4;
        break;
      case 4:
        this.amountOfRepeats = 5;
        break;
      default:
        this.amountOfRepeats = 2;
        break;
    }
    $("#game4").css("display", "flex");
  }

  remove() {
    $("#game4").css("display", "none");
    $("#random-question").text("");
  }

  startCountdown() {
    $("#myProgress").css("display","block")
    var elem = document.getElementById("myBar"); 
    var width = 100;
    this.countdown = setInterval(function(){
      if (width === 0) {
        this.remove();
        this.decreaseLive("game1");
        $("#myProgress").css("display","none")
        clearInterval(this.countdown);
      } else {
        width--; 
        elem.style.width = width + '%'; 
      }
    }.bind(this), 30);
  }

  stopCountdown() {
    $("#myProgress").css("display","none")
    clearInterval(this.countdown);
  }

}