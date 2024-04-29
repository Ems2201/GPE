// Pegar os Botões
let firstFit = document.getElementById('firstFit');
let bestFit = document.getElementById('bestFit');
let bestFit2 = document.getElementById('bestFit2');
let random = document.getElementById('random');

// Quando o Botão FirstFit for Clicado
firstFit.addEventListener('click', () => {
    // Se não haver valores no formulário
    if (input.value == '') {
        alert('Insira os Valores');
    }
    // Caso Contrário, Execute a Função
    else {
        algoritmofirstFit();
    }
});

bestFit.addEventListener('click', () => {
    // Se não haver valores no formulário
    if (input.value == '') {
        alert('Insira os Valores');
    }
    // Caso Contrário, Execute a Função
    else {
        algoritmobestFit();
    }
})

bestFit2.addEventListener('click', () => {
    // Se não haver valores no formulário
    if (input.value == '') {
        alert('Insira os Valores');
    }
    // Caso Contrário, Execute a Função
    else {
        algoritmobestFit2();
    }
})

// Quando o Botão Limpar For pressionado
random.addEventListener('click', () => {
    location.reload();
})



// Função AlgoritmofirstFit
function algoritmofirstFit() {
    // Pegue os valores do formulário
    let input = document.getElementById('input');
    // Separe cada valor por vírgula
    let inputValue = input.value.split(',');
    // Transforma cada valor em número e tire os espaços em branco
    inputValue = inputValue.map(value => parseFloat(value.trim()));
    // Defina a altura da Coluna e Escala dela para as
    let columnCapacity = 1800;
    let scale = columnCapacity/280;
    inputValue.sort((a, b) => b - a);


    // Inicialza a Lista Vazia de Colunas
    let columns = [];

    // Para cada UF menor que o total de UFs
    for (let i = 0; i < inputValue.length; i++) {
        // Pegue a UF
        let uf = inputValue[i];
        // Define que UF não foi inserida
        let ufInserted = false;

        // Para cada coluna menor que o total de Colunas
        for (let j = 0; j < columns.length; j++) {
            // Pegue a Coluna
            let column = columns[j];
            // Se a UF couber na Coluna
            if (column.currentCapacity + uf <= columnCapacity) {
                // Coloque a UF na Coluna
                column.uf.push(uf);
                // Subtraia o Espaço Restante da Coluna
                column.currentCapacity += uf;
                // Defina a UF como Inserida
                ufInserted = true; 
                // Pare de Verificar
                break;
            }
        }
        // Se a UF foi Inserida (! significa NOT ou Diferente)
        if (!ufInserted) {
            // Cria a Nova Coluna Vazia
            let newColumn = {
                currentCapacity: uf,
                uf: [uf]
            };
            // Coloque a Coluna na Lista de Colunas
            columns.push(newColumn);
        }
    }

    // Pegue no Site o Container Invísivel de Colunas
    let container = document.getElementById('bin');

    // Para cada Coluna na Lista de Colunas
    columns.forEach((column) => {
        // Pega Coluna J
        let columnElement = document.createElement('div');
        // Aplica o Estilo da Coluna
        columnElement.className= 'bins';
        // Adiciona a Coluna no Container
        container.appendChild(columnElement);

        // Para cada UF na Coluna
        column.uf.forEach(uf => {
            // Pega a UF I
            let ufElement = document.createElement('div');
            // Aplica o Estilo da UF
            ufElement.className = 'item';
            // Define a Altura da UF com base no valor da UF / a Escala de Redução e Informa a Unidade Pixel
            ufElement.style.height = (uf/scale) + 'px';
            // Coloca o Texto do Valor da UF na UF
            ufElement.textContent = uf;
            // Adiciona a UF na Coluna
            columnElement.appendChild(ufElement);
        });
    });
}

