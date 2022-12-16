const imageRecognition = document.getElementById("1");
const speechToText = document.getElementById("2");

imageRecognition.addEventListener("click", () => {});

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

      let data = { name: text };
      document.cookie = `name=${text}`;
      // fetch("/register", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(data),
      // }).then((res) => {
      //   console.log("Request complete! response:", res);
      //   speakFunction(
      //     "You are registered sucesfully, welcome to the feature page please select the feature number"
      //   );
      //   window.location.replace("features");
      // });

      // axios.post("/register", { name: text }).then((res) => {
      //   console.log(res);
      // });
      console.log("Recognized Text: " + text);
    };
  }
}
