const speak = document.querySelector(".button");
const text = document.querySelector(".textbox");

let speakOnClick = (message) => {
  var msg = new SpeechSynthesisUtterance();
  msg.text = "IF YOU ARE BLIND PRESS THE SCREEN THREE TIMES";
  window.speechSynthesis.speak(msg);
};

// window.onbeforeunload = function () {
//   speakOnClick();
// };
// // speak.addEventListener("click", (el) => {
// //   speakOnClick(text.value);
// // });

// // Check if the browser supports the Web Speech API

// // Add a startRecognition function to the onclick event of a button
// speak.onclick = function () {
//   startRecognition();
// };

// function startRecognition() {
//   if ("webkitSpeechRecognition" in window) {
//     var recognition = new webkitSpeechRecognition();

//     recognition.lang = "en-US";

//     recognition.start();

//     recognition.onstart = function () {
//       console.log("Speech recognition has started.");
//     };

//     recognition.onend = function () {
//       console.log("Speech recognition has ended.");
//     };

//     recognition.onresult = function (event) {
//       var text = event.results[0][0].transcript;

//       console.log("Recognized Text: " + text);
//     };
//   }
// }

// // CLICK TO OPEN CAMERA

// const model = async () => {
//   return await mobilenet.load();
// };
// const video = document.getElementById("video");

// video.addEventListener("play", () => {
//   const predictions = model.classify(video);
//   console.log(predictions);
// });

// let camera_button = document.querySelector("#start-camera");
// let video = document.querySelector("#video");
// let click_button = document.querySelector("#click-photo");
// let canvas = document.querySelector("#canvas");

// camera_button.addEventListener("click", async function () {
//   let stream = await navigator.mediaDevices.getUserMedia({
//     video: true,
//     audio: false,
//   });
//   video.srcObject = stream;
// });

window.onbeforeunload = function () {
  speakOnClick();
};
// speak.addEventListener("click", (el) => {
//   speakOnClick(text.value);
// });

// Load the TensorFlow.js library
// const tf = require("@tensorflow/tfjs");
import * as tf from "@tensorflow/tfjs";

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
