// Game 1 
// Choose the right object
$(document).ready(function () {
  var object1 = $("#object1");
  var object2 = $("#object2");
  var object3 = $("#object3");
  var object4 = $("#object4");

  function getRandomColor() {
    var colorArray = ["orange", "lightblue", "lightgreen", "grey"];
    let counter = colorArray.length;
    while (counter > 0) {
      let index = Math.floor(Math.random() * counter);
      counter--;
      let temp = colorArray[counter];
      colorArray[counter] = colorArray[index];
      colorArray[index] = temp;
    }
    return colorArray;
  }

  // change content
  var randomTextColor = getRandomColor();
  object1.text(randomTextColor[0]);
  object2.text(randomTextColor[1]);
  object3.text(randomTextColor[2]);
  object4.text(randomTextColor[3]);

  // change the color of the background
  var randomBackgroundColor = getRandomColor();
  object1.css("background-color",randomBackgroundColor[0]);
  object2.css("background-color",randomBackgroundColor[1]);
  object3.css("background-color",randomBackgroundColor[2]);
  object4.css("background-color",randomBackgroundColor[3]);

  // change the color of the border
  var randomBorderColor = getRandomColor();
  object1.css("border-color",randomBorderColor[0]);
  object2.css("border-color",randomBorderColor[1]);
  object3.css("border-color",randomBorderColor[2]);
  object4.css("border-color",randomBorderColor[3]);


  // Display random Question
  var randomQuestionColor = randomTextColor[Math.floor(Math.random()*randomTextColor.length)];
  var questionText = "Click the circle called " + randomQuestionColor;
  var questionCircle = "Click the " + randomQuestionColor + " circle";
  var questionBorder = "Click the circle with the " + randomQuestionColor + " border"
  var randomizer = [[questionText,"text"],[questionCircle,"circle"],[questionBorder,"border"]];
  var randomQuestion = randomizer[Math.floor(Math.random()*randomizer.length)];
  $("#random-question").text(randomQuestion[0]);

  $(".object").click(function(event){
    var object = event.currentTarget;
    var text = object.textContent;
    var bgColor = object.style.backgroundColor;
    var borderColor = object.style.borderColor;
    if ((randomQuestion[1] === "text") && (text === randomQuestionColor)){
      alert("fuck yeah")
    }else if ((randomQuestion[1] === "circle") && (bgColor === randomQuestionColor)){
      alert("fuck yeah")
    }else if ((randomQuestion[1] === "border") && (borderColor === randomQuestionColor)){
      alert("fuck yeah")
    }else{
    }
    })


})