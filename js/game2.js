// Game 2
// Answer the question correctly
class Game2 extends MasterGame{

  constructor(score, slothicles) {
    super(score, slothicles);
    this.questions = [];
  }
  remove() {
    $("#game2").css("display","none");
    $("#random-question").text("");
  }
}
