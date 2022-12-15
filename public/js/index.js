const speak = document.querySelector('.button');
const text = document.querySelector('.textbox');

let speakOnClick =  ( message) => {
    var msg = new SpeechSynthesisUtterance();
    msg.text = message;
    window.speechSynthesis.speak(msg);
}

speak.addEventListener('click', (el) => {
    speakOnClick(text.value)
});

// CLICK TO OPEN CAMERA
