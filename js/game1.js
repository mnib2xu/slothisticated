// Game 1 
// Choose the right object
class Game1 extends MasterGame{

  constructor(score, slothicles){
    super(score, slothicles);
    this.lightGreen = 
    this.objects = [$("#object1"),$("#object2"),$("#object3"),$("#object4")]
    this.colorArray = ["#D49CA8", "#5634AA", "#679AA8", "#D9E1BE"];
    this.randomColor = "";
    this.questionType = "";
  }

  createQuestion() {
    this.randomColor = this.getRandomItem(this.colorArray);
    var types = ["bg"];
    if (this.level > 1){
      types.push("border")
    }
    if (this.level > 2){
      types.push("text")
    }
    if (this.level > 3){
      types.pop();
      types.push("innerCircle")
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
      case "innerCircle":
        var question = `Click the inner ${this.randomColor} circle`
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
        element.children("span").text(textColorArray[index]);
        element.children("div").css("display","none");
      });
    }
    if (this.level > 3){
      // fill text
      var innerCircleColorArray = this.shuffleArray(this.colorArray);
      this.objects.forEach(function(element,index) {
        element.children("span").text("");
        element.children("div").css("display","block");
        element.children("div").css("background-color",innerCircleColorArray[index]);
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