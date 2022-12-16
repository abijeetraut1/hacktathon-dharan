const openCamera = document.querySelector('.open-camera');
const speak = document.querySelector(".button");

const text = document.querySelector(".textbox");

let speakFunction = (message) => {
    var msg = new SpeechSynthesisUtterance();
    msg.text = message;
    window.speechSynthesis.speak(msg);
};




// window.addEventListener("load", function () {
//   // Call your function here
//   speakOnClick();
// });

window.onbeforeunload = function () {
    //  UNCOMMENTED AFTER CERTAIN TIME
    // speakFunction('IF YOU ARE BLIND PRESS THE SCREEN THREE TIMES');
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

let deleteObject = () => {
    console.log('inside detect ')

    window.onload = function () {
        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");
        var img = document.getElementById("canvas");
        // var img = document.getElementById("imgage-display");
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
        ctx.drawImage(img, 0, 0, 600, 600);
        // ctx.drawImage(img, 0, 0, 600, 600);
    };
    // const img = document.getElementById('imgage-displayimgage-display');
    const img = document.getElementById('canvas');
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");

    // Load the model.
    cocoSsd.load().then(model => {
        console.log('predic', img)
        // detect objects in the image.
        model.detect(img).then(predictions => {
            predictions.forEach(function (p) {
                ctx.beginPath();
                ctx.font = "bold 30px Arial";
                ctx.strokeStyle = "#000";
                ctx.rect(p.bbox[0], p.bbox[1], p.bbox[2], p.bbox[3]);
                ctx.strokeStyle = "#FFFF00";
                ctx.stroke();
                ctx.fillStyle = "#FFFF00";
                ctx.fillText(p.class, (p.bbox[0]), p.bbox[1]);
            });

            // speak function
            if (predictions.length === 1) {
                var msg = new SpeechSynthesisUtterance();
                msg.text = predictions[i].class;
                window.speechSynthesis.speak(msg);
            } else {
                predictions.forEach((el, i) => {
                    console.log('speak fucntin ')
                    var msg = new SpeechSynthesisUtterance();
                    msg.text = predictions[i].class;
                    window.speechSynthesis.speak(msg);
                })
            }
        });
    });

}

// click to click photo starts
let camera_button = document.querySelector("#start-camera");
let video = document.querySelector("#video");
let click_button = document.querySelector("#click-photo");
let canvas = document.querySelector("#canvas");
let imageURLhold;

camera_button.addEventListener('click', async function () {
    let stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
    });
    video.srcObject = stream;
});

click_button.addEventListener('click', function () {
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    let image_data_url = canvas.toDataURL('image/jpeg');

    // data url of the image
    imageURLhold = image_data_url;
    sessionStorage.setItem('click_image', imageURLhold)
    console.log('imagehjd', imageURLhold);
    // console.log(image_data_url);
    deleteObject();

});

// click to click photo ends




// BELOW CODE COMMENTED FOR CERTAIN BIT OF TIME
// image recognication starts



// image recognication ends