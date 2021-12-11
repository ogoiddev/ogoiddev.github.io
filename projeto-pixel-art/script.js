// Função configurada por ter configurado o link do <script> no <head> do HTML. Refencia dos exercicios;

const listOfColors = document.querySelectorAll('.color');

function colorX(event) {
  const alvo = event;
  const beforeSelected = document.querySelector('.selected');
  beforeSelected.classList.remove('selected');
  alvo.target.classList.add('selected');
}
for (let index = 0; index < listOfColors.length; index += 1) {
  listOfColors[index].addEventListener('click', colorX);
}
document.getElementById('eraser').addEventListener('click', colorX);

function letsPaint() {
  function pixelToPaint(event) {
    const toPrint = event;
    const color = document.querySelector('.selected');
    toPrint.target.style.backgroundColor = getComputedStyle(color).backgroundColor;
  }
  const listOfPixels = document.querySelectorAll('.pixel');
  for (let index = 0; index < listOfPixels.length; index += 1) {
    listOfPixels[index].addEventListener('click', pixelToPaint);
  }
  // document.location.reload(true); Método para recarregar página
  function clearBoard() {
    for (let index = 0; index < listOfPixels.length; index += 1) {
      const color = document.getElementById('eraser');
      listOfPixels[index].style.backgroundColor = getComputedStyle(color).backgroundColor;
    }
  }
  const buttonToClear = document.getElementById('clear-board');
  buttonToClear.addEventListener('click', clearBoard);
}

const inputElement = document.querySelector('#board-size');
let userChoice = inputElement.valueAsNumber;
// const tagBaseDefalt = document.querySelector('.pixel');
// construção de lógica para deletar board e criar uma nova elaborada com o auxilio do Daniel em mentorias;
function amountOfpixel(numbBaseOfLine) {
  const containerBase = document.querySelector('#pixel-board');
  const addDiv = document.createElement('div');
  containerBase.appendChild(addDiv);
  const addPixel1 = document.createElement('div');
  addPixel1.classList.add('pixel');
  const containerTagBase = document.querySelector('#pixel-board div');
  containerTagBase.appendChild(addPixel1);
  for (let index = 1; index < numbBaseOfLine; index += 1) {
    const addPixel = document.createElement('div');
    addPixel.classList.add('pixel');
    containerTagBase.appendChild(addPixel);
  }
  for (let index = 1; index < numbBaseOfLine; index += 1) {
    const cloneLine = containerTagBase.cloneNode(true);
    containerBase.appendChild(cloneLine);
  }
  letsPaint();
}

amountOfpixel(5);

function checkValuesOf(choiceX) {
  if (choiceX < 5 && choiceX > 0) {
    userChoice = 5;
  } if (choiceX > 50) {
    userChoice = 50;
  }
  return userChoice;
}

function changed() {
  userChoice = inputElement.valueAsNumber;
  if (userChoice < 1 || inputElement.value === '') {
    return alert('Board inválido!');
  }
  checkValuesOf(userChoice);
  document.querySelector('#pixel-board').innerHTML = '';
  amountOfpixel(userChoice);
}
const buttonListener = document.querySelector('#generate-board');
buttonListener.addEventListener('click', changed);

function changeColorOptions() {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);

  return 'rgb(' + [r,g,b].join(',') + ')';
}
const ramdomColor = document.querySelectorAll('#color-palette div');
ramdomColor[1].style.backgroundColor = changeColorOptions();
ramdomColor[2].style.backgroundColor = changeColorOptions();
ramdomColor[3].style.backgroundColor = changeColorOptions();
