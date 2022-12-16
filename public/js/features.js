const userName = document.getElementById("userName");
const phone = document.getElementById("phone");
const submit = document.getElementById("submit");
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

if (getCookie("userType") == "blind") {
  window.onload = function (event) {
    speakFunction(
      "You are on the feature page right now please say your feature number"
    );
    setTimeout(() => startRecognition(), 2000);
  };
}

// window.onload = function () {
//   startRecognition();
// };

function startRecognition() {
  if ("webkitSpeechRecognition" in window) {
    var recognition = new webkitSpeechRecognition();

    recognition.lang = "en-English";

    recognition.start();

    recognition.onstart = function () {
      console.log("Speech recognition has started.");
    };

    recognition.onend = function () {
      setTimeout(() => console.log("speech recognition stopped"), 10000);
    };

    recognition.onresult = function (event) {
      console.log(event.results[0]);
      var text = event.results[0][0].transcript;
      console.log(text);
      if (text == "image") {
        window.location.replace("imageRecognition");
      } else if (text == "speech") {
        window.location.replace("speechToText");
      } else if (text == "map") {
        window.location.replace("sendMyLocation");
      } else {
        window.location.replace("imageRecognition");
      }
      let data = { name: text };

      // axios.post("/register", { name: text }).then((res) => {
      //   console.log(res);
      // });
      console.log("Recognized Text: " + text);
    };
  }
}
