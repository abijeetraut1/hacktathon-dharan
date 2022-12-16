// const imageRecognition = document.getElementById("1");
// const speechToText = document.getElementById("2");

// imageRecognition.addEventListener("click", () => {});

// function getCookie(name) {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) {
//     return parts.pop().split(";").shift();
//   }
// }

// // let speakFunction = (message) => {
// //   var msg = new SpeechSynthesisUtterance();
// //   msg.text = message;
// //   window.speechSynthesis.speak(msg);
// // };

// // if (getCookie("userType") == "blind") {
// //    const  name = getCookie("name")
// //   window.onload = function (event) {
// //     speakFunction(
// //       "You are on the register page right now please say your name and phoneNumber for registration"
// //     );
// //     setTimeout(() => startRecognition(), 7000);
// //   };
// // }

// function startRecognition() {
//   if ("webkitSpeechRecognition" in window) {
//     var recognition = new webkitSpeechRecognition();

//     recognition.lang = "en-US";

//     recognition.start();

//     recognition.onstart = function () {
//       console.log("Speech recognition has started.");
//     };

//     recognition.onend = function () {
//       setTimeout(() => console.log("speech recognition stopped"), 10000);
//     };

//     recognition.onresult = function (event) {
//       console.log(event.results[0]);
//       var text = event.results[0][0].transcript;
//       console.log(text);
//       let data = { name: text };
//       //   document.cookie = `name=${text}`;
//       // fetch("/register", {
//       //   method: "POST",
//       //   headers: { "Content-Type": "application/json" },
//       //   body: JSON.stringify(data),
//       // }).then((res) => {
//       //   console.log("Request complete! response:", res);
//       //   speakFunction(
//       //     "You are registered sucesfully, welcome to the feature page please select the feature number"
//       //   );
//       //   window.location.replace("features");
//       // });

//       // axios.post("/register", { name: text }).then((res) => {
//       //   console.log(res);
//       // });
//       console.log("Recognized Text: " + text);
//     };
//   }
// }

const imageRecognition = document.getElementById("1");
const speechToText = document.getElementById("2");
// import axios from "axios";
// const axios = require("axios");

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  }
}
// let speakFunction = (message) => {
//   var msg = new SpeechSynthesisUtterance();
//   msg.text = message;
//   window.speechSynthesis.speak(msg);
// };

// if (getCookie("userType") == "blind") {
//   window.onload = function (event) {
//     speakFunction(
//       "You are on the register page right now please say your name and phoneNumber for registration"
//     );
// };
// }

// window.onload = function () {
//   startRecognition();
// };
window.onload = function () {
  setTimeout(() => startRecognition(), 2000);
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
      setTimeout(() => console.log("speech recognition stopped"), 1000);
    };

    recognition.onresult = function (event) {
      console.log(event.results[0]);
      var text = event.results[0][0].transcript;
      if (text == 1) {
        window.location.replace("imageRecognition");
      }
      //   elseif (text == 2) {

      //   }

      //   let data = { name: text };
      //   document.cookie = `name=${text}`;
      //   fetch("/register", {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify(data),
      //   }).then((res) => {
      //     console.log("Request complete! response:", res);
      //     speakFunction(
      //       `You are registered sucesfully, welcome to the feature page ${text} please select the feature number`
      //     );
      //     window.location.replace("features");
      //   });

      // axios.post("/register", { name: text }).then((res) => {
      //   console.log(res);
      // });
      console.log("Recognized Text: " + text);
    };
  }
}
