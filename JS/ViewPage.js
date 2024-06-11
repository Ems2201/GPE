const select = document.getElementById('select');

// Ao Carregar a Página
document.addEventListener('DOMContentLoaded', function() {    
    // Ao escolher uma opção do select execute uma função
    select.addEventListener('change', () => {
        const selectValue = select.value; 
        switch (selectValue) {
            case "bestFit":
                bestFit('normal');
                break;
            case "bestFit2":
                bestFit('Crescente');
                break;
            case "bestFit3":
                bestFit('Decrescente');
                break;
            case "bestFit4":
                bestFitMelhorado();
                break;
            case "bestFit5":
                bestFitBinCompletion();
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
function bestFitMelhorado() {
    // Carregar Dados
    let data = JSON.parse(sessionStorage.getItem('data'));

    // Embaralhar Dados
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    shuffleArray(data);

    // Define Altura da Coluna e Número Mínimo de colunas com base nos dados da página de cadastro.
    const columnCapacity = 1800;
    let scale = columnCapacity / 400;
    let totalHeight = data.reduce((sum, uf) => sum + (uf.altura * uf.quantidade), 0);
    let minColumns = Math.ceil(totalHeight / columnCapacity);

    // Inicialize a Lista de Colunas
    let bestColumns = [];
    let bestColumnCount = Infinity;
    const container = document.getElementById('bin');
    container.innerHTML = '';

    // Adicionar Unidades Funcionais às Colunas
    function addItemToColumns(data) {
        let columns = [];
        for (let k = 0; k < data.length; k++) {
            const uf = data[k];
            const { nome, altura, valor, quantidade } = uf;

            for (let j = 0; j < quantidade; j++) {
                let columnFound = false;

                // Tenta adicionar o item a uma coluna parcialmente preenchida
                for (let i = 0; i < columns.length; i++) {
                    let column = columns[i];
                    if (column.currentCapacity + altura <= columnCapacity) {
                        column.ufs.push({ nome, altura, valor });
                        column.currentCapacity += altura;
                        columnFound = true;
                        break;
                    }
                }

                // Se não encontrar uma coluna adequada, criar uma nova coluna
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

    // Busca Melhor Solução
    let attempts = 0;
    const maxAttempts = 100;
    while (attempts < maxAttempts) {
        let columns = addItemToColumns(data);
        if (columns.length < bestColumnCount) {
            bestColumnCount = columns.length;
            bestColumns = columns;
        }

        // Se as colunas forem iguais ou menor ao número mínimo de colunas, parar
        if (bestColumnCount <= minColumns) {
            break;
        }

        shuffleArray(data);
        attempts++;
    }

    // Exibe Resultado
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

function bestFitBinCompletion() {
    let data = JSON.parse(sessionStorage.getItem('data'));
    
    const columnCapacity = 1800;
    let scale = columnCapacity / 400;

    let columns = [];

    const container = document.getElementById('bin');
    container.innerHTML = '';

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

    columns.sort((a, b) => b.currentCapacity - a.currentCapacity);

    columns.forEach((column) => {
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

    switch (sortType) {
        case 'Crescente':
            data.sort((a, b) => a.altura - b.altura);
            break;
        case 'Decrescente':
            data.sort((a, b) => b.altura - a.altura);
            break;
        // 'none' case doesn't need sorting
    }

    const columnCapacity = 1800;
    let scale = columnCapacity / 400;

    let columns = [];

    const container = document.getElementById('bin');
    container.innerHTML = '';

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

    columns.forEach((column) => {
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
