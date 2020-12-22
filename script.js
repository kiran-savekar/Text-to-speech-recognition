function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

const msgEl = document.getElementById('msg');

const randomNum = getRandomNumber();

console.log('Number:', randomNum);

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

// Start recognition and game
recognition.start();

// Capture user speak
function onSpeak(e) {
  const msg = e.results[0][0].transcript;

  writeMessage(msg);
  checkNumber(msg);
}

// Write what user speaks
function writeMessage(msg) {
  msgEl.innerHTML = `
    <div>You said: </div>
    <span class="box">${msg}</span>
  `;
}

// Check msg against number
function checkNumber(msg) {
  const num = +msg;

  // Check if valid number
  if (Number.isNaN(num)) {
    msgEl.innerHTML += '<div>That is not a valid number</div>';
    return;
  }

  // Check in range
  if (num > 1000000 ) {
    msgEl.innerHTML += '<div>Number must be between 1 and 99,999</div>';
    return;
  }
  // check if number is equal to 1
  if (num === 1) {
      msgEl.innerHTML += '<div>1 is neither prime nor composite number.</div>';
    return;
  }

  // check if number is greater than 1
  else if (num > 1) {
       
      // looping through 2 to number-1
      let isPrime = true;
      for (let i = 2; i < num; i++) {
          if (num % i == 0) {
              isPrime = false;
              break;
          }
      }

      if (isPrime) {
          msgEl.innerHTML += '<div>It is prime.</div>';
    return;
      } else {
          msgEl.innerHTML += '<div>It is not prime.</div>';
    return;
      }
  }

  
}

	


// Speak result
recognition.addEventListener('result', onSpeak);

// End SR service
recognition.addEventListener('end', () => recognition.start());

document.body.addEventListener('click', e => {
  if (e.target.id == 'play-again') {
    window.location.reload();
  }
});
