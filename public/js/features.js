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

if (getCookie("userType") == "blind") {
  window.onload = function (event) {
    speakFunction(
      "You are on the feature page right now for image recognition say image, speectToText say speech and for map say map"
    );
    setTimeout(() => startRecognition(), 2000);
  };
}

window.onload = function () {
  startRecognition();
};

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
      // window.addEventListener("dblClick", () => {

      // })
      if (text == "image") {
        window.location.replace("imageRecognition");
      } else if (text == "hello") {
        window.location.replace("speechToText");
      } else if (text == "map") {
        window.location.replace("sendMyLocation");
      } else {
        window.location.replace("features");
      }
      let data = { name: text };

      // axios.post("/register", { name: text }).then((res) => {
      //   console.log(res);
      // });
      console.log("Recognized Text: " + text);
    };
  }
}
