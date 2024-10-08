const select = document.getElementById('select-algoritmo');

document.addEventListener('DOMContentLoaded', () => {
    select.addEventListener('change', handleSelectChange);

    sessionStorage.removeItem("item");
});

function handleSelectChange() {
    const selectValue = select.value;

    const selectOptions = {
        "bestFit": () => algoritmos('normal', 'bestFit'),
        "bestFit2": () => algoritmos('Crescente', 'bestFit'),
        "bestFit3": () => algoritmos('Decrescente', 'bestFit'),
        "bestFit4": bestFitMelhorado,
        "bestFit5": algoritmos('normal', 'binCompletion'),
        "nextFit": algoritmos('normal', 'nextFit')
    };

    if (selectOptions[selectValue]) {
        selectOptions[selectValue]();
    }

    updateTotalColumns();
    removeEmptyColumns();
}

function updateTotalColumns() {
    const totalColumns = document.getElementById('TotalColumns');
    const bins = document.querySelectorAll('#bin .bins');
    totalColumns.textContent = `Total de Colunas: ${bins.length}`;
}

function removeEmptyColumns() {
    const barramentos = ['Tie', 'A', 'B'];

    barramentos.forEach(barramento => {
        const container = document.getElementById(`bin${barramento}`);
        const columns = container.querySelectorAll('.bins');

        const allColumnsEmpty = Array.from(columns).every(column => column.children.length === 0);

        container.style.display = allColumnsEmpty ? 'none' : 'flex';
    });

    updateTotalColumns();
}

