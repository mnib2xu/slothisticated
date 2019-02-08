// Game 1 
// Choose the right object
$(document).ready(function () {
  var object1 = $("#object1");
  var object2 = $("#object2");
  var object3 = $("#object3");
  var object4 = $("#object4");

  function getRandomColor() {
    var colorArray = ["orange", "blue", "lightgreen", "grey"];
    return colorArray[Math.floor(Math.random()*colorArray.length)];
  }
  // change content
  object1.text(getRandomColor());
  object2.text(getRandomColor());
  object3.text(getRandomColor());
  object4.text(getRandomColor());

  // change the color of the background
  object1.css("background-color",getRandomColor());
  object2.css("background-color",getRandomColor());
  object3.css("background-color",getRandomColor());
  object4.css("background-color",getRandomColor());

  // change the color of the border
  object1.css("border-color",getRandomColor());
  object2.css("border-color",getRandomColor());
  object3.css("border-color",getRandomColor());
  object4.css("border-color",getRandomColor());


})