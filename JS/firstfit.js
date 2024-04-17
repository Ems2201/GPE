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
    let columnCapacity = 20;
    let scale = columnCapacity/280;

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
