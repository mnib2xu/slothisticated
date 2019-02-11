// Game 1 
// Choose the right object
class Game1 extends MasterGame{

  constructor(){
    super();
    this.objects = [$("#object1"),$("#object2"),$("#object3"),$("#object4")]
    this.colorArray = ["orange", "lightblue", "lightgreen", "grey"];
    this.randomColor = "";
    this.questionType = "";
  }

  createQuestion() {
    this.randomColor = this.getRandomItem(this.colorArray);
    var types = ["bg"];
    debugger
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

  create() {
    $("#game1").css("display","flex");
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
    this.createQuestion();
  }
  remove(){
    $("#game1").css("display","none");
    $("#random-question").text("");
  }
  checkAnswer(text, bg, border) {
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
