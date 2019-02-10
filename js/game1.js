// Game 1 
// Choose the right object
function Game1() {
  this.objects = [$("#object1"),$("#object2"),$("#object3"),$("#object4")]
  this.colorArray = ["orange", "lightblue", "lightgreen", "grey"];
  this.randomColor = "";
  this.questionType = "";
  this.brain = new MasterGame();

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
    if (this.brain.level > 1){
      types.push("border")
    }
    if (this.brain.level > 2){
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
    $("#game1").css("display","flex");
    // fill background color
    var backgroundColorArray = this.shuffleArray(this.colorArray);
    this.objects.forEach(function(element,index) {
      element.css("background-color",backgroundColorArray[index]);
    });
    if (this.brain.level > 1){
      // fill border color
      var borderColorArray = this.shuffleArray(this.colorArray);
      this.objects.forEach(function(element,index) {
        element.css("border", `${borderColorArray[index]} 10px solid`);
      });
    }
    if (this.brain.level > 2){
      // fill text
      var textColorArray = this.shuffleArray(this.colorArray);
      this.objects.forEach(function(element,index) {
        element.text(textColorArray[index]);
      });
    }
    this.createQuestion();
  }
    this.remove = function(){
      $("#game1").css("display","none");
      $("#random-question").text("");
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
