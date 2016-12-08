require("./lib/social"); //Do not delete
var closest = require("./lib/closest");

function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

var N = questionsData.length;
var Nlist = Array.apply(null, {length: N}).map(Number.call, Number);
Nlist.forEach(function(nn){
  document.getElementById("answer-box-"+nn).addEventListener("click", function(e) {
    var item = closest(e.target, (".answer"));
    if (!item) return;
    console.log(item);
    console.log(item.classList);
    console.log("#result"+nn);
    if (hasClass(item,"x")) {
      console.log("YES!");
      document.querySelector("#result"+nn).innerHTML = "You got it!";
    } else {
      document.querySelector("#result"+nn).innerHTML = "Try again!";
    }
  });
});
