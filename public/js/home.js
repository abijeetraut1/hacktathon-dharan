let speakOnClick = (message) => {
  var msg = new SpeechSynthesisUtterance();
  msg.text = "IF YOU ARE BLIND PRESS THE SCREEN THREE TIMES";
  window.speechSynthesis.speak(msg);
};

window.onbeforeunload = function () {
  speakOnClick("IF YOU ARE BLIND PRESS THE SCREEN THREE TIMES");
};

var b = document.getElementById("blind");
var deaf = document.getElementById("deaf");
var dump = document.getElementById("dump");
var submit = document.getElementById("submit");
var i = 0;
function submitform() {
  if (deaf.checked == 1) {
    // alert("hello i can't hear");
    document.cookie = "userType=deaf";
    window.location.replace("register");
    i = 0;
  } else if (dump.checked == 1) {
    document.cookie = "userType=dump";

    window.location.replace("register");
    i = 0;
  }
}
submit.addEventListener("click", function () {
  submitform();
});
window.addEventListener("click", () => {
  i++;
  console.log(i);
  if (i === 3) {
    document.cookie = "userType=blind";

    window.location.replace("register");
    i = 0;
  }
});
