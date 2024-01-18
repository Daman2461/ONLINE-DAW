
document.addEventListener("DOMContentLoaded", function () {
  const keys = document.querySelectorAll(".key"),
    note = document.querySelector(".nowplaying"),
    hints = document.querySelectorAll(".hints"),
    startButton = document.getElementById("startButton"),
    stopButton = document.getElementById("stopButton"),
    playSavedButton = document.getElementById("playSavedButton"),
    speedInput = document.getElementById("speedInput");

  let savedSounds = [];
  let isRecording = false;
  let isPlaying = false;

  function playNote(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`),
      key = document.querySelector(`.key[data-key="${e.keyCode}"]`);

    if (!key) return;

    const keyNote = key.getAttribute("data-note");

    key.classList.add("playing");
    note.innerHTML = keyNote;
    audio.currentTime = 0;

    // Check if the audio is already playing
    if (audio.paused) {
      audio.playbackRate = parseFloat(speedInput.value) || 1; // Set the playback rate from the input
      audio.play();
    }

    if (isRecording) {
      recordSound(audio.src);
    }
  }

  function removeTransition(e) {
    if (e.propertyName !== "transform") return;
    this.classList.remove("playing");
  }

  function hintsOn(e, index) {
    e.setAttribute("style", "transition-delay:" + index * 50 + "ms");
  }

  function recordSound(soundFile) {
    savedSounds.push({ sound: soundFile, timestamp: Date.now() });
  }

  function clearSounds() {
    savedSounds = [];
  }

  hints.forEach(hintsOn);

  keys.forEach((key) => key.addEventListener("transitionend", removeTransition));
  window.addEventListener("keydown", playNote);

  startButton.addEventListener("click", function () {
    clearSounds();
    isRecording = true;
    isPlaying = false;
  });

  stopButton.addEventListener("click", function () {
    isRecording = false;
    isPlaying = false;
  });

  playSavedButton.addEventListener("click", function () {
    playSavedSounds();
  });

  async function playSavedSounds() {
    if (savedSounds.length === 0) {
      console.log("No saved sounds to play.");
      return;
    }

    isPlaying = true;

    for (let index = 0; index < savedSounds.length; index++) {
      await playWithDelay(
        savedSounds[index].sound,
        index === 0 ? 0 : savedSounds[index].timestamp - savedSounds[index - 1].timestamp
      );
    }

    isPlaying = false;
  }

  function playWithDelay(soundFile, delay) {
    return new Promise((resolve) => {
      setTimeout(() => {
        playSound(soundFile);
        resolve();
      }, delay);
    });
  }

  function playSound(soundFile) {
    return new Promise((resolve) => {
      const audio = new Audio(soundFile);
      audio.playbackRate = parseFloat(speedInput.value) || 1; // Set the playback rate from the input
      audio.addEventListener("ended", () => resolve());
      audio.play();
    });
  }
});
