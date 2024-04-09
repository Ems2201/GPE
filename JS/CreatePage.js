const form = document.getElementById('form');
const nameUF = document.getElementById('name_uf');
const typeUF = document.getElementById('type_uf');
const heightUF = document.getElementById('height_uf');
const valueUF = document.getElementById('value_uf');
const submitUF = document.getElementById('submit_uf');

form.addEventListener("submit", (event) => {
    event.preventDefault();
    
    checkInputName();
    checkInputType();
    checkInputHeight();
    checkInputValue();
})

function checkInputName() {
    const nameUFvalue = nameUF.value;

    if (nameUFvalue === "") {
        errorInput(nameUF, "Preencha o nome da UF!")
    }
    else {
        const formItem = nameUF;
        formItem.className = "input"
    }
}

function checkInputType() {
    const typeUFvalue = typeUF.value;

    if (typeUFvalue === "") {
        errorInput(typeUF, "Preencha o tipo da UF!")
    }
    else {
        const formItem = typeUF;
        formItem.className = "input"
    }
}

function checkInputHeight() {
    const heightUFvalue = heightUF.value;

    if (heightUFvalue === "") {
        errorInput(heightUF, "Preencha a Altura da UF!")
    }

    else {
        const formItem = heightUF;
        formItem.className = "input"
    }
}


function checkInputValue() {
    const valueUFvalue = valueUF.value;

    if (valueUFvalue === "") {
        errorInput(valueUF, "Preencha a Potência ou Corrente da UF!")
    }
    else {
        const formItem = valueUF;
        formItem.className = "input"
    }
}

function errorInput(input, message) {
    const formItem = input.parentElement;
    const inputs = formItem.querySelector(".input");

    input.className = "error input";
    
    input.placeholder = message;
}

function cadastrarUF() {
    if (nameUF.value != "" && typeUF.value != "" && heightUF.value != "" && heightUF.value != Number && valueUF.value != "") {
        submitUF.textContent = "Cadastrando UF...";
        
        let UF = JSON.parse(localStorage.getItem('form') || '[]');

        UF.push({
            name: nameUF.value,
            type: typeUF.value,
            height: heightUF.value,
            value: valueUF.value
        });

        localStorage.setItem('form', JSON.stringify(UF));

        setTimeout(() => {
            window.location.href = '../HTML/ViewUF.html';
        }, 2500)
    } 
    else {
        submitUF.textContent = "Preencha todos os campos!";
    }
}
