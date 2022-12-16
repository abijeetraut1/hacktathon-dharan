const userName = document.getElementById("userName");
const phone = document.getElementById("phone");
const submit = document.getElementById("submit");

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  }
}
let speakFunction = (message) => {
  var msg = new SpeechSynthesisUtterance();
  msg.text = message;
  window.speechSynthesis.speak(msg);
};

if (getCookie("userType") == "blind") {
  window.onbeforeunload = function (event) {
    if (window.location.pathname == "/register") {
      speakFunction(
        "You are on the register page right now please say your name at first for registration"
      );
    }
  };
}
