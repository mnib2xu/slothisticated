// Game Enginge
// The Brain of the Game!
function MasterGame() {
  this.slothicles = 3;
  this.score = 0;
  this.level = 1;

  this.init = function() {
    $("#slothicles").text(this.slothicles)
    $("#score").text(this.score)
    this.level = 1;
  }

  this.start = function() {

  }

  this.timer = function() {

  }

  this.loadRandomGame = function() {

  }

  this.update = function() {
    $("#slothicles").text(this.slothicles)
    $("#score").text(this.score)
    if(this.slothicles < 0){
      alert("you are not slothisticated enough for this game!");
      this.slothicles = 3;
    }
  }

  this.timer = function(sec) {
    var timer = setInterval(function(){
      document.getElementById('time').innerHTML='00:'+sec;
      sec--;
      if (sec < 20) this.level = 2;
      if (sec < 10) this.level = 3;
      if (sec < 0) {
          clearInterval(timer);
          alert(myGame.score)
      }
    }.bind(this), 1000);

  }
}

// Game 1 
// Choose the right object
function Game1() {
  this.objects = [$("#object1"),$("#object2"),$("#object3"),$("#object4")]
  this.colorArray = ["orange", "lightblue", "lightgreen", "grey"];
  this.randomColor = "";
  this.questionType = "";
  this.master = new MasterGame();

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
    console.log("lvl: "  + this.master.level)
    if (this.master.level > 1){
      types.push("border")
    }
    if (this.master.level > 2){
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
    if (this.master.level > 1){
      // fill border color
      var borderColorArray = this.shuffleArray(this.colorArray);
      this.objects.forEach(function(element,index) {
        element.css("border", `${borderColorArray[index]} 10px solid`);
      });
    }
    if (this.master.level > 2){
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

// Game 2
// Answer the question correctly
function Game2() {
  this.questions = [];
  this.master = new MasterGame();
  this.using = new Game1();
  this.answer = 0;

  this.create = function() {
    $("#game2").css("display","flex");
    this.createQuestion();
    this.createAnswers();
  }

  this.createQuestion = function() {
    if (this.master.level === 1){
      var easyQuestions = [["1 + 3 = ?", 4], ["5 + 9 = ?", 14], ["4 + 5 = ?",9]];
      this.question = easyQuestions[Math.floor(Math.random()*easyQuestions.length)]
    }else if (this.master.level === 2){
      var middleQuestions = [["1 + 30 = ?", 31], ["45 + 9 = ?", 54], ["40 + 5 = ?"],45];
      this.question = middleQuestions[Math.floor(Math.random()*middleQuestions.length)]
    }else if (this.master.level === 3){
      var hardQuestions = [["12 + 30 = ?",42], ["45 + 98 = ?", 143], ["40 + 55 = ?", 95]];
      this.question = hardQuestions[Math.floor(Math.random()*hardQuestions.length)]
    }
    $("#random-question").text(this.question[0]);
  }

  this.createAnswers = function(){
    var answers = [Math.floor(Math.random() * 100) + 1  , Math.floor(Math.random() * 100) + 1  , this.question[1]];
    answers = this.using.shuffleArray(answers);
    for (var i = 1; i < answers.length+1; i++){
      $(`#answer${i}`).text(answers[i-1]);
    }
  }
  
  this.checkAnswer = function(answer) {
    return (parseInt(answer) === this.question[1])
  }

  this.remove = function() {
    $("#game2").css("display","none");
    $("#random-question").text("");
  }
}

$(document).ready(function () {

  // Master Game Engine
  var theGame = new MasterGame();
  $("#start-game").click(function(){
    theGame.init();
    theGame.timer(30);
  })

  // Game 1
  var myGame = new Game1();
  $("#start-game-1").click(function(event){
    myGame.create();
  })
  $("#stop-game-1").click(function(event){
    myGame.remove();
  })
  $(".object").click(function(event){
    var object = event.currentTarget;
    if (myGame.checkAnswer(object.textContent, object.style.backgroundColor ,object.style.borderColor)){
      theGame.score++;
    }else{
      theGame.slothicles -= 1;
    }
    theGame.update();
    myGame.create();
  })

  let myGame2 = new Game2();
  
  $("#start-game-2").click(function(){
    myGame2.create();
  })

  $("#stop-game-2").click(function(){
    myGame2.remove();
  })

  $(".answer").click(function(){
    if (myGame2.checkAnswer(event.currentTarget.textContent)){
      theGame.score++;
    }else{
      theGame.slothicles -= 1;

    }
    myGame2.create();
    theGame.update();
  })

  // Ende Gelände
  theGame.update();
})



/*

/*
// Game 3
// Answer the question correctly
function Game3() {
  this.question = "2 + 7 = ?";
  this.answer = 9;

  this.create = function() {
    $("#random-question").text(this.question);
  }
}

$(document).ready(function () {
  $("#start-game-3").click(function(event){
    let myGame2 = new Game2();
    myGame2.create();
  })
})
*/
  /*
  var frontend = '<div id="game1" class="objects"><div class="object" id="object1"><span class="text" id="text1"></span></div><div class="object" id="object2"><span class="text" id="text2"></span></div><div class="object" id="object3"><span class="text" id="text3"></span></div><div class="object" id="object4"><span class="text" id="text4"></span></div></div>'
  $("#game-arena").append(frontend);
  */