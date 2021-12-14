const inputText = document.querySelector('#texto-tarefa');
const buttonAdd = document.querySelector('#criar-tarefa');
const listOf = document.querySelector('#lista-tarefas');

function addToList() {
  if (inputText.value === '') {
    alert('Por vavor, insira sua tarefa :) ');
    return;
  }
  const liElement = document.createElement('li');
  liElement.classList.add('todoOn');
  liElement.innerText = inputText.value;
  listOf.appendChild(liElement);
  inputText.value = '';
}
buttonAdd.addEventListener('click', addToList);
inputText.addEventListener('keydown', (wen) => {
  if (wen.key === 'Enter') {
    addToList();
  }
});

function clearBackground() {
  for (let index = 0; index < listOf.children.length; index += 1) {
    listOf.children[index].style.backgroundColor = '';
  }
}

const colorOfSelect = 'rgb(128, 128, 128)';
function selectedLi(event) {
  if (event.target.id !== 'lista-tarefas') {
    clearBackground();
    const colorOfBackground = event.target;
    colorOfBackground.style.backgroundColor = colorOfSelect;
  }
}
listOf.addEventListener('click', selectedLi);

function clearSelected() {
  for (let index = 0; index < listOf.children.length; index += 1) {
    if (listOf.children[index].style.backgroundColor === colorOfSelect) {
      listOf.removeChild(listOf.children[index]);
    }
  }
}
document.querySelector('#remover-selecionado').addEventListener('click', clearSelected);

function selectedToDone(event) {
  const textDecoration = event.target;
  let cont = 0;
  for (let index = 0; index < textDecoration.classList.length; index += 1) {
    if (textDecoration.classList[index] === 'completed') {
      cont += 1;
    }
  }
  if (cont > 0) {
    textDecoration.classList.remove('completed');
    return;
  }
  textDecoration.classList.add('completed');
}
listOf.addEventListener('dblclick', selectedToDone);

function clearAllList() {
  while (listOf.firstChild) {
    listOf.removeChild(listOf.firstElementChild);
  }
}
document.querySelector('#apaga-tudo').addEventListener('click', clearAllList);

function clearAllDone() {
  const listAll = listOf.getElementsByClassName('completed');
  while (listAll.length > 0) {
    listOf.removeChild(listAll[0]);
  }
}
document.querySelector('#remover-finalizados').addEventListener('click', clearAllDone);

function saveList() {
  const itensOfList = [];
  const listToBeSave = listOf.children;
  for (let index = 0; index < listOf.children.length; index += 1) {
    itensOfList.push(listToBeSave[index].innerText);
    itensOfList.push(listToBeSave[index].className);
  }
  localStorage.setItem('conteudo', itensOfList);
}
document.querySelector('#salvar-tarefas').addEventListener('click', saveList);

window.addEventListener('load', () => {
  if (localStorage.length === 0) {
    return;
  }
  const element = localStorage.getItem('conteudo').split(',');
  console.log(element);
  for (let index = 0; index < element.length; index += 2) {
    const liElement = document.createElement('li');
    liElement.innerText = element[index];
    liElement.className = element[index + 1];
    listOf.appendChild(liElement);
  }
});

function changePositionTo(arr, from, to) {
  // to === começo da posição de referencia // from = posição do elemento a ser movido // '[0]' resera a posição do elemento para adicionar na posição de referencia;
  arr.splice(to, 0, arr.splice(from, 1)[0]);
  return arr;
}

function creatNew(arr) {
  clearAllList();
  for (let index = 0; index < arr.length; index += 1) {
    listOf.appendChild(arr[index]);
  }
}
function moveUp() {
  let arrayString = [...listOf.children];
  for (let index = 1; index < listOf.children.length; index += 1) {
    if (listOf.children[index].style.backgroundColor === colorOfSelect) {
      arrayString = changePositionTo(arrayString, index, index - 1);
    }
  }
  creatNew(arrayString);
}

document.querySelector('#mover-cima').addEventListener('click', moveUp);
document.querySelector('#mover-cima').addEventListener('keydown', (when) => {
  if (when.key === 38) {
    moveUp();
  }
});

function moveDown() {
  let arrayString = [...listOf.children];
  for (let index = listOf.children.length - 2; index >= 0; index -= 1) {
    if (listOf.children[index].style.backgroundColor === colorOfSelect) {
      arrayString = changePositionTo(arrayString, index + 1, index);
    }
  }
  creatNew(arrayString);
}

document.querySelector('#mover-baixo').addEventListener('click', moveDown);
document.querySelector('#mover-baixo').addEventListener('keydown', (eventt) => {
  if (eventt.which === 40) {
    moveDown();
  }
});
