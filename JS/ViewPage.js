const select = document.getElementById('select');

// Ao Carregar a Página
document.addEventListener('DOMContentLoaded', function() {    
    // Ao escolher uma opção do select execute uma função
    select.addEventListener('change', () => {
        const selectValue = select.value; 
        switch (selectValue) {
            case "firstFit":
                firstFit('normal');
                break;
            case "firstFit2":
                firstFit('Crescente');
                break;
            case "firstFit3":
                firstFit('Decrescente');
                break;
            case "bestFit":
                bestFit('normal');
                break;
            case "bestFit2":
                bestFit('Crescente');
                break;
            case "bestFit3":
                bestFit('Decrescente');
                break;
            default:
                break;
        }
        //  Exibir o Número Total de Colunas
        let TotalColumns = document.getElementById('TotalColumns');
        let bin = document.getElementById('bin');
        let bins = bin.querySelectorAll('.bins');
        TotalColumns.textContent = 'Total de Colunas: ' + bins.length;
        
       
    });
    sessionStorage.removeItem("item");
    
});
function firstFit(sortType = 'normal') {
    let data = JSON.parse(sessionStorage.getItem('data'));

    // Embaralhe as Unidades Funcionais
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    shuffleArray(data);


    // Ordenação das Unidades Funcionais
    switch (sortType) {
        case 'Crescente':
            data.sort((a, b) => a.altura - b.altura);
            break;
        case 'Decrescente':
            data.sort((a, b) => b.altura - a.altura);
            break;
    }

    const columnCapacity = 1800;
    let scale = columnCapacity / 400;

    // Caclule o total de altura e o número mínimo de colunas
    let totalHeight = data.reduce((sum, uf) => sum + (uf.altura * uf.quantidade), 0);
    let minColumns = Math.ceil(totalHeight / columnCapacity);

    console.log('Altura total:', totalHeight);
    console.log('Número Mínimo de Colunas:', minColumns);

    // Cria as Colunas
    let bestColumns = [];
    let bestColumnCount = Infinity;

    const container = document.getElementById('bin');
    container.innerHTML = '';

    // Adiciona os Itens a Colunas
    function addItemToColumns(data) {
        let columns = []; 
        for (let k = 0; k < data.length; k++) {
            const uf = data[k];
            const { nome, altura, valor, quantidade } = uf;

            for (let j = 0; j < quantidade; j++) {
                let columnFound = false;

                for (let i = 0; i < columns.length; i++) {
                    let column = columns[i];
                    if (column.currentCapacity + altura <= columnCapacity) {
                        column.ufs.push({ nome, altura, valor });
                        column.currentCapacity += altura;
                        columnFound = true;
                        break;
                    }
                }

                if (!columnFound) {
                    const newColumn = {
                        currentCapacity: altura,
                        ufs: [{ nome, altura, valor }]
                    };
                    columns.push(newColumn);
                }
            }
        }

        return columns;
    }

    // Define um Número de Tentativas para chegar ao melhor resultado
    let attempts = 0;
    const maxAttempts = 100; 

    // Loop para tentar chegar no melhor resultado

    while (attempts < maxAttempts) {
        let columns = addItemToColumns(data);
        if (columns.length < bestColumnCount) {
            bestColumnCount = columns.length;
            bestColumns = columns;
        }


        // se as colunas for igual ou menor ou menor número de colunas, pare
        if (bestColumnCount <= minColumns) {
            break;
        }

        shuffleArray(data);
        attempts++;
    }

    console.log('Número Total de Colunas:', bestColumnCount);

    // Mostre as Colunas
    bestColumns.forEach((column) => {
        const columnElement = document.createElement('div');
        columnElement.classList.add('bins');
        container.appendChild(columnElement);

        column.ufs.forEach(uf => {
            const ufElement = document.createElement('div');
            ufElement.classList.add('item');
            ufElement.textContent = `${uf.nome} ${uf.valor}`;
            ufElement.style.height = (uf.altura / scale) + 'px';
            columnElement.appendChild(ufElement);
        });
    });
}
function bestFit(sortType = 'normal') {
    let data = JSON.parse(sessionStorage.getItem('data'));

    // Embaralha as Unidades Funcionais
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    shuffleArray(data);

    // Ordena as Unidades Funcionais
    switch (sortType) {
        case 'Crescente':
            data.sort((a, b) => a.altura - b.altura);
            break;
        case 'Decrescente':
            data.sort((a, b) => b.altura - a.altura);
            break;
    }

    const columnCapacity = 1800;
    let scale = columnCapacity / 400;

    // Calcule o Total de Altura e o número mínimo de colunas
    let totalHeight = data.reduce((sum, uf) => sum + (uf.altura * uf.quantidade), 0);
    let minColumns = Math.ceil(totalHeight / columnCapacity);

    console.log('Total de Colunas:', totalHeight);
    console.log('Número Mínimo de Colunas:', minColumns);

    let bestColumns = [];
    let bestColumnCount = Infinity;

    const container = document.getElementById('bin');
    container.innerHTML = '';


    // Adiciona os Itens a Colunas
    function addItemToColumns(data) {
        let columns = []; // Clear columns before attempting to add items again
        for (let k = 0; k < data.length; k++) {
            const uf = data[k];
            const { nome, altura, valor, quantidade } = uf;

            for (let j = 0; j < quantidade; j++) {
                let bestColumnIndex = -1;
                let minWaste = Number.MAX_VALUE;

                for (let i = 0; i < columns.length; i++) {
                    let column = columns[i];
                    if (column.currentCapacity + altura <= columnCapacity) {
                        let waste = columnCapacity - (column.currentCapacity + altura);
                        if (waste < minWaste) {
                            minWaste = waste;
                            bestColumnIndex = i;
                        }
                    }
                }

                if (bestColumnIndex !== -1) {
                    columns[bestColumnIndex].ufs.push({ nome, altura, valor });
                    columns[bestColumnIndex].currentCapacity += altura;
                } else {
                    const newColumn = {
                        currentCapacity: altura,
                        ufs: [{ nome, altura, valor }]
                    };
                    columns.push(newColumn);
                }
            }
        }

        return columns;
    }

    // Define o número de tentativas para melhorar o algorítmo
    let attempts = 0;
    const maxAttempts = 100; 

    while (attempts < maxAttempts) {
        let columns = addItemToColumns(data);
        if (columns.length < bestColumnCount) {
            bestColumnCount = columns.length;
            bestColumns = columns;
        }

        // se as colunas for igual ou menor ou menor número mínimo de colunas, pare
        if (bestColumnCount <= minColumns) {
            break;
        }

        shuffleArray(data);
        attempts++;
    }

    // Mostre as colunas
    bestColumns.forEach((column) => {
        const columnElement = document.createElement('div');
        columnElement.classList.add('bins');
        container.appendChild(columnElement);

        column.ufs.forEach(uf => {
            const ufElement = document.createElement('div');
            ufElement.classList.add('item');
            ufElement.textContent = `${uf.nome} ${uf.valor}`;
            ufElement.style.height = (uf.altura / scale) + 'px';
            columnElement.appendChild(ufElement);
        });
    });
}