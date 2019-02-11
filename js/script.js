// Game 1 
// Choose the right object
function Game() {
  this.objects = [$("#object1"),$("#object2"),$("#object3"),$("#object4")]
  this.colorArray = ["orange", "lightblue", "lightgreen", "grey"];
  this.randomColor = "";
  this.questionType = "";
  this.slothicles = 3;
  this.score = 0;
  this.level = 3;

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
    var types = ["bg"];
    if (this.level > 1){
      types.push("border")
    }
    if (this.level > 2){
      types.push("text")
    }
    this.questionType = this.getRandomItem(types)
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
    
    // fill background color
    var backgroundColorArray = this.shuffleArray(this.colorArray);
    this.objects.forEach(function(element,index) {
      element.css("background-color",backgroundColorArray[index]);
    });
    if (this.level > 1){
      // fill border color
      var borderColorArray = this.shuffleArray(this.colorArray);
      this.objects.forEach(function(element,index) {
        element.css("border", `${borderColorArray[index]} 10px solid`);
      });
    }
    if (this.level > 2){
      // fill text
      var textColorArray = this.shuffleArray(this.colorArray);
      this.objects.forEach(function(element,index) {
        element.text(textColorArray[index]);
      });
    }
   
    $("#slothicles").text(this.slothicles)
    $("#score").text(this.score)
    this.createQuestion();
    this.timer(30);
  }

  this.timer = function(sec) {
    var timer = setInterval(function(){
        document.getElementById('time').innerHTML='00:'+sec;
        sec--;
        if (sec < 0) {
            clearInterval(timer);
            alert(myGame.score)
        }
    }, 1000);
  }

  this.checkAnswer = function(text, bg, border) {
    switch (this.questionType) {
      case "text":
        return (text === this.randomColor)
      case "bg":
        return (bg === this.randomColor)
      case "border":
        return (border === this.randomColor)
      default:
        break;
    }
  }
}

$(document).ready(function () {
  let myGame = new Game();

  $("#start-game").click(function(event){
    myGame.create();
  })

  $(".object").click(function(event){
    var object = event.currentTarget;
    if (myGame.checkAnswer(object.textContent, object.style.backgroundColor ,object.style.borderColor)){
      myGame.score++;
    }else{
      myGame.slothicles -= 1;
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