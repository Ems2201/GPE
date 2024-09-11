// Seleciona o elemento do select
const select = document.getElementById('select');

// Quando a página carrega
document.addEventListener('DOMContentLoaded', () => {
    // Adiciona evento ao selecionar uma opção
    select.addEventListener('change', handleSelectChange);

    // Remove item da sessão ao carregar a página
    sessionStorage.removeItem("item");
});

// Função para lidar com a mudança de seleção
function handleSelectChange() {
    const selectValue = select.value;

    // Mapeia as opções para funções correspondentes
    const selectOptions = {
        "bestFit": () => bestFit('normal'),
        "bestFit2": () => bestFit('Crescente'),
        "bestFit3": () => bestFit('Decrescente'),
        "bestFit4": bestFitMelhorado,
        "bestFit5": binCompletion,
        "nextFit": nextFit
    };

    // Executa a função correspondente ao valor selecionado
    if (selectOptions[selectValue]) {
        selectOptions[selectValue]();
    }

    // Atualiza o total de colunas e remove as vazias
    updateTotalColumns();
    removeEmptyColumns();
}

// Função para atualizar o total de colunas
function updateTotalColumns() {
    const totalColumns = document.getElementById('TotalColumns');
    const bins = document.querySelectorAll('#bin .bins');
    totalColumns.textContent = `Total de Colunas: ${bins.length}`;
}

// Função para remover

