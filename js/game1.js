// Game 1
// Choose the right object
class Game1 extends MasterGame{

  constructor(){
    super();
    this.objects = [$("#object1"),$("#object2"),$("#object3"),$("#object4")]
    this.colorArray = ["rgb(212, 156, 168)", "rgb(86, 52, 170)", "rgb(103, 154, 168)", "rgb(217, 225, 190)"];
    this.randomColor = "";
    this.questionType = "";
    this.countdown;
    this.countdownTime;
  }
  create() {
    $("#game1").css("display","flex");
    // fill background color
    var backgroundColorArray = this.shuffleArray(this.colorArray);
    this.objects.forEach(function(element,index) {
      element.css("background-color",backgroundColorArray[index]);
    });
    switch (this.level) {
      case 1:
        this.countdownTime = 30;
        break;
      case 2:
        this.countdownTime = 20;
        break;
      case 3:
        this.countdownTime = 30;
        break;
      case 4:
        this.countdownTime = 20;
        break;
      case 5:
        this.countdownTime = 30;
        break;
      case 6:
        this.countdownTime = 20;
        break;
      case 7:
        this.countdownTime = 20;
        break;
      case 8:
        this.countdownTime = 15;
        break;
      case 9:
        this.countdownTime = 10;
        break;
      default:
        this.countdownTime = 30;
        break;
    }
    if (this.level >= 3){
      // fill border color
      var borderColorArray = this.doNotRepeat([backgroundColorArray]);
      this.objects.forEach(function(element,index) {
        element.css("border", `${borderColorArray[index]} 10px solid`);
      });
    }
    if (this.level >= 5){
      // fill text
      var textColorArray = this.doNotRepeat([borderColorArray, backgroundColorArray]);
      this.objects.forEach(function(element,index) {
        element.children().children("div").css("display","block");
        element.children().children("span").text(this.rgbToText(textColorArray[index]));
        element.children().children("div").css("display","none");
      },this);
    }
    if (this.level >= 7){
      // fill text
      var innerCircleColorArray = this.doNotRepeat([backgroundColorArray, borderColorArray, textColorArray]);
      this.objects.forEach(function(element,index) {
        element.children().children("span").css("display","none");
        element.children().children("div").css("display","block");
        element.children().children("div").css("background-color",innerCircleColorArray[index]);
      });
    }
    this.createQuestion();
    this.startCountdown();
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
    }.bind(this), this.countdownTime);
  }

  stopCountdown() {
    $("#myProgress").css("display","none")
    clearInterval(this.countdown);
  }

  createQuestion() {
    this.randomColor = this.getRandomItem(this.colorArray);
    var types = ["bg"];
    if (this.level >= 3){
      types.push("border");
    }
    if (this.level >= 5){
      types.push("text");
    }
    if (this.level >= 7){
      types.pop();
      types.push("innerCircle");
    }
    this.questionType = this.getRandomItem(types)
    switch (this.questionType) {
      case "text":
        var question = `Click the circle called ${this.rgbToText(this.randomColor)}`
        break;
      case "bg":
        var question = `Click the ${this.rgbToText(this.randomColor)} circle`;
        break;
      case "border":
        var question = `Click the circle with the ${this.rgbToText(this.randomColor)} border`;
        break;
      case "innerCircle":
        var question = `Click the inner ${this.rgbToText(this.randomColor)} circle`
      default:
        break;
    }
    $("#random-question").text(question);
  }
  remove(){
    $("#game1").css("display","none");
    $("#random-question").text("");
  }
  checkAnswer(text, bg, border, innerCircle) {
    switch (this.questionType) {
      case "text":
        return (text === this.rgbToText(this.randomColor))
      case "bg":
        return (bg === this.randomColor)
      case "border":
        return (border === this.randomColor)
      case "innerCircle":
        return (innerCircle === this.randomColor)
      default:
        break;
    }
  }
  updateMaster(object){
    this.remove();
    if (this.checkAnswer(object.children[0].children[0].textContent, object.style.backgroundColor, object.style.borderColor, object.children[0].children[1].style.backgroundColor)) {
      this.stopCountdown();
      this.increaseScore("game1");
    }else{
      this.stopCountdown();
      this.decreaseLive("game1");
    }
    this.objects.forEach(function(element){
      element.css("border", "0px");
      element.css("background-color", "none");
      element.children().children("span").text("");
      element.children().children("div").css("display","none");
      element.children().children("div").css("background-color","none");
    })
  }
  // Fisher-Yates Shuffle
  shuffleArray(array) {
    var newArray = array.map((elem) => elem);
    let counter = newArray.length;
    while (counter > 0) {
      let index = Math.floor(Math.random() * counter);
      counter--;
      let temp = newArray[counter];
      newArray[counter] = newArray[index];
      newArray[index] = temp;
    }
    return newArray;
  }
  doNotRepeat(array) {
    var same = true;
    while (same) {
      var newColorArray = this.shuffleArray(this.colorArray);
      same = false;
      array.forEach(function(arrayElement){
        arrayElement.forEach(function(element,index){
          if (element === newColorArray[index]){
            same = true;
          }
        })
      })
    }
    return newColorArray;
  }
  rgbToText(rgb) {
    switch (rgb) {
      case "rgb(212, 156, 168)":
        return "pink";
      case "rgb(86, 52, 170)":
        return "purple";
      case "rgb(103, 154, 168)":
        return "blue";
      case "rgb(217, 225, 190)":
        return "white";
      default:
        return "color";
    }
  }
}