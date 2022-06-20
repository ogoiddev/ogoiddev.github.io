const myForm = document.getElementById('myForm');


myForm.message.addEventListener('keyup', () => {
    myForm.counter.value = myForm.message.maxLength - myForm.message.value.length;
    if (myForm.counter.value > 100) {
        myForm.counter.style.backgroundColor = 'rgb(255, 255, 255)';        
    } else {
        myForm.counter.style.backgroundColor = 'rgb(0, 235, 130)';
    }
    if (myForm.counter.value === '0') {
        alert('Vamos com calma, por favor mande uma mensagem com menos de 500 caracteres. Depois aprofundamos melhor no assunto');
        myForm.counter.style.backgroundColor = 'rgb(255, 0, 100)';
    }
})

myForm.submit.addEventListener('click', () => {
    
}