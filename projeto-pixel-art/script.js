const colorPalette = document.getElementById('color-palette');
const pixelBoard = document.getElementById('pixel-board');
const pixelLine = document.getElementById('pixel-line');
const pixels = document.getElementsByClassName('pixel');
const buttonClear = document.getElementById('clear-board');
const buttonVQV = document.getElementById('generate-board');
const inputN = document.getElementById('board-size');
const inputNP = document.getElementById('palette-size');

const tagFactory = (tagType, classX) => {
  const newTag = document.createElement(tagType);
  newTag.classList.add(classX);
  return newTag;
};

const eventFactory = (element, eventType, functionX) => {
  element.addEventListener(eventType, functionX);
};

const ramdomColor = () => {
  let colorX = 'rgb(*, *, *)';
  for (let i = 1; i <= 3; i += 1) {
    colorX = colorX.replace('*', Math.random() * 255);
  }
  return colorX;
};

const addColorToPixelPalette = () => {
  colorPalette.firstChild.style.backgroundColor = 'rgb(0, 0, 0)';
  colorPalette.firstChild.classList.add('selected');
  for (let i = 1; i < colorPalette.children.length; i += 1) {
    colorPalette.children[i].style.backgroundColor = ramdomColor();
  }
};

const createColorPalette = (amount) => {
  for (let i = 1; i <= amount; i += 1) {
    colorPalette.appendChild(tagFactory('div', 'color'));
  }
  addColorToPixelPalette();
};

const setPixelsToWhiteColor = () => {
  for (let i = 0; i < pixels.length; i += 1) {
    pixels[i].style.backgroundColor = 'white';
  }
};

const createPixelBoard = (amount) => {
  pixelBoard.innerHTML = '';
  pixelLine.innerHTML = '';
  for (let i = 0; i < amount; i += 1) {
    pixelLine.appendChild(tagFactory('div', 'pixel'));
  }
  for (let index = 0; index < amount; index += 1) {
    pixelBoard.appendChild(pixelLine.cloneNode(true));
  }
  setPixelsToWhiteColor();
};

const removeSelectedClass = () => {
  for (let i = 0; i < colorPalette.children.length; i += 1) {
    colorPalette.children[i].classList.remove('selected');
  }
};

const colorSelectedFromPalette = (event) => {
  removeSelectedClass();
  if (event.target.classList.contains('color') === true) {
    event.target.classList.add('selected');
  }
};

const paintPixel = (event) => {
  const pixelToPaint = event.target;
  const colorSelected = document.querySelector('.selected');
  if (pixelToPaint.classList.contains('pixel') === true) {
    pixelToPaint.style.backgroundColor = colorSelected.style.backgroundColor;
  }
};

const checkInputValue = () => {
  if (inputN.value === '0' || inputN.value === '') {
    return alert('"Board inválido!"');
  }
  if (inputN.value < 5) {
    inputN.value = 5;
  }
  if (inputN.value > 50) {
    inputN.value = 50;
  }
  createPixelBoard(inputN.value);
};

let mouseIsDown = false;
eventFactory(colorPalette, 'click', colorSelectedFromPalette);
pixelBoard.addEventListener('mousedown', (event) => {
  mouseIsDown = true;
  paintPixel(event);
});
pixelBoard.addEventListener('mouseup', () => {
  mouseIsDown = false;
});
pixelBoard.addEventListener('mousemove', (event) => {
  if (mouseIsDown) {
    paintPixel(event);
  }
});

eventFactory(buttonClear, 'click', setPixelsToWhiteColor);
eventFactory(buttonVQV, 'click', checkInputValue);
eventFactory(inputNP, 'change', () => {
  colorPalette.innerHTML = '';
  createColorPalette(inputNP.value);
});

window.onload = () => {
  createColorPalette('4');
  createPixelBoard('5');
};
