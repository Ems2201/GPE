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
            case "nextFit":
                nextFit();
                break;
            default:
                break;
        }
        // Exibir o Número Total de Colunas
        let TotalColumns = document.getElementById('TotalColumns');
        let bin = document.getElementById('bin');
        let bins = bin.querySelectorAll('.bins');
        TotalColumns.textContent = 'Total de Colunas: ' + bins.length;

        // Remover colunas vazias
        removeEmptyColumns();
    });
    sessionStorage.removeItem("item");
});

function removeEmptyColumns() {
    const container = document.getElementById('bin');
    const columns = container.querySelectorAll('.bins');
    columns.forEach(column => {
        if (column.children.length === 0) {
            container.removeChild(column);
        }
    });

    // Atualizar o número total de colunas após a remoção
    const TotalColumns = document.getElementById('TotalColumns');
    TotalColumns.textContent = 'Total de Colunas: ' + container.querySelectorAll('.bins').length;
}

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

    // Define Altura da Coluna e Número Mínimo de colunas com base nos dados da página de cadastro.
    const columnCapacity = 1800;
    let scale = columnCapacity / 400;
    let totalHeight = data.reduce((sum, uf) => sum + (uf.altura * uf.quantidade), 0);
    let minColumns = Math.ceil(totalHeight / columnCapacity);

    // Inicialize a Lista de Colunas
    let bestColumns = [];
    let bestColumnCount = Infinity;
    let bestFullColumnsCount = 0;
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
        let fullColumnsCount = columns.filter(column => column.currentCapacity === columnCapacity).length;

        if (columns.length < bestColumnCount || fullColumnsCount > bestFullColumnsCount) {
            bestColumnCount = columns.length;
            bestColumns = columns;
            bestFullColumnsCount = fullColumnsCount;
        }

        // Se as colunas forem iguais ou menor ao número mínimo de colunas e o número de colunas cheias for o máximo possível, parar
        if (bestColumnCount <= minColumns && fullColumnsCount === columns.length) {
            break;
        }

        shuffleArray(data);
        attempts++;
    }

    // Exibe Resultado
    bestColumns.forEach((column, columnIndex) => {
        const columnElement = document.createElement('div');
        columnElement.classList.add('bins');
        container.appendChild(columnElement);

        column.ufs.forEach((uf, ufIndex) => {
            const ufElement = document.createElement('div');
            ufElement.classList.add('item');
            ufElement.textContent = `${uf.nome} ${uf.valor}`;
            ufElement.style.height = (uf.altura / scale) + 'px';

            // Adicionar botão de travar
            const lockButton = document.createElement('button');
            lockButton.textContent = 'Mudar';
            lockButton.classList.add('lock-button');
            lockButton.onclick = () => openLockMenu(uf, columnIndex, ufElement);
            ufElement.appendChild(lockButton);

            columnElement.appendChild(ufElement);
        });
    });

    function openLockMenu(uf, columnIndex, ufElement) {
        // Remove qualquer menu de lock existente
        const existingMenu = document.querySelector('.lock-menu');
        if (existingMenu) {
            document.body.removeChild(existingMenu);
        }

        // Cria o menu de lock
        const lockMenu = document.createElement('div');
        lockMenu.classList.add('lock-menu');

        const lockLabel = document.createElement('label');
        lockLabel.textContent = 'Selecione a Coluna:';
        lockMenu.appendChild(lockLabel);

        const lockSelect = document.createElement('select');
        for (let i = 0; i < document.querySelectorAll('.bins').length; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = `Coluna ${i + 1}`;
            lockSelect.appendChild(option);
        }
        lockMenu.appendChild(lockSelect);

        const lockButton = document.createElement('button');
        lockButton.textContent = 'Mudar';
        lockButton.onclick = () => lockItemToColumn(uf, columnIndex, ufElement, lockSelect.value);
        lockMenu.appendChild(lockButton);

        // Adiciona o menu de lock ao body como o primeiro elemento
        document.body.insertBefore(lockMenu, document.body.firstChild);
    }

    function lockItemToColumn(uf, columnIndex, ufElement, targetColumnIndex) {
        // Remove a unidade funcional da coluna atual
        const columnElement = document.querySelectorAll('.bins')[columnIndex];
        if (columnElement.contains(ufElement)) {
            columnElement.removeChild(ufElement);
        }

        // Atualiza a capacidade da coluna atual
        let currentCapacity = Array.from(columnElement.children)
            .filter(item => item.classList.contains('item'))
            .reduce((sum, item) => sum + parseInt(item.style.height), 0);

        // Se a coluna atual estiver vazia, remove-a
        if (currentCapacity === 0) {
            columnElement.parentElement.removeChild(columnElement);
        }

        // Adiciona a unidade funcional à nova coluna ou cria uma nova coluna se necessário
        let targetColumnElement = document.querySelectorAll('.bins')[targetColumnIndex];

        if (!targetColumnElement) {
            targetColumnElement = document.createElement('div');
            targetColumnElement.classList.add('bins');
            document.getElementById('bin').appendChild(targetColumnElement);
        }

        let targetCapacity = Array.from(targetColumnElement.children)
            .filter(item => item.classList.contains('item'))
            .reduce((sum, item) => sum + parseInt(item.style.height), 0);

        if (targetCapacity + parseInt(ufElement.style.height) > columnCapacity / scale) {
            const newColumnElement = document.createElement('div');
            newColumnElement.classList.add('bins');
            document.getElementById('bin').appendChild(newColumnElement);
            newColumnElement.appendChild(ufElement);
        } else {
            targetColumnElement.appendChild(ufElement);
        }

        // Atualiza os dados da coluna
        let data = JSON.parse(sessionStorage.getItem('data'));
        let ufData = data.find(item => item.nome === uf.nome && item.valor === uf.valor);
        ufData.lockedColumn = targetColumnIndex;
        sessionStorage.setItem('data', JSON.stringify(data));

        // Remove o menu de lock
        const lockMenu = document.querySelector('.lock-menu');
        if (lockMenu) {
            document.body.removeChild(lockMenu);
        }

        // Remover colunas vazias
        removeEmptyColumns();
   
    }
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

    // Calcula L2(S) conforme a fórmula
    
    let sumAlturas = data.reduce((sum, item) => sum + (item.altura * item.quantidade), 0);
    let L2_S = Math.ceil((1 / columnCapacity) * sumAlturas);

    console.log("L2(S) =", L2_S);

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

