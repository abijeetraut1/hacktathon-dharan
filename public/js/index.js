const speak = document.querySelector(".button");
const text = document.querySelector(".textbox");

let speakOnClick = (message) => {
  var msg = new SpeechSynthesisUtterance();
  msg.text = "IF YOU ARE BLIND PRESS THE SCREEN THREE TIMES";
  window.speechSynthesis.speak(msg);
};

// window.addEventListener("load", function () {
//   // Call your function here
//   speakOnClick();
// });

window.onbeforeunload = function () {
  speakOnClick();
};
// speak.addEventListener("click", (el) => {
//   speakOnClick(text.value);
// });

// Check if the browser supports the Web Speech API

// Add a startRecognition function to the onclick event of a button
speak.onclick = function () {
  startRecognition();
};

function startRecognition() {
  if ("webkitSpeechRecognition" in window) {
    var recognition = new webkitSpeechRecognition();

    recognition.lang = "en-US";

    recognition.start();

    recognition.onstart = function () {
      console.log("Speech recognition has started.");
    };

    recognition.onend = function () {
      console.log("Speech recognition has ended.");
    };

    recognition.onresult = function (event) {
      var text = event.results[0][0].transcript;

      console.log("Recognized Text: " + text);
    };
  }
}

// CLICK TO OPEN CAMERA