function removeEmptyColumns() {
    const barramentos = ['Tie', 'A', 'B'];

    barramentos.forEach(barramento => {
        const container = document.getElementById(`bin${barramento}`);
        const columns = container.querySelectorAll('.bins');

        // Verifica se todas as colunas estão vazias
        const allColumnsEmpty = Array.from(columns).every(column => column.children.length === 0);

        // Exibe ou oculta o barramento
        container.style.display = allColumnsEmpty ? 'none' : 'flex';
    });

    // Atualiza o número total de colunas
    updateTotalColumns();
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

    // Inicialize os barramentos e colunas
    let columns = {
        A: [],
        Tie: [],
        B: []
    };

    let bestColumns = { A: [], Tie: [], B: [] };
    let bestColumnCount = Infinity;
    let bestFullColumnsCount = 0;
    const container = document.getElementById('bin');
    container.innerHTML = '';

    // Função para alocar itens nas colunas
    function addItemToColumns(data) {
        let attemptColumns = JSON.parse(JSON.stringify(columns));
        let success = true;

        for (let k = 0; k < data.length; k++) {
            const uf = data[k];
            let { nome, altura, valor, quantidade, barramento } = uf;

            // Lógica do Tie Breaker
            if (nome === 'Tie Breaker' && altura < 1000) {
                let bestBarramento = barramento;
                let maxAvailableSpace = -1;

                for (let b in attemptColumns) {
                    let totalUsedSpace = attemptColumns[b].reduce((sum, column) => sum + column.currentCapacity, 0);
                    let availableSpace = columnCapacity * attemptColumns[b].length - totalUsedSpace;

                    if (availableSpace > maxAvailableSpace) {
                        maxAvailableSpace = availableSpace;
                        bestBarramento = b;
                    }
                }

                barramento = bestBarramento;
            }

            for (let j = 0; j < quantidade; j++) {
                let columnFound = false;
                let relevantColumns = attemptColumns[barramento];

                // Tenta adicionar o item a uma coluna parcialmente preenchida
                for (let i = 0; i < relevantColumns.length; i++) {
                    let column = relevantColumns[i];
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
                    relevantColumns.push(newColumn);
                }
            }
        }

        return attemptColumns;
    }

    // Busca a melhor solução
    let attempts = 0;
    const maxAttempts = 100;
    while (attempts < maxAttempts) {
        let attemptColumns = addItemToColumns(data);
        let totalColumns = Object.values(attemptColumns).reduce((count, barramento) => count + barramento.length, 0);
        let fullColumnsCount = Object.values(attemptColumns).reduce((count, barramento) => count + barramento.filter(column => column.currentCapacity === columnCapacity).length, 0);

        if (totalColumns < bestColumnCount || fullColumnsCount > bestFullColumnsCount) {
            bestColumnCount = totalColumns;
            bestColumns = attemptColumns;
            bestFullColumnsCount = fullColumnsCount;
        }

        // Se as colunas forem iguais ou menor ao número mínimo de colunas e o número de colunas cheias for o máximo possível, parar
        if (bestColumnCount <= minColumns && fullColumnsCount === totalColumns) {
            break;
        }

        shuffleArray(data);
        attempts++;
    }

    // Exibe o resultado
    for (let barramento in bestColumns) {
        const barramentoColumns = bestColumns[barramento];
        const barramentoContainer = document.createElement('div');
        barramentoContainer.id = `bin${barramento}`;
        barramentoContainer.innerHTML = `<h2>Barramento ${barramento}</h2>`;
        container.appendChild(barramentoContainer);

        barramentoColumns.forEach((column, columnIndex) => {
            const columnElement = document.createElement('div');
            columnElement.classList.add('bins');
            barramentoContainer.appendChild(columnElement);

            column.ufs.forEach((uf, ufIndex) => {
                const ufElement = document.createElement('div');
                ufElement.classList.add('item');
                ufElement.textContent = `${uf.nome} ${uf.valor}`;
                ufElement.style.height = (uf.altura / scale) + 'px';

                // Adicionar botão de travar
                const lockButton = document.createElement('button');
                lockButton.textContent = 'Mudar';
                lockButton.classList.add('lock-button');
                lockButton.onclick = () => openLockMenu(uf, columnIndex, ufElement, barramento);
                ufElement.appendChild(lockButton);

                columnElement.appendChild(ufElement);
            });
        });
    }

    function openLockMenu(uf, columnIndex, ufElement, barramento) {
        // Lógica do menu de lock adaptada para barramentos
        const existingMenu = document.querySelector('.lock-menu');
        if (existingMenu) {
            document.body.removeChild(existingMenu);
        }

        const lockMenu = document.createElement('div');
        lockMenu.classList.add('lock-menu');

        const lockLabel = document.createElement('label');
        lockLabel.textContent = 'Selecione a Coluna:';
        lockMenu.appendChild(lockLabel);

        const lockSelect = document.createElement('select');
        for (let i = 0; i < document.querySelectorAll(`#bin${barramento} .bins`).length; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = `Coluna ${i + 1}`;
            lockSelect.appendChild(option);
        }
        lockMenu.appendChild(lockSelect);

        const lockButton = document.createElement('button');
        lockButton.textContent = 'Mudar';
        lockButton.onclick = () => lockItemToColumn(uf, columnIndex, ufElement, lockSelect.value, barramento);
        lockMenu.appendChild(lockButton);

        document.body.insertBefore(lockMenu, document.body.firstChild);
    }

    function lockItemToColumn(uf, columnIndex, ufElement, targetColumnIndex, barramento) {
        // Lógica de troca de colunas com barramentos
        const columnElement = document.querySelectorAll(`#bin${barramento} .bins`)[columnIndex];
        if (columnElement.contains(ufElement)) {
            columnElement.removeChild(ufElement);
        }

        let currentCapacity = Array.from(columnElement.children)
            .filter(item => item.classList.contains('item'))
            .reduce((sum, item) => sum + parseInt(item.style.height), 0);

        if (currentCapacity === 0) {
            columnElement.parentElement.removeChild(columnElement);
        }

        let targetColumnElement = document.querySelectorAll(`#bin${barramento} .bins`)[targetColumnIndex];

        if (!targetColumnElement) {
            targetColumnElement = document.createElement('div');
            targetColumnElement.classList.add('bins');
            document.getElementById(`bin${barramento}`).appendChild(targetColumnElement);
        }

        let targetCapacity = Array.from(targetColumnElement.children)
            .filter(item => item.classList.contains('item'))
            .reduce((sum, item) => sum + parseInt(item.style.height), 0);

        if (targetCapacity + parseInt(ufElement.style.height) > columnCapacity / scale) {
            const newColumnElement = document.createElement('div');
            newColumnElement.classList.add('bins');
            document.getElementById(`bin${barramento}`).appendChild(newColumnElement);
            newColumnElement.appendChild(ufElement);
        } else {
            targetColumnElement.appendChild(ufElement);
        }

        let data = JSON.parse(sessionStorage.getItem('data'));
        let ufData = data.find(item => item.nome === uf.nome && item.valor === uf.valor);
        ufData.lockedColumn = targetColumnIndex;
        sessionStorage.setItem('data', JSON.stringify(data));

        const lockMenu = document.querySelector('.lock-menu');
        if (lockMenu) {
            document.body.removeChild(lockMenu);
        }

        removeEmptyColumns();
    }

    function removeEmptyColumns() {
        document.querySelectorAll('.bins').forEach(columnElement => {
            if (columnElement.children.length === 0) {
                columnElement.parentElement.removeChild(columnElement);
            }
        });
    }
}




