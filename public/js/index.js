const cameraContainer = document.querySelector('.camera-container')

const openCamera = document.querySelector('.open-camera');
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
// load the object detection model
const imageRecognigation = async () => {
    const model = await tf.loadLayersModel('model.json');

    // load the image to be analyzed
    const imgElement = document.getElementById('image');
    const img = tf.browser.fromPixels(imgElement);

    // run the object detection model on the image
    const detections = await model.predict(img);

    // interpret the model's output to identify and locate the objects in the image
    const objects = [];
    for (let i = 0; i < detections.length; i++) {
        // extract the class and bounding box of the i-th detected object
        const classId = detections[i][0];
        const x = detections[i][1];
        const y = detections[i][2];
        const width = detections[i][3];
        const height = detections[i][4];

        // add the detected object to the list of objects
        objects.push({
            classId,
            x,
            y,
            width,
            height
        });
    }

    // visualize the detected objects in the image
    drawBoundingBoxes(objects);

}

imageRecognigation();