// Game 1 
// Choose the right object
function Game() {
  this.object1 = $("#object1");
  this.object2 = $("#object2");
  this.object3 = $("#object3");
  this.object4 = $("#object4");
  this.colorArray = ["orange", "lightblue", "lightgreen", "grey"];
  this.randomColor = "";
  this.questionType = "";
  this.slothicles = 3;
  this.score = 0;

  // Fisher-Yates Shuffle
  this.shuffleArray = function(array) {
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

  this.getRandomItem = function(array){
    return array[Math.floor(Math.random()*array.length)];
  }

  this.createQuestion = function() {
    this.randomColor = this.getRandomItem(this.colorArray);
    this.questionType = this.getRandomItem(["text","bg","border"])
    switch (this.questionType) {
      case "text":
        var question = "Click the circle called " + this.randomColor;
        break;
      case "bg":
        var question = "Click the " + this.randomColor + " circle";
        break;
      case "border":
        var question = "Click the circle with the " + this.randomColor + " border";
        break;
      default:
        break;
    }
    $("#random-question").text(question);
  }

  this.create = function() {
    // fill text
    var textColorArray = this.shuffleArray(this.colorArray);
    this.object1.text(textColorArray[0]);
    this.object2.text(textColorArray[1]);
    this.object3.text(textColorArray[2]);
    this.object4.text(textColorArray[3]);

    // fill bg Color
    var backgroundColorArray = this.shuffleArray(this.colorArray);
    this.object1.css("background-color",backgroundColorArray[0]);
    this.object2.css("background-color",backgroundColorArray[1]);
    this.object3.css("background-color",backgroundColorArray[2]);
    this.object4.css("background-color",backgroundColorArray[3]);

    // fill border Color
    var borderColorArray = this.shuffleArray(this.colorArray);
    this.object1.css("border-color",borderColorArray[0]);
    this.object2.css("border-color",borderColorArray[1]);
    this.object3.css("border-color",borderColorArray[2]);
    this.object4.css("border-color",borderColorArray[3]);

    $("#slothicles").text(this.slothicles)
    $("#score").text(this.score)
    this.createQuestion();
  }

  this.checkAnswer = function(text, bg, border) {
    switch (this.questionType) {
      case "text":
        return (text === this.randomColor)
        break;
      case "bg":
        return (bg === this.randomColor)
        break;
      case "border":
        return (border === this.randomColor)
        break;
      default:
        break;
    }
  }
}

$(document).ready(function () {
  let myGame = new Game();

  function timer(){
    var sec = 30;
    var timer = setInterval(function(){
        document.getElementById('time').innerHTML='00:'+sec;
        sec--;
        if (sec < 0) {
            clearInterval(timer);
            alert(myGame.score)
        }
        console.log(sec)
        console.log(timer)
    }, 1000);
  }
  timer();

  myGame.create();

  $(".object").click(function(event){
    var object = event.currentTarget;
    if (!myGame.checkAnswer(object.textContent, object.style.backgroundColor ,object.style.borderColor)){
      myGame.slothicles -= 1;
    }else{
      myGame.score++;
    }
    $("#slothicles").text(myGame.slothicles)
    $("#score").text(myGame.score)
    if(myGame.slothicles < 0){
      alert("you are not slothisticated enough for this game!");
      myGame.slothicles = 3;
    } 
    myGame.create();
  })
})