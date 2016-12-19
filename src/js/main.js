require("./lib/social"); //Do not delete
var closest = require("./lib/closest");

function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

var N = questionsData.length;
var Nlist = Array.apply(null, {length: N}).map(Number.call, Number);
var Gradinglist = new Array(N);
Gradinglist = Gradinglist.fill(-1);

Nlist.forEach(function(nn){
  document.getElementById("answer-box-"+nn).addEventListener("click", function(e) {
    var item = closest(e.target, (".answer"));
    if (!item) return;
    if ( Gradinglist[nn] == -1 ){ // this is the "if statement" that doesn't let you re-check answers
      $(".answer"+nn).removeClass("active");
      item.className += " active";
      if (hasClass(item,"x")) {
        document.querySelector("#result"+nn).innerHTML = "<i class='fa fa-check-circle-o' aria-hidden='true'></i> That's right! "+ questionsData[nn]["answer"];
        Gradinglist[nn] = 1;
      } else {
        document.querySelector("#result"+nn).innerHTML = "<i class='fa fa-times-circle-o' aria-hidden='true'></i> Wrong! "+ questionsData[nn]["answer"];
        Gradinglist[nn] = 0;
      }
    }
  });
});

document.getElementById("grade-check").addEventListener("click",function(){
  console.log("checking result");
  console.log(Gradinglist.indexOf(-1));
  if (Gradinglist.indexOf(-1) > -1){
    document.querySelector("#grade").innerHTML = "<div class='grade small'>You missed a question! Finish filling out the quiz and check back!</div>";
  } else {
    var sum = Gradinglist.reduce(function(a, b) { return a + b; }, 0);
    console.log(sum);
    var html_str = "<div class='grade'>You got "+sum+" / "+N+"!</div>";
    gradeData.forEach(function(g){
      console.log(g);
      if ((sum <= g["max"]) && (sum > g["min"])) {
        html_str +="<div class='grade-commentary'>"+g["answer"]+"</div>";
      }
    })
    document.querySelector("#grade").innerHTML = html_str;
  }

});
