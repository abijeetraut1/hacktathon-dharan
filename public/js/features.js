const userName = document.getElementById("userName");
const phone = document.getElementById("phone");
const submit = document.getElementById("submit");
const photoClicker = document.getElementById("click-photo");
let click_button = document.querySelector("#click-photo");
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

window.onload = function (event) {
  const name = getCookie("name");
  speakFunction(
    `You are on the feature page right now ${name} for image recognition say image, speectToText say speech and for map say map`
  );
  setTimeout(() => startRecognition(), 10000);
};

window.addEventListener("dblclick", function () {
  var link = document.getElementById("featureLink");

  // add a click event handler to the link
  link.click();
});
// window.onload = function () {
//   startRecognition();
// };

// image recognication starts

let imageDetection = () => {
  console.log("running ");
  window.onload = function () {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    var img = document.getElementById("canvas");
    // var img = document.getElementById("imgage-display");
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    ctx.drawImage(img, 0, 0, 600, 600);
  };
  // const img = document.getElementById('imgage-displayimgage-display');
  const img = document.getElementById("canvas");
  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");
  cocoSsd.load().then((model) => {
    // detect objects in the image.
    model.detect(img).then((predictions) => {
      predictions.forEach(function (p) {
        ctx.beginPath();
        ctx.font = "bold 30px Arial";
        ctx.strokeStyle = "#000";
        ctx.rect(p.bbox[0], p.bbox[1], p.bbox[2], p.bbox[3]);
        ctx.strokeStyle = "#FFFF00";
        ctx.stroke();
        ctx.fillStyle = "#FFFF00";
        ctx.fillText(p.class, p.bbox[0], p.bbox[1]);
      });
      // speak function
      if (predictions.length === 1) {
        var msg = new SpeechSynthesisUtterance();
        msg.text = predictions[0].class;
        window.speechSynthesis.speak(msg);
      } else {
        predictions.forEach((el, i) => {
          console.log("speak fucntin ");
          var msg = new SpeechSynthesisUtterance();
          msg.text = predictions[i].class;
          window.speechSynthesis.speak(msg);
        });
      }
    });
  });
};
// image recognication ends

// window.onload = async () => {
//   let stream = await navigator.mediaDevices.getUserMedia({
//     video: true,
//     audio: false,
//   });
//   video.srcObject = stream;
//   photoClicker.style.display = "block";
// };
// click_button.addEventListener("click", async function () {
//   canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
//   let image_data_url = canvas.toDataURL("image/jpeg");
//   // data url of the image
//   imageURLhold = image_data_url;
//   sessionStorage.setItem("click_image", imageURLhold);
//   console.log(imageURLhold);
//   imageDetection();
//   const sendImage = await axios({
//     method: "POST",
//     url: `/getVoice`,
//     data: {
//       link: imageURLhold,
//     },
//   });
// });

if (window.location.pathname === "/imageRecognition") {
  window.onload = async () => {
    let stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });
    video.srcObject = stream;
    photoClicker.style.display = "block";
  };
  click_button.addEventListener("click", async function () {
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
    let image_data_url = canvas.toDataURL("image/jpeg");
    // data url of the image
    imageURLhold = image_data_url;
    sessionStorage.setItem("click_image", imageURLhold);
    console.log(imageURLhold);
    imageDetection();
  });
}

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
      console.log(event.results[0]);
      var text = event.results[0][0].transcript;
      console.log(text);
      // window.addEventListener("dblClick", () => {

      // })
      if (text == "image" || text.includes("image")) {
        window.location.replace("/imageRecognition");
        speakFunction(
          `You are on the image Recognition page right now ${name} for image recognition tap on screen`
        );
      } else if (text == "speech" || text.includes("speech")) {
        window.location.replace("/speechToText");
      } else if (text == "map" || text.includes("map")) {
        window.location.replace("/sendMyLocation");
      } else {
        window.location.replace("features");
      }
    };
  }
}
