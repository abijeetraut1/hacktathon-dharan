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
                msg.text = predictions[0].class;
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




// // video recognication
// const videoo = document.getElementById('webcam');
// const liveView = document.getElementById('liveView');
// const demosSection = document.getElementById('demos');
// const enableWebcamButton = document.getElementById('webcamButton');

// // Check if webcam access is supported.
// function getUserMediaSupported() {
//     return !!(navigator.mediaDevices &&
//         navigator.mediaDevices.getUserMedia);
// }

// // If webcam supported, add event listener to button for when user
// // wants to activate it to call enableCam function which we will 
// // define in the next step.
// if (getUserMediaSupported()) {
//     enableWebcamButton.addEventListener('click', enableCam);
// } else {
//     console.warn('getUserMedia() is not supported by your browser');
// }

// // Placeholder function for next step. Paste over this in the next step.
// function enableCam(event) {}

// // Enable the live webcam view and start classification.
// function enableCam(event) {
//     // Only continue if the COCO-SSD has finished loading.
//     if (!model) {
//         return;
//     }

//     // Hide the button once clicked.
//     event.target.classList.add('removed');

//     // getUsermedia parameters to force video but not audio.
//     const constraints = {
//         videoo: true
//     };

//     // Activate the webcam stream.
//     navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
//         videoo.srcObject = stream;
//         videoo.addEventListener('loadeddata', predictWebcam);
//     });
// }

// // Placeholder function for next step.
// function predictWebcam() {}

// // Pretend model has loaded so we can try out the webcam code.
// var model = true;
// demosSection.classList.remove('invisible');

// var children = [];

// // function predictWebcam() {
// //     // Now let's start classifying a frame in the stream.
// //     model.detect(videoo).then(function (predictions) {
// //         // Remove any highlighting we did previous frame.
// //         for (let i = 0; i < children.length; i++) {
// //             liveView.removeChild(children[i]);
// //         }
// //         children.splice(0);

// //         // Now lets loop through predictions and draw them to the live view if
// //         // they have a high confidence score.
// //         for (let n = 0; n < predictions.length; n++) {
// //             // If we are over 66% sure we are sure we classified it right, draw it!
// //             if (predictions[n].score > 0.66) {
// //                 const p = document.createElement('p');
// //                 p.innerText = predictions[n].class + ' - with ' +
// //                     Math.round(parseFloat(predictions[n].score) * 100) +
// //                     '% confidence.';
// //                 p.style = 'margin-left: ' + predictions[n].bbox[0] + 'px; margin-top: ' +
// //                     (predictions[n].bbox[1] - 10) + 'px; width: ' +
// //                     (predictions[n].bbox[2] - 10) + 'px; top: 0; left: 0;';

// //                 const highlighter = document.createElement('div');
// //                 highlighter.setAttribute('class', 'highlighter');
// //                 highlighter.style = 'left: ' + predictions[n].bbox[0] + 'px; top: ' +
// //                     predictions[n].bbox[1] + 'px; width: ' +
// //                     predictions[n].bbox[2] + 'px; height: ' +
// //                     predictions[n].bbox[3] + 'px;';

// //                 liveView.appendChild(highlighter);
// //                 liveView.appendChild(p);
// //                 children.push(highlighter);
// //                 children.push(p);
// //             }
// //         }

// //         // Call this function again to keep predicting when the browser is ready.
// //         window.requestAnimationFrame(predictWebcam);
// //     });
// // }



















// navigator.mediaDevices.getUserMedia({
//     video: true
// }).then(async function (stream) {
//     // 2. Display the video feed on the webpage
//     var video = document.getElementById("video");
//     video.srcObject = stream;

//     // 3. Load the TensorFlow.js library and the machine learning model
//     const model = await tf.loadLayersModel(modelpath);

//     // 4. Set up a function to run the object detection
//     function detectObjects() {
//         // 5. Continuously feed frames from the video feed to the model
//         model.predict(video).then(function (predictions) {
//             // 6. Handle the object detection results and display them on the webpage
//             // (e.g., overlay bounding boxes and labels)
//             // ...

//             // 7. Run the object detection function again at the specified frame rate
//             requestAnimationFrame(detectObjects);
//         });
//     }

//     // 8. Start the object detection
//     detectObjects();
// });

