function nextFit(sortType = 'normal') {
    let data = JSON.parse(sessionStorage.getItem('data'));

    // Ordena os dados conforme o tipo de ordenação solicitado
    switch (sortType) {
        case 'Crescente':
            data.sort((a, b) => a.altura - b.altura);
            break;
        case 'Decrescente':
            data.sort((a, b) => b.altura - a.altura);
            break;
        // 'normal' ou 'none' não precisam de ordenação
    }

    const columnCapacity = 1800;
    let scale = columnCapacity / 400;

    let columns = [];
    let currentColumn = {
        currentCapacity: 0,
        ufs: []
    };
    columns.push(currentColumn);

    const container = document.getElementById('bin');
    container.innerHTML = '';

    // Loop para inserir os itens nas colunas de acordo com Next-Fit
    for (let k = 0; k < data.length; k++) {
        const uf = data[k];
        const { nome, altura, valor, quantidade } = uf;

        for (let j = 0; j < quantidade; j++) {
            if (currentColumn.currentCapacity + altura <= columnCapacity) {
                // Adiciona o item ao bin atual
                currentColumn.ufs.push({ nome, altura, valor });
                currentColumn.currentCapacity += altura;
            } else {
                // Fecha o bin atual e começa um novo bin
                currentColumn = {
                    currentCapacity: altura,
                    ufs: [{ nome, altura, valor }]
                };
                columns.push(currentColumn);
            }
        }
    }

    // Calcula L2(S) conforme a fórmula
    let sumAlturas = data.reduce((sum, item) => sum + (item.altura * item.quantidade), 0);
    let L2_S = Math.ceil((1 / columnCapacity) * sumAlturas);

    console.log("L2(S) =", L2_S);

    // Renderiza as colunas e os itens na interface
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
