// Game 2
// Answer the question correctly
class Game2 extends MasterGame{

  constructor(score, slothicles) {
    super(score, slothicles);
    this.questions = [];
    this.answer = 0;
  }

  create() {
    $("#game2").css("display","flex");
    this.createQuestion();
    this.createAnswers();
  }

  createQuestion() {
      var easyQuestions = [["1 + 3 = ?", 4], ["5 + 9 = ?", 14], ["4 + 5 = ?",9]];
      this.question = easyQuestions[Math.floor(Math.random()*easyQuestions.length)]
    if (this.level > 1){
      var middleQuestions = [["1 + 30 = ?", 31], ["45 + 9 = ?", 54], ["40 + 5 = ?"],45];
      this.question = middleQuestions[Math.floor(Math.random()*middleQuestions.length)]
    if (this.level > 2){
      var hardQuestions = [["12 + 30 = ?",42], ["45 + 98 = ?", 143], ["40 + 55 = ?", 95]];
      this.question = hardQuestions[Math.floor(Math.random()*hardQuestions.length)]
    }
    }
    $("#random-question").text(this.question[0]);
  }

  createAnswers(){
    var answers = [Math.floor(Math.random() * 100) + 1  , Math.floor(Math.random() * 100) + 1  , this.question[1]];
    answers = this.shuffleArray(answers);
    for (var i = 1; i < answers.length+1; i++){
      $(`#answer${i}`).text(answers[i-1]);
    }
  }
  
  checkAnswer(answer) {
    return (parseInt(answer) === this.question[1])
  }

  remove() {
    $("#game2").css("display","none");
    $("#random-question").text("");
  }
}