function bestFitMelhorado() {
    let data = JSON.parse(sessionStorage.getItem('data'));

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    const columnHeightCapacity = 1800;
    const columnWidthCapacity = 100;
    let scale = columnHeightCapacity / 400;
    let totalHeight = data.reduce((sum, uf) => sum + (uf.altura * uf.quantidade), 0);
    let minColumns = Math.ceil(totalHeight / columnHeightCapacity);

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

    function addItemToColumns(data) {
        let attemptColumns = JSON.parse(JSON.stringify(columns));
        
        for (let k = 0; k < data.length; k++) {
            const uf = data[k];
            let { nome, altura, valor, quantidade, barramento, largura } = uf;

            if (nome === 'Tie Breaker' && altura < 1000) {
                let bestBarramento = barramento;
                let maxAvailableSpace = -1;
    
                for (let b in attemptColumns) {
                    let totalUsedSpace = attemptColumns[b].reduce((sum, column) => sum + column.currentCapacity, 0);
                    let availableSpace = columnHeightCapacity * attemptColumns[b].length - totalUsedSpace;
    
                    if (availableSpace > maxAvailableSpace) {
                        maxAvailableSpace = availableSpace;
                        bestBarramento = b;
                    }
                }
    
                barramento = bestBarramento;
            }

            if (largura > 25 && largura <= 50) {
                let pares = Math.floor(quantidade / 2);
                let restante = quantidade % 2;

                for (let p = 0; p < pares; p++) {
                    let novaUF = {
                        nome: `${nome}`,
                        altura: altura,
                        valor: valor,
                        largura: 100,
                        barramento: barramento,
                        quantidade: 1
                    };

                    adicionarUF(novaUF, attemptColumns, barramento, columnHeightCapacity, true);
                }

                if (restante === 1) {
                    adicionarUF(uf, attemptColumns, barramento, columnHeightCapacity, false);
                }
            } else if (largura <= 25) {
                    let pares = Math.floor(quantidade / 4);
                    let restante = quantidade % 4;
    
                    for (let p = 0; p < pares; p++) {
                        let novaUF = {
                            nome: `${nome}`,
                            altura: altura,
                            valor: valor,
                            largura: 100,
                            barramento: barramento,
                            quantidade: 1
                        };
    
                        adicionarUF(novaUF, attemptColumns, barramento, columnHeightCapacity, true);
                    }
    
                    if (restante > 0) {
                        let larguraTotal = restante * 25; // Calcula a largura total necessária
        
                        let novaUF = {
                            nome: `${nome}`,
                            altura: altura,
                            valor: valor,
                            largura: larguraTotal,
                            barramento: barramento,
                            quantidade: 1
                        };
                        

                        adicionarUF(novaUF, attemptColumns, barramento, columnHeightCapacity, false);
                    }
            } else {
                for (let j = 0; j < quantidade; j++) {
                    adicionarUF(uf, attemptColumns, barramento, columnHeightCapacity, false);
                }
            }
        }

        return attemptColumns;
    }

    let attempts = 0;
    const maxAttempts = 100;
    while (attempts < maxAttempts) {
        let attemptColumns = addItemToColumns(data);
        let totalColumns = Object.values(attemptColumns).reduce((count, barramento) => count + barramento.length, 0);
        let fullColumnsCount = Object.values(attemptColumns).reduce((count, barramento) => count + barramento.filter(column => column.currentCapacity === columnHeightCapacity).length, 0);

        if (totalColumns < bestColumnCount || fullColumnsCount > bestFullColumnsCount) {
            bestColumnCount = totalColumns;
            bestColumns = attemptColumns;
            bestFullColumnsCount = fullColumnsCount;
        }

        if (bestColumnCount <= minColumns && fullColumnsCount === totalColumns) {
            break;
        }

        shuffleArray(data);
        attempts++;
    }

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
                ufElement.classList.add('large');
                ufElement.style.height = (uf.altura / scale) + 'px';

                const lockButton = document.createElement('button');
                lockButton.textContent = 'Mudar';
                lockButton.classList.add('lock-button');
                lockButton.onclick = () => openLockMenu(uf, columnIndex, ufElement, barramento);
                ufElement.appendChild(lockButton);
                columnElement.appendChild(ufElement);

                if (uf.largura === 100 && uf.gavetaVertical) {
                    if (uf.nome === 'Disjuntor Caixa Moldada Vertical') {
                    ufElement.classList.add('gaveta-vertical');
                    ufElement.style.display = 'flex';
                    ufElement.style.justifyContent = 'center';
                    ufElement.style.width = '100%';
                    ufElement.style.color = 'white';
                    ufElement.style.flexDirection = 'row';

                    const uf1 = document.createElement('div');
                    uf1.classList.add('sub-item');
                    uf1.style.width = '25%';
                    uf1.style.height = '100%';
                    uf1.textContent = `DISJ. ${uf.valor}`;
                    uf1.style.color = 'white';

                    const uf2 = document.createElement('div');
                    uf2.classList.add('sub-item');
                    uf2.style.width = '25%';
                    uf2.style.height = '100%';
                    uf2.textContent = `DISJ. ${uf.valor}`;
                    uf2.style.color = 'white';

                    const uf3 = document.createElement('div');
                    uf3.classList.add('sub-item');
                    uf3.style.width = '25%';
                    uf3.style.height = '100%';
                    uf3.textContent = `DISJ. ${uf.valor}`;
                    uf3.style.color = 'white';

                    const uf4 = document.createElement('div');
                    uf4.classList.add('sub-item');
                    uf4.style.width = '25%';
                    uf4.style.height = '100%';
                    uf4.textContent = `DISJ. ${uf.valor}`;
                    uf4.style.color = 'white';

                    ufElement.appendChild(uf1);
                    ufElement.appendChild(uf2);
                    ufElement.appendChild(uf3);
                    ufElement.appendChild(uf4);

                    lockButton.textContent = 'Mudar';
                    lockButton.classList.add('lock-button');
                    lockButton.onclick = () => openLockMenu(uf, columnIndex, ufElement, barramento);
                    uf1.appendChild(lockButton);
                    columnElement.appendChild(ufElement);
                } else  if (uf.nome === 'Partida Direta Vertical' && Number(uf.valor.match(/\d+/g).join('')) < 30) {
                    ufElement.classList.add('gaveta-vertical');
                    ufElement.style.display = 'flex';
                    ufElement.style.justifyContent = 'center';
                    ufElement.style.width = '100%';
                    ufElement.style.color = 'white';
                    ufElement.style.flexDirection = 'row';

                    const uf1 = document.createElement('div');
                    uf1.classList.add('sub-item');
                    uf1.style.width = '25%';
                    uf1.style.height = '100%';
                    uf1.textContent = `PTD. ${uf.valor}`;
                    uf1.style.color = 'white';

                    const uf2 = document.createElement('div');
                    uf2.classList.add('sub-item');
                    uf2.style.width = '25%';
                    uf2.style.height = '100%';
                    uf2.textContent = `PTD. ${uf.valor}`;
                    uf2.style.color = 'white';

                    const uf3 = document.createElement('div');
                    uf3.classList.add('sub-item');
                    uf3.style.width = '25%';
                    uf3.style.height = '100%';
                    uf3.textContent = `PTD. ${uf.valor}`;
                    uf3.style.color = 'white';

                    const uf4 = document.createElement('div');
                    uf4.classList.add('sub-item');
                    uf4.style.width = '25%';
                    uf4.style.height = '100%';
                    uf4.textContent = `PTD. ${uf.valor}`;
                    uf4.style.color = 'white';

                    ufElement.appendChild(uf1);
                    ufElement.appendChild(uf2);
                    ufElement.appendChild(uf3);
                    ufElement.appendChild(uf4);

                    lockButton.textContent = 'Mudar';
                    lockButton.classList.add('lock-button');
                    lockButton.onclick = () => openLockMenu(uf, columnIndex, ufElement, barramento);
                    uf1.appendChild(lockButton);
                    columnElement.appendChild(ufElement);
                }  
                else {
                    ufElement.classList.add('gaveta-vertical');
                    ufElement.style.display = 'flex';
                    ufElement.style.justifyContent = 'center';
                    ufElement.style.width = '100%';
                    ufElement.style.color = 'white';
                    ufElement.style.flexDirection = 'row';
                    ufElement.style.fontSize = '90%';

                    const uf1 = document.createElement('div');
                    uf1.classList.add('sub-item');
                    uf1.style.width = '50%';
                    uf1.style.height = '100%';
                    uf1.textContent = `${uf.nome} ${uf.valor}`;
                    uf1.style.color = 'white';

                    const uf2 = document.createElement('div');
                    uf2.classList.add('sub-item');
                    uf2.style.width = '50%';
                    uf2.style.height = '100%';
                    uf2.textContent = `${uf.nome} ${uf.valor}`;
                    uf2.style.color = 'white';

                    ufElement.appendChild(uf1);
                    ufElement.appendChild(uf2);

                    lockButton.textContent = 'Mudar';
                    lockButton.classList.add('lock-button');
                    lockButton.onclick = () => openLockMenu(uf, columnIndex, ufElement, barramento);
                    uf1.appendChild(lockButton);
                    columnElement.appendChild(ufElement);
                }
                }else if (uf.largura === 50) {
                    ufElement.classList.add('gaveta-vertical');
                    ufElement.style.width = '50%';
                    ufElement.style.color = 'white';
                    ufElement.style.flexDirection = 'row';

                    const uf1 = document.createElement('div');
                    uf1.classList.add('sub-item');
                    uf1.style.width = '50%';
                    uf1.style.height = '100%';
                    uf1.style.color = 'white';

                    const uf2 = document.createElement('div');
                    uf2.classList.add('sub-item');
                    uf2.style.width = '50%';
                    uf2.style.height = '100%';
                    uf2.style.color = 'white';

                    if (uf.nome === 'Partida Direta Vertical') {
                        uf1.textContent = `PTD. ${uf.valor}`;
                        uf2.textContent = `PTD. ${uf.valor}`;
                    }
                    else if (uf.nome === 'Disjuntor Caixa Moldada Vertical') {
                        uf1.textContent = `DISJ. ${uf.valor}`;
                        uf2.textContent = `DISJ. ${uf.valor}`;
                    }
        
                    ufElement.appendChild(uf1);
                    ufElement.appendChild(uf2);
                    lockButton.textContent = 'Mudar';
                    lockButton.classList.add('lock-button');
                    lockButton.onclick = () => openLockMenu(uf, columnIndex, ufElement, barramento);
                    uf1.appendChild(lockButton);
                    columnElement.appendChild(ufElement);
                } else if (uf.largura === 75) {
                    ufElement.classList.add('gaveta-vertical');
                    ufElement.style.width = '75%';
                    ufElement.style.color = 'white';
                    ufElement.style.flexDirection = 'row';

                    const uf1 = document.createElement('div');
                    uf1.classList.add('sub-item');
                    uf1.style.width = '33.3%';
                    uf1.style.height = '100%';
                    uf1.style.color = 'white';

                    const uf2 = document.createElement('div');
                    uf2.classList.add('sub-item');
                    uf2.style.width = '33.3%';
                    uf2.style.height = '100%';
                    uf2.style.color = 'white';

                    const uf3 = document.createElement('div');
                    uf3.classList.add('sub-item');
                    uf3.style.width = '33.3%';
                    uf3.style.height = '100%';
                    uf3.style.color = 'white';

                    if (uf.nome === 'Partida Direta Vertical') {
                        uf1.textContent = `PTD. ${uf.valor}`;
                        uf2.textContent = `PTD. ${uf.valor}`;
                        uf3.textContent = `PTD. ${uf.valor}`;
                    }
                    else if (uf.nome === 'Disjuntor Caixa Moldada Vertical') {
                        uf1.textContent = `DISJ. ${uf.valor}`;
                        uf2.textContent = `DISJ. ${uf.valor}`;
                        uf3.textContent = `DISJ. ${uf.valor}`;
                    }
        
                    ufElement.appendChild(uf1);
                    ufElement.appendChild(uf2);
                    ufElement.appendChild(uf3);
                    lockButton.textContent = 'Mudar';
                    lockButton.classList.add('lock-button');
                    lockButton.onclick = () => openLockMenu(uf, columnIndex, ufElement, barramento);
                    uf1.appendChild(lockButton);
                    columnElement.appendChild(ufElement);
                } else {
                    if (uf.nome === 'Disjuntor Caixa Moldada Vertical' && uf.largura == 25) {
                        ufElement.textContent = `DISJ. ${uf.valor}`;
                    } else if (uf.nome === 'Partida Direta Vertical' && uf.largura == 25) {
                        ufElement.textContent = `PTD. ${uf.valor}`;
                    } else {
                        ufElement.textContent = `${uf.nome} ${uf.valor}`;
                    }
                    ufElement.style.width = (uf.largura / columnWidthCapacity) * 100 + '%';
                    ufElement.style.fontSize = '90%';
                    lockButton.textContent = 'Mudar';
                    lockButton.classList.add('lock-button');
                    lockButton.onclick = () => openLockMenu(uf, columnIndex, ufElement, barramento);
                    ufElement.appendChild(lockButton);
                    columnElement.appendChild(ufElement);
                }
            });
        });
    }


      

    function openLockMenu(uf, columnIndex, ufElement, barramento) {
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

        if (targetCapacity + parseInt(ufElement.style.height) > columnHeightCapacity / scale) {
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

function algoritmos(sortType, algorithm) {
    let data = JSON.parse(sessionStorage.getItem('data'));
    console.log(data);
    switch (sortType) {
        case 'Crescente':
            data.sort((a, b) => a.altura - b.altura);
            break;
        case 'Decrescente':
            data.sort((a, b) => b.altura - a.altura);
            break;
    }

    const columnHeightCapacity = 1800;  
    const columnWidthCapacity = 100;    
    let heightScale = columnHeightCapacity / 400;

    // Inicializa colunas para cada barramento
    let columns = {
        A: [],
        Tie: [],
        B: []
    };

    // Limpa os containers de cada barramento
    document.getElementById('binA').innerHTML = '';
    document.getElementById('binB').innerHTML = '';
    document.getElementById('binTie').innerHTML = '';

    for (let k = 0; k < data.length; k++) {
        let uf = data[k];
        let { nome, altura, valor, quantidade, barramento, largura } = uf;

        switch (algorithm) {
            case 'bestFit':
                if (nome === 'Tie Breaker' && altura < 1000) {
                    // Encontrar o barramento com mais espaço sobrando
                    let bestBarramento = barramento;
                    let maxAvailableSpace = -1;
        
                    for (let b in columns) {
                        let totalUsedSpace = columns[b].reduce((sum, column) => sum + column.currentCapacity, 0);
                        let availableSpace = columnHeightCapacity * columns[b].length - totalUsedSpace;
        
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
                        if (column.currentCapacity + altura <= columnHeightCapacity) {
                            let waste = columnHeightCapacity - (column.currentCapacity + altura);
                            if (waste < minWaste) {
                                minWaste = waste;
                                bestColumnIndex = i;
                            }
                        }
                    }
                }
        
               
                break;

            case 'nextFit':
                if (nome === 'Tie Breaker' && altura < 1000) {
                    // Encontrar o barramento com mais espaço sobrando
                    let bestBarramento = barramento;
                    let maxAvailableSpace = -1;
        
                    for (let b in columns) {
                        let totalUsedSpace = columns[b].reduce((sum, column) => sum + column.currentCapacity, 0);
                        let availableSpace = columnHeightCapacity * columns[b].length - totalUsedSpace;
        
                        if (availableSpace > maxAvailableSpace) {
                            maxAvailableSpace = availableSpace;
                            bestBarramento = b;
                        }
                    }
        
                    barramento = bestBarramento;
                }
                break;

            case 'binCompletion':
                if (nome === 'Tie Breaker' && altura < 1000) {
                    let bestBarramento = barramento;
                    let maxAvailableSpace = -1;
        
                    for (let b in columns) {
                        let totalUsedSpace = columns[b].reduce((sum, column) => sum + column.currentCapacity, 0);
                        let availableSpace = columnHeightCapacity * columns[b].length - totalUsedSpace;
        
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
                        if (column.currentCapacity + altura <= columnHeightCapacity) {
                            let waste = columnHeightCapacity - (column.currentCapacity + altura);
                            if (waste < minWaste) {
                                minWaste = waste;
                                bestColumnIndex = i;
                            }
                        }
                    }
        
                }
                break;

            default:
                console.error("Algoritmo não reconhecido: " + algorithm);
                break;
        }

        if (largura > 25 && largura <= 50) {
            let pares = Math.floor(quantidade / 2);
            let restante = quantidade % 2;

            for (let p = 0; p < pares; p++) {
                let novaUF = {
                    nome: `${nome}`,
                    altura: altura,  
                    valor: valor,  
                    largura: 100,  
                    barramento: barramento,
                    quantidade: 1
                };

                
                adicionarUF(novaUF, columns, barramento, columnHeightCapacity, true);
            }

            
            if (restante === 1) {
                adicionarUF(uf, columns, barramento, columnHeightCapacity, false);
            }
        } else if (largura <= 25) {
            let gruposDeQuatro = Math.floor(quantidade / 4);
            let restante = quantidade % 4;
        
            for (let p = 0; p < gruposDeQuatro; p++) {
                let novaUF = {
                    nome: `${nome}`,
                    altura: altura,  
                    valor: valor,  
                    largura: 100,  
                    barramento: barramento,
                    quantidade: 1
                };
        
                adicionarUF(novaUF, columns, barramento, columnHeightCapacity, true);
            }
        
            // Lida com os casos onde o restante é 1, 2 ou 3
            if (restante > 0) {
                let larguraTotal = restante * 25; // Calcula a largura total necessária
        
                let novaUF = {
                    nome: `${nome}`,
                    altura: altura,
                    valor: valor,
                    largura: larguraTotal,
                    barramento: barramento,
                    quantidade: 1
                };
        
                adicionarUF(novaUF, columns, barramento, columnHeightCapacity, false);
            }
        } else {
            for (let j = 0; j < quantidade; j++) {
                adicionarUF(uf, columns, barramento, columnHeightCapacity, false);
            }
        }
        
    }

    for (let barramento in columns) {
        const barramentoColumns = columns[barramento];
        const barramentoContainer = document.getElementById(`bin${barramento}`);

        const titleElement = document.createElement('h2');
        titleElement.textContent = `Barramento ${barramento}`;
        barramentoContainer.appendChild(titleElement);

        barramentoColumns.forEach((column) => {
            const columnElement = document.createElement('div');
            columnElement.classList.add('bins');
            barramentoContainer.appendChild(columnElement);

            column.ufs.forEach(uf => {
                const ufElement = document.createElement('div');
                ufElement.classList.add('item');
                ufElement.style.height = (uf.altura / heightScale) + 'px';

                if (uf.largura === 100) {
                  if (uf.nome === 'Disjuntor Caixa Moldada Vertical') {
                    ufElement.classList.add('gaveta-vertical');
                    ufElement.style.display = 'flex';
                    ufElement.style.justifyContent = 'center';
                    ufElement.style.width = '100%';
                    ufElement.style.color = 'white';

                    const uf1 = document.createElement('div');
                    uf1.classList.add('sub-item');
                    uf1.style.width = '25%';
                    uf1.style.height = '100%';
                    uf1.textContent = `DISJ. ${uf.valor}`;
                    uf1.style.color = 'white';

                    const uf2 = document.createElement('div');
                    uf2.classList.add('sub-item');
                    uf2.style.width = '25%';
                    uf2.style.height = '100%';
                    uf2.textContent = `DISJ. ${uf.valor}`;
                    uf2.style.color = 'white';

                    const uf3 = document.createElement('div');
                    uf3.classList.add('sub-item');
                    uf3.style.width = '25%';
                    uf3.style.height = '100%';
                    uf3.textContent = `DISJ. ${uf.valor}`;
                    uf3.style.color = 'white';

                    const uf4 = document.createElement('div');
                    uf4.classList.add('sub-item');
                    uf4.style.width = '25%';
                    uf4.style.height = '100%';
                    uf4.textContent = `DISJ. ${uf.valor}`;
                    uf4.style.color = 'white';


            
                    ufElement.appendChild(uf1);
                    ufElement.appendChild(uf2);
                    ufElement.appendChild(uf3);
                    ufElement.appendChild(uf4);
                  } else if (uf.nome === 'Partida Direta Vertical' && Number(uf.valor.match(/\d+/g).join('')) < 30) {
                    ufElement.classList.add('gaveta-vertical');
                    ufElement.style.display = 'flex';
                    ufElement.style.justifyContent = 'center';
                    ufElement.style.width = '100%';
                    ufElement.style.color = 'white';

                    const uf1 = document.createElement('div');
                    uf1.classList.add('sub-item');
                    uf1.style.width = '25%';
                    uf1.style.height = '100%';
                    uf1.textContent = `PTD. ${uf.valor}`;
                    uf1.style.color = 'white';

                    const uf2 = document.createElement('div');
                    uf2.classList.add('sub-item');
                    uf2.style.width = '25%';
                    uf2.style.height = '100%';
                    uf2.textContent = `PTD. ${uf.valor}`;
                    uf2.style.color = 'white';

                    const uf3 = document.createElement('div');
                    uf3.classList.add('sub-item');
                    uf3.style.width = '25%';
                    uf3.style.height = '100%';
                    uf3.textContent = `PTD. ${uf.valor}`;
                    uf3.style.color = 'white';

                    const uf4 = document.createElement('div');
                    uf4.classList.add('sub-item');
                    uf4.style.width = '25%';
                    uf4.style.height = '100%';
                    uf4.textContent = `PTD. ${uf.valor}`;
                    uf4.style.color = 'white';


            
                    ufElement.appendChild(uf1);
                    ufElement.appendChild(uf2);
                    ufElement.appendChild(uf3);
                    ufElement.appendChild(uf4);
                  } 
                  else {
                    ufElement.classList.add('gaveta-vertical');
                    ufElement.style.display = 'flex';
                    ufElement.style.justifyContent = 'center';
                    ufElement.style.width = '100%';
                    ufElement.style.color = 'white';

                    const uf1 = document.createElement('div');
                    uf1.classList.add('sub-item');
                    uf1.style.width = '50%';
                    uf1.style.height = '100%';
                    uf1.textContent = `${uf.nome} ${uf.valor}`;
                    uf1.style.color = 'white';

                    const uf2 = document.createElement('div');
                    uf2.classList.add('sub-item');
                    uf2.style.width = '50%';
                    uf2.style.height = '100%';
                    uf2.textContent = `${uf.nome} ${uf.valor}`;
                    uf2.style.color = 'white';


            
                    ufElement.appendChild(uf1);
                    ufElement.appendChild(uf2);
                  } 
                } else if (uf.largura === 50) {
                    ufElement.classList.add('gaveta-vertical');
                    ufElement.style.width = '50%';
                    ufElement.style.color = 'white';

                    const uf1 = document.createElement('div');
                    uf1.classList.add('sub-item');
                    uf1.style.width = '50%';
                    uf1.style.height = '100%';
                    uf1.style.color = 'white';

                    const uf2 = document.createElement('div');
                    uf2.classList.add('sub-item');
                    uf2.style.width = '50%';
                    uf2.style.height = '100%';
                    uf2.style.color = 'white';

                    if (uf.nome === 'Partida Direta Vertical') {
                        uf1.textContent = `PTD. ${uf.valor}`;
                        uf2.textContent = `PTD. ${uf.valor}`;
                    }
                    else if (uf.nome === 'Disjuntor Caixa Moldada Vertical') {
                        uf1.textContent = `DISJ. ${uf.valor}`;
                        uf2.textContent = `DISJ. ${uf.valor}`;
                    }
        
                    ufElement.appendChild(uf1);
                    ufElement.appendChild(uf2);
                } else if (uf.largura === 75) {
                    ufElement.classList.add('gaveta-vertical');
                    ufElement.style.width = '75%';
                    ufElement.style.color = 'white';

                    const uf1 = document.createElement('div');
                    uf1.classList.add('sub-item');
                    uf1.style.width = '33.3%';
                    uf1.style.height = '100%';
                    uf1.style.color = 'white';

                    const uf2 = document.createElement('div');
                    uf2.classList.add('sub-item');
                    uf2.style.width = '33.3%';
                    uf2.style.height = '100%';
                    uf2.style.color = 'white';

                    const uf3 = document.createElement('div');
                    uf3.classList.add('sub-item');
                    uf3.style.width = '33.3%';
                    uf3.style.height = '100%';
                    uf3.style.color = 'white';

                    if (uf.nome === 'Partida Direta Vertical') {
                        uf1.textContent = `PTD. ${uf.valor}`;
                        uf2.textContent = `PTD. ${uf.valor}`;
                        uf3.textContent = `PTD. ${uf.valor}`;
                    }
                    else if (uf.nome === 'Disjuntor Caixa Moldada Vertical') {
                        uf1.textContent = `DISJ. ${uf.valor}`;
                        uf2.textContent = `DISJ. ${uf.valor}`;
                        uf3.textContent = `DISJ. ${uf.valor}`;
                    }
        
                    ufElement.appendChild(uf1);
                    ufElement.appendChild(uf2);
                    ufElement.appendChild(uf3);
                } else {
            
                    ufElement.style.width = (uf.largura / columnWidthCapacity) * 100 + '%';
                    if (uf.nome === 'Disjuntor Caixa Moldada Vertical' && uf.largura == 25) {
                        ufElement.textContent = `DISJ. ${uf.valor}`;
                    }
                    else if (uf.nome === 'Partida Direta Vertical' && uf.largura == 25) {
                        ufElement.textContent = `PTD. ${uf.valor}`;
                    }
                    else {
                        ufElement.textContent = `${uf.nome} ${uf.valor}`;
                    }
                }

                columnElement.appendChild(ufElement);
            });
        });
    }
}

function adicionarUF(uf, columns, barramento, columnHeightCapacity, gavetaVertical) {
    let { nome, altura, valor, largura } = uf;
    let relevantColumns = columns[barramento];

    
    if (relevantColumns.length === 0) {
        const newColumn = {
            currentCapacity: altura,
            ufs: [{ nome, altura, valor, largura, gavetaVertical }]
        };
        relevantColumns.push(newColumn);
    } else {
        
        let lastColumn = relevantColumns[relevantColumns.length - 1];

        if (lastColumn.currentCapacity + altura <= columnHeightCapacity) {
            lastColumn.ufs.push({ nome, altura, valor, largura, gavetaVertical });
            lastColumn.currentCapacity += altura;
        } else {
            
            const newColumn = {
                currentCapacity: altura,
                ufs: [{ nome, altura, valor, largura, gavetaVertical }]
            };
            relevantColumns.push(newColumn);
        }
    }
}
