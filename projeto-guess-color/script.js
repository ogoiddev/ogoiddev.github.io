function elementTarget(id) {
  return document.getElementById(id);
}

function newElement(tagName) {
  return document.createElement(tagName);
}

function newEvent(id, eventX, functionX) {
  const pai = elementTarget(id);
  pai.addEventListener(eventX, functionX);
}
function restartGuess() {
  window.location.reload();
}
newEvent('reset-game', 'click', restartGuess);

let premiredColor;
const msg = elementTarget('answer');
const premierePosition = Math.floor(Math.random() * 5);
let countScore = Number;

function scoreGame() {
  countScore += 3;
  localStorage.setItem('score', countScore);
  elementTarget('score').innerText = countScore;
}

function msgAlert(event) {
  const alvoColor = event;
  if (alvoColor.target.id !== 'colorsGuess') {
    if (alvoColor.target === premiredColor) {
      msg.innerText = 'Acertou!';
      scoreGame();
    } else {
      msg.innerText = 'Errou! Tente novamente!';
    }
  }
}

function createColor() {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  const color = `rgb(${r}, ${g}, ${b})`;
  return color;
}
function guessPanel() {
  for (let i = 0; i < 6; i += 1) {
    const ballColor = newElement('div');
    ballColor.className = 'ball';
    ballColor.style.backgroundColor = createColor();
    elementTarget('colorsGuess').appendChild(ballColor);
  }
}

function checkLocalStorage() {
  if (localStorage.getItem('score')) {
    elementTarget('score').innerText = JSON.parse(localStorage.getItem('score'));
  } else {
    elementTarget('score').innerText = 0;
  }
}

window.onload = function beginTheGame() {
  guessPanel();
  checkLocalStorage();
  const panelArray = document.querySelectorAll('.ball');
  const corBackgrounnd = panelArray[premierePosition].style.backgroundColor.replace('rgb', '');
  elementTarget('rgb-color').innerText = corBackgrounnd;
  premiredColor = panelArray[premierePosition];
  countScore = JSON.parse(localStorage.getItem('score'));
};

newEvent('colorsGuess', 'click', msgAlert);
