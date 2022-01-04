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

function selectedLi(event) {
  if (event.target.id !== 'lista-tarefas') {
    const selectedBefore = document.querySelector('.select');
    if (selectedBefore !== null) {
      selectedBefore.classList.remove('select');
    }
    event.target.classList.add('select');
  }
}

listOf.addEventListener('click', selectedLi);

function clearSelected() {
  for (let index = 0; index < listOf.children.length; index += 1) {
    if (listOf.children[index].classList.contains('select') === true) {
      listOf.removeChild(listOf.children[index]);
    }
  }
}
document
  .querySelector('#remover-selecionado')
  .addEventListener('click', clearSelected);

function selectedToDone(event) {
  const lineThrough = event.target;
  let cont = 0;
  for (let index = 0; index < lineThrough.classList.length; index += 1) {
    if (lineThrough.classList[index] === 'completed') {
      cont += 1;
    }
  }
  if (cont > 0) {
    lineThrough.classList.remove('completed');
    return;
  }
  lineThrough.classList.add('completed');
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
document
  .querySelector('#remover-finalizados')
  .addEventListener('click', clearAllDone);

function saveList() {
  const itensOfList = [];
  const listToBeSave = listOf.children;
  for (let index = 0; index < listToBeSave.length; index += 1) {
    const { innerText } = listToBeSave[index];
    const { className } = listToBeSave[index];
    const listObject = { innerText, className };
    itensOfList.push(listObject);
  }
  localStorage.setItem('conteudo', JSON.stringify(itensOfList));
}

document.querySelector('#salvar-tarefas').addEventListener('click', saveList);

window.addEventListener('load', () => {
  if (localStorage.getItem('conteudo') !== null) {
    const element = JSON.parse(localStorage.getItem('conteudo'));
    console.log(element);
    for (let index = 0; index < element.length; index += 1) {
      const liElement = document.createElement('li');
      liElement.innerText = element[index].innerText;
      liElement.className = element[index].className;
      listOf.appendChild(liElement);
    }
  }
});

function changePositionTo(arr, from, to) {
  // to === começo da posição de referencia // from = posição do elemento a ser movido // '[0]' resera a posição do elemento para adicionar na posição de referencia *** estudar mais sobre ???;
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
    if (listOf.children[index].classList.contains('select') === true) {
      arrayString = changePositionTo(arrayString, index, index - 1);
    }
  }
  creatNew(arrayString);
}

document.querySelector('#mover-cima').addEventListener('click', moveUp);

function moveDown() {
  let arrayString = [...listOf.children];
  for (let index = listOf.children.length - 2; index >= 0; index -= 1) {
    if (listOf.children[index].classList.contains('select') === true) {
      arrayString = changePositionTo(arrayString, index + 1, index);
    }
  }
  creatNew(arrayString);
}

document.querySelector('#mover-baixo').addEventListener('click', moveDown);
