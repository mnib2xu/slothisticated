// Game 2
// Answer the question correctly
function Game2() {
  this.questions = [];
  this.brain = new MasterGame();
  this.using = new Game1();
  this.answer = 0;

  this.create = function() {
    $("#game2").css("display","flex");
    this.createQuestion();
    this.createAnswers();
  }

  this.createQuestion = function() {
    if (this.brain.level === 1){
      var easyQuestions = [["1 + 3 = ?", 4], ["5 + 9 = ?", 14], ["4 + 5 = ?",9]];
      this.question = easyQuestions[Math.floor(Math.random()*easyQuestions.length)]
    }else if (this.brain.level === 2){
      var middleQuestions = [["1 + 30 = ?", 31], ["45 + 9 = ?", 54], ["40 + 5 = ?"],45];
      this.question = middleQuestions[Math.floor(Math.random()*middleQuestions.length)]
    }else if (this.brain.level === 3){
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
