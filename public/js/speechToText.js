const heading = document.querySelector("#heading");
// import axios from "axios";
// const axios = require("axios");

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

// if (getCookie("userType") == "blind") {
//   window.onload = function (event) {
//     speakFunction(
//       "You are on the feature page right now please say your name and phoneNumber for registration"
//     );
//     setTimeout(() => startRecognition(), 2000);
//   };
// }

// window.onload = function () {
//   startRecognition();
// };

// document.getElementById("#recordButton").addEventListener("click", function () {
//   startRecognition();
// });
function startRecognition() {
  if ("webkitSpeechRecognition" in window) {
    var recognition = new webkitSpeechRecognition();

    recognition.lang = "en-GB";
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.start();

    recognition.onstart = function () {
      console.log("Speech recognition has started.");
    };

    recognition.onend = function () {
      setTimeout(() => console.log("speech recognition stopped"), 10000);
    };

    recognition.onresult = function (event) {
      //   console.log(event.results[0]);
      var text = event.results[0][0].transcript;
      console.log(text);
      document.getElementById("helloWorld").innerHTML = text;
      //   heading.innerHTML = text;
      //   let data = { name: text };

      // axios.post("/register", { name: text }).then((res) => {
      //   console.log(res);
      // });
      //   console.log("Recognized Text: " + text);
    };
  }
}