function binCompletion() {
    let data = JSON.parse(sessionStorage.getItem('data'));

    const columnCapacity = 1800;
    let scale = columnCapacity / 400;

    // Inicializa colunas para cada barramento
    let columns = {
        A: [],
        Tie: [],
        B: []
        // Adicione mais barramentos aqui, se necessário
    };

    // Limpa os containers de cada barramento
    document.getElementById('binA').innerHTML = '';
    document.getElementById('binB').innerHTML = '';
    document.getElementById('binTie').innerHTML = '';

    for (let k = 0; k < data.length; k++) {
        const uf = data[k];
        let { nome, altura, valor, quantidade, barramento } = uf;

        // Verificação para mover "Tie" com altura menor que 1000
        if (nome === 'Tie Breaker' && altura < 1000) {
            let bestBarramento = barramento;
            let maxAvailableSpace = -1;

            for (let b in columns) {
                let totalUsedSpace = columns[b].reduce((sum, column) => sum + column.currentCapacity, 0);
                let availableSpace = columnCapacity * columns[b].length - totalUsedSpace;

                if (availableSpace > maxAvailableSpace) {
                    maxAvailableSpace = availableSpace;
                    bestBarramento = b;
                }
            }

            barramento = bestBarramento;
        }

        for (let j = 0; j < quantidade; j++) {
            let relevantColumns = columns[barramento];
            let bestColumnIndex = -1;
            let minWaste = Number.MAX_VALUE;

            // Seleciona a coluna que mais se aproxima da capacidade total sem exceder
            for (let i = 0; i < relevantColumns.length; i++) {
                let column = relevantColumns[i];
                if (column.currentCapacity + altura <= columnCapacity) {
                    let waste = columnCapacity - (column.currentCapacity + altura);
                    if (waste < minWaste) {
                        minWaste = waste;
                        bestColumnIndex = i;
                    }
                }
            }

            // Se encontrar uma coluna com espaço, aloca a unidade nela
            if (bestColumnIndex !== -1) {
                relevantColumns[bestColumnIndex].ufs.push({ nome, altura, valor });
                relevantColumns[bestColumnIndex].currentCapacity += altura;
            } else {
                // Se nenhuma coluna tiver espaço suficiente, cria uma nova
                const newColumn = {
                    currentCapacity: altura,
                    ufs: [{ nome, altura, valor }]
                };
                relevantColumns.push(newColumn);
            }
        }
    }

    // Renderiza as colunas separadamente para cada barramento
    for (let barramento in columns) {
        const barramentoColumns = columns[barramento];
        const barramentoContainer = document.getElementById(`bin${barramento}`);

        // Adiciona o nome do barramento
        const titleElement = document.createElement('h2');
        titleElement.textContent = `Barramento ${barramento}`;
        barramentoContainer.appendChild(titleElement);

        // Renderiza cada coluna no barramento correspondente
        barramentoColumns.forEach((column) => {
            const columnElement = document.createElement('div');
            columnElement.classList.add('bins');
            barramentoContainer.appendChild(columnElement);

            column.ufs.forEach(uf => {
                const ufElement = document.createElement('div');
                ufElement.classList.add('item');
                ufElement.textContent = `${uf.nome} ${uf.valor}`;
                ufElement.style.height = (uf.altura / scale) + 'px';
                columnElement.appendChild(ufElement);
            });
        });
    }
}


function bestFit(sortType) {
    let data = JSON.parse(sessionStorage.getItem('data'));

    switch (sortType) {
        case 'Crescente':
            data.sort((a, b) => a.altura - b.altura);
            break;
        case 'Decrescente':
            data.sort((a, b) => b.altura - a.altura);
            break;
        // Caso 'none', não precisa ordenar
    }

    const columnCapacity = 1800;
    let scale = columnCapacity / 400;

    // Inicializa colunas para cada barramento
    let columns = {
        A: [],
        Tie: [],
        B: []
        // Adicione mais barramentos aqui, se necessário
    };

    // Limpa os containers de cada barramento
    document.getElementById('binA').innerHTML = '';
    document.getElementById('binB').innerHTML = '';
    document.getElementById('binTie').innerHTML = '';

    for (let k = 0; k < data.length; k++) {
        const uf = data[k];
        let { nome, altura, valor, quantidade, barramento } = uf;

        // Verificação para mover "Tie" com altura menor que 1000
        if (nome === 'Tie Breaker' && altura < 1000) {
            // Encontrar o barramento com mais espaço sobrando
            let bestBarramento = barramento;
            let maxAvailableSpace = -1;

            for (let b in columns) {
                let totalUsedSpace = columns[b].reduce((sum, column) => sum + column.currentCapacity, 0);
                let availableSpace = columnCapacity * columns[b].length - totalUsedSpace;

                if (availableSpace > maxAvailableSpace) {
                    maxAvailableSpace = availableSpace;
                    bestBarramento = b;
                }
            }

            barramento = bestBarramento;
        }

        for (let j = 0; j < quantidade; j++) {
            let bestColumnIndex = -1;
            let minWaste = Number.MAX_VALUE;

            // Seleciona as colunas do barramento correto
            let relevantColumns = columns[barramento];

            // Tenta encontrar uma coluna que caiba a unidade funcional
            for (let i = 0; i < relevantColumns.length; i++) {
                let column = relevantColumns[i];
                if (column.currentCapacity + altura <= columnCapacity) {
                    let waste = columnCapacity - (column.currentCapacity + altura);
                    if (waste < minWaste) {
                        minWaste = waste;
                        bestColumnIndex = i;
                    }
                }
            }

            // Se encontrar uma coluna com espaço, aloca a unidade nela
            if (bestColumnIndex !== -1) {
                relevantColumns[bestColumnIndex].ufs.push({ nome, altura, valor });
                relevantColumns[bestColumnIndex].currentCapacity += altura;
            } else {
                // Se nenhuma coluna tiver espaço suficiente, cria uma nova
                const newColumn = {
                    currentCapacity: altura,
                    ufs: [{ nome, altura, valor }]
                };
                relevantColumns.push(newColumn);
            }
        }
    }

    // Renderiza as colunas separadamente para cada barramento
    for (let barramento in columns) {
        const barramentoColumns = columns[barramento];
        const barramentoContainer = document.getElementById(`bin${barramento}`);

        // Adiciona o nome do barramento
        const titleElement = document.createElement('h2');
        titleElement.textContent = `Barramento ${barramento}`;
        barramentoContainer.appendChild(titleElement);

        // Renderiza cada coluna no barramento correspondente
        barramentoColumns.forEach((column) => {
            const columnElement = document.createElement('div');
            columnElement.classList.add('bins');
            barramentoContainer.appendChild(columnElement);

            column.ufs.forEach(uf => {
                const ufElement = document.createElement('div');
                ufElement.classList.add('item');
                ufElement.textContent = `${uf.nome} ${uf.valor}`;
                ufElement.style.height = (uf.altura / scale) + 'px';
                columnElement.appendChild(ufElement);
            });
        });
    }
}