function algoritmobestFit() {
    // Pegue os valores do formulário
    let input = document.getElementById('input');
    // Separe cada valor por vírgula
    let inputValue = input.value.split(',');
    // Transforma cada valor em número e tire os espaços em branco
    inputValue = inputValue.map(value => parseFloat(value.trim()));

    // Defina a altura da Coluna e Escala dela para as
    let columnCapacity = 1800;
    let scale = columnCapacity/280;
    
    // Inicialza a Lista Vazia de Colunas
    let columns = [];

    // Para cada UF menor que o total de UFs
    for (let i = 0; i < inputValue.length; i++) {
        let uf = inputValue[i];
        let bestColumnIndex = -1;
        let minWaste = Number.MAX_VALUE;
     

        for (let j = 0; j < columns.length; j++) {
            let column = columns[j];
            if (column.currentCapacity + uf <= columnCapacity) {
                let waste = columnCapacity - (column.currentCapacity + uf);
                if (waste < minWaste) {
                    minWaste = waste;
                    bestColumnIndex = j;
                }
            }
        }
        if (bestColumnIndex !== -1) {
            columns[bestColumnIndex].ufs.push(uf);
            columns[bestColumnIndex].currentCapacity += uf;
        } else {
            let newColumn = {
                currentCapacity: uf,
                ufs: [uf]
            };
            columns.push(newColumn);
        }
        
    }
    // Pegue no Site o Container Invísivel de Colunas
    let container = document.getElementById('bin');
    
    // Para cada Coluna na Lista de Colunas
    for (let i = 0; i < columns.length; i++) {
        let column = columns[i];
        // Pega Coluna J
        let columnElement = document.createElement('div');
        // Aplica o Estilo da Coluna
        columnElement.className= 'bins';
        // Adiciona a Coluna no Container
        container.appendChild(columnElement);
        for (let j = 0; j < column.ufs.length; j++) {
            let uf = column.ufs[j];
            let ufElement = document.createElement('div');
            // Aplica o Estilo da UF
            ufElement.className = 'item';
            // Define a Altura da UF com base no valor da UF / a Escala de Redução e Informa a Unidade Pixel
            ufElement.style.height = (uf/scale) + 'px';
            // Coloca o Texto do Valor da UF na UF
            ufElement.textContent = uf;
            // Adiciona a UF na Coluna
            columnElement.appendChild(ufElement);

        }
    }
}

function algoritmobestFit2() {
    // Pegue os valores do formulário
    let input = document.getElementById('input');
    // Separe cada valor por vírgula
    let inputValue = input.value.split(',');
    // Transforma cada valor em número e tire os espaços em branco
    inputValue = inputValue.map(value => parseFloat(value.trim()));
    inputValue.sort((a, b) => b - a);

    // Defina a altura da Coluna e Escala dela para as
    let columnCapacity = 1800;
    let scale = columnCapacity/280;
    
    // Inicialza a Lista Vazia de Colunas
    let columns = [];

    // Para cada UF menor que o total de UFs
    for (let i = 0; i < inputValue.length; i++) {
        let uf = inputValue[i];
        let bestColumnIndex = -1;
        let minWaste = Number.MAX_VALUE;
        
        for (let j = 0; j < columns.length; j++) {
            let column = columns[j];
            if (column.currentCapacity + uf <= columnCapacity) {
                let waste = columnCapacity - (column.currentCapacity + uf);
                if (waste < minWaste) {
                    minWaste = waste;
                    bestColumnIndex = j;
                }
            }
        }
        if (bestColumnIndex !== -1) {
            columns[bestColumnIndex].ufs.push(uf);
            columns[bestColumnIndex].currentCapacity += uf;
        } else {
            let newColumn = {
                currentCapacity: uf,
                ufs: [uf]
            };
            columns.push(newColumn);
        }
    }

    // Pegue no Site o Container Invísivel de Colunas
    let container = document.getElementById('bin');
    
    // Para cada Coluna na Lista de Colunas
    for (let i = 0; i < columns.length; i++) {
        let column = columns[i];
        // Pega Coluna J
        let columnElement = document.createElement('div');
        // Aplica o Estilo da Coluna
        columnElement.className= 'bins';
        // Adiciona a Coluna no Container
        container.appendChild(columnElement);
        for (let j = 0; j < column.ufs.length; j++) {
            let uf = column.ufs[j];
            let ufElement = document.createElement('div');
            // Aplica o Estilo da UF
            ufElement.className = 'item';
            // Define a Altura da UF com base no valor da UF / a Escala de Redução e Informa a Unidade Pixel
            ufElement.style.height = (uf/scale) + 'px';
            // Coloca o Texto do Valor da UF na UF
            ufElement.textContent = uf;
            // Adiciona a UF na Coluna
            columnElement.appendChild(ufElement);

        }
    }
}