var recordings = {
  recording1: [],
  recording2: [],
  recording3: [],
};

var currentRecording = null;
var isRecording = false;

// Store timestamp when recording starts
var recordingStartTime = 0;

// Detect button clicks
for (var i = 0; i < document.querySelectorAll(".drum").length; i++) {
  document.querySelectorAll(".drum")[i].addEventListener("click", function () {
    var buttonInnerHTML = this.innerHTML;
    makeSound(buttonInnerHTML);
    buttonanimation(buttonInnerHTML);
  });
}

// Detect keyboard presses
document.addEventListener("keypress", function (event) {
  makeSound(event.key);
  buttonanimation(event.key);
});

document.getElementById("recordBtn").addEventListener("click", function () {
  isRecording = !isRecording;
  this.innerText = isRecording ? "Stop Recording" : "Start Recording";
  if (isRecording) {
    currentRecording = [];
    recordingStartTime = Date.now();
  } else {
    saveRecording();
  }
});

document.getElementById("save1").addEventListener("click", function () {
  saveRecording(1);
});

document.getElementById("save2").addEventListener("click", function () {
  saveRecording(2);
});

document.getElementById("save3").addEventListener("click", function () {
  saveRecording(3);
});

document.getElementById("play1").addEventListener("click", function () {
  playRecording(recordings.recording1);
});

document.getElementById("play2").addEventListener("click", function () {
  playRecording(recordings.recording2);
});

document.getElementById("play3").addEventListener("click", function () {
  playRecording(recordings.recording3);
});

function saveRecording(index) {
  if (currentRecording) {
    recordings["recording" + index] = [...currentRecording];
  }
}

function playRecording(recordedSounds) {
  if (recordedSounds.length > 0) {
    var initialTimestamp = recordedSounds[0].timestamp;
    recordedSounds.forEach(function (sound) {
      var delay = sound.timestamp - initialTimestamp;
      setTimeout(function () {
        makeSound(sound.key);
      }, delay);
    });
  }
}


function makeSound(key) {
  switch (key) {
    case "w":
      var tom1 = new Audio("sounds/tom-1.mp3");
      tom1.play();
      break;

    case "a":
      var tom2 = new Audio("sounds/tom-2.mp3");
      tom2.play();
      break;

    case "s":
      var tom3 = new Audio("sounds/tom-3.mp3");
      tom3.play();
      break;

    case "d":
      var tom4 = new Audio("sounds/tom-4.mp3");
      tom4.play();
      break;

    case "j":
      var snare = new Audio("sounds/snare.mp3");
      snare.play();
      break;

    case "k":
      var crash = new Audio("sounds/crash.mp3");
      crash.play();
      break;

    case "l":
      var kick = new Audio("sounds/kick-bass.mp3");
      kick.play();
      break;

    default:
      console.log("Unhandled key:", key);
  }
  
  if (isRecording) {
    currentRecording.push({
      key: key,
      timestamp: Date.now(),
    });
  }
}

  
  if (isRecording) {
    currentRecording.push({
      key: key,
      timestamp: Date.now(),
    });
  }


function buttonanimation(currentkey) {
  document.querySelector("." + currentkey).classList.add("pressed");
  setTimeout(function () {
    document.querySelector("." + currentkey).classList.remove("pressed");
  }, 100);
}
