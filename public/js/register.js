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
    console.log("hello");
    speakFunction(
      "You are on the register page right now please say your name for registration"
    );
    setTimeout(() => startRecognition(), 7000);
  };
}

// window.onload = function () {
//   startRecognition();
// };

function startRecognition() {
  if ("webkitSpeechRecognition" in window) {
    var recognition = new webkitSpeechRecognition();

    recognition.lang = "en-US";

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
      // if (!text) {
      //   document.reload();
      //   speakFunction("Please say your name again");
      //   setTimeout(() => startRecognition(), 2000);
      // }

      let data = { name: text };
      document.cookie = `name=${text}`;
      fetch("/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((res) => {
        console.log("Request complete! response:", res);
        speakFunction(
          `You are registered sucesfully, welcome to the feature page ${text}`
        );

        if (getCookie("userType") === "blind")
          window.location.replace("features");
        else window.location.replace("dumbfeature");
      });

      // axios.post("/register", { name: text }).then((res) => {
      //   console.log(res);
      // });
      console.log("Recognized Text: " + text);
    };
  }
}
