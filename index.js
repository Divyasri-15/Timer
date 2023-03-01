const hoursInput = document.getElementById("hours");
const minutesInput = document.getElementById("minutes");
const secondsInput = document.getElementById("seconds");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");
const alarmSound = document.getElementById("alarm");

let timeInSeconds;
let intervalId;

// Set the initial state of the buttons
startBtn.disabled = false;
stopBtn.disabled = true;
resetBtn.disabled = false;

function startTimer() {
  timeInSeconds = (hoursInput.value * 3600) + (minutesInput.value * 60) + (secondsInput.value * 1);
  if (timeInSeconds > 0) {
    intervalId = setInterval(updateTimer, 1000);
    toggleInputs(true);
  }
}

function stopTimer() {
  clearInterval(intervalId);
  toggleInputs(false);
}

function resetTimer() {
  clearInterval(intervalId);
  toggleInputs(false);
  hoursInput.value = "";
  minutesInput.value = "";
  secondsInput.value = "";
}

function updateTimer() {
  timeInSeconds--;
  if (timeInSeconds < 0) {
    clearInterval(intervalId);
    toggleInputs(false);
    document.getElementById("myDialog").showModal();
    alarmSound.loop = true;
    alarmSound.play();
    let dialog = document.getElementById("myDialog");
    dialog.addEventListener("close", function() {
      alarmSound.pause();
    });
    return;
  }
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds - (hours * 3600)) / 60);
  const seconds = timeInSeconds - (hours * 3600) - (minutes * 60);
  hoursInput.value = padZero(hours);
  minutesInput.value = padZero(minutes);
  secondsInput.value = padZero(seconds);
}

function toggleInputs(disable) {
  hoursInput.disabled = disable;
  minutesInput.disabled = disable;
  secondsInput.disabled = disable;
  startBtn.disabled = disable;
  stopBtn.disabled = !disable;
  resetBtn.disabled = disable;
}

function padZero(num) {
  return num.toString().padStart(2, "0");
}

function closeDialog() {
  document.getElementById("myDialog").close();
}

startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);