function nextFit() {
    let data = JSON.parse(sessionStorage.getItem('data'));

    const columnCapacity = 1800;
    let scale = columnCapacity / 400;

    // Inicializa colunas para cada barramento
    let columns = {
        A: [],
        Tie: [],
        B: []
        // Adicione mais barramentos aqui, se necessário
    };

    // Limpa os containers de cada barramento
    document.getElementById('binA').innerHTML = '';
    document.getElementById('binB').innerHTML = '';
    document.getElementById('binTie').innerHTML = '';

    for (let k = 0; k < data.length; k++) {
        const uf = data[k];
        let { nome, altura, valor, quantidade, barramento } = uf;

        // Verificação para mover "Tie" com altura menor que 1000
        if (nome === 'Tie Breaker' && altura < 1000) {
            // Encontrar o barramento com mais espaço sobrando
            let bestBarramento = barramento;
            let maxAvailableSpace = -1;

            for (let b in columns) {
                let totalUsedSpace = columns[b].reduce((sum, column) => sum + column.currentCapacity, 0);
                let availableSpace = columnCapacity * columns[b].length - totalUsedSpace;

                if (availableSpace > maxAvailableSpace) {
                    maxAvailableSpace = availableSpace;
                    bestBarramento = b;
                }
            }

            barramento = bestBarramento;
        }

        for (let j = 0; j < quantidade; j++) {
            let relevantColumns = columns[barramento];

            // Se a última coluna não tem espaço, cria uma nova coluna
            if (relevantColumns.length === 0 || relevantColumns[relevantColumns.length - 1].currentCapacity + altura > columnCapacity) {
                const newColumn = {
                    currentCapacity: altura,
                    ufs: [{ nome, altura, valor }]
                };
                relevantColumns.push(newColumn);
            } else {
                // Adiciona a unidade funcional à última coluna
                let lastColumn = relevantColumns[relevantColumns.length - 1];
                lastColumn.ufs.push({ nome, altura, valor });
                lastColumn.currentCapacity += altura;
            }
        }
    }

    // Renderiza as colunas separadamente para cada barramento
    for (let barramento in columns) {
        const barramentoColumns = columns[barramento];
        const barramentoContainer = document.getElementById(`bin${barramento}`);

        // Adiciona o nome do barramento
        const titleElement = document.createElement('h2');
        titleElement.textContent = `Barramento ${barramento}`;
        barramentoContainer.appendChild(titleElement);

        // Renderiza cada coluna no barramento correspondente
        barramentoColumns.forEach((column) => {
            const columnElement = document.createElement('div');
            columnElement.classList.add('bins');
            barramentoContainer.appendChild(columnElement);

            column.ufs.forEach(uf => {
                const ufElement = document.createElement('div');
                ufElement.classList.add('item');
                ufElement.textContent = `${uf.nome} ${uf.valor}`;
                ufElement.style.height = (uf.altura / scale) + 'px';
                columnElement.appendChild(ufElement);
            });
        });
    }
}
