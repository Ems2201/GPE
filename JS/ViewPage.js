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

    numeroColunas();
    atualizeColunas();
}

function numeroColunas() {
    const numeroColunas = document.getElementById('TotalColumns');
    const colunas = document.querySelectorAll('#bin .bins');
    numeroColunas.textContent = `Total de Colunas: ${colunas.length}`;
}

function atualizeColunas() {
    const barramentos = ['Tie', 'A', 'B'];

    barramentos.forEach(barramento => {
        const container = document.getElementById(`bin${barramento}`);
        const colunas = container.querySelectorAll('.bins');

        const colunasVazias = Array.from(colunas).every(coluna => coluna.children.length === 0);

        container.style.display = colunasVazias ? 'none' : 'flex';
    });

    numeroColunas();
}

function bestFitMelhorado() {
    let dados = JSON.parse(sessionStorage.getItem('dados'));

    dados.sort((a, b) => b.altura - a.altura);

    function embaralheDados(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    const alturaColuna = 1800;
    const larguraColuna = 100;
    let escalaPixels = alturaColuna / 400;
    let somaAlturas = dados.reduce((soma, uf) => soma + (uf.altura * uf.quantidade), 0);
    let limiteColunas = Math.ceil(somaAlturas / alturaColuna);

    let colunas = {
        A: [],
        Tie: [],
        B: []
    };

    let melhoresColunas = { A: [], Tie: [], B: [] };
    let melhorNumeroColunas = Infinity;
    let maiorNumeroColunasCheias = 0;
    const container = document.getElementById('bin');
    container.innerHTML = '';

    function adicionarItemNaLista(dados) {
        let colunasTentadas = JSON.parse(JSON.stringify(colunas));
        
        for (let k = 0; k < dados.length; k++) {
            const uf = dados[k];
            let { nome, altura, valor, quantidade, barramento, largura } = uf;

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

                    adicionarUF(novaUF, colunasTentadas, barramento, alturaColuna, true, 'bestFit');
                }

                if (restante === 1) {
                    adicionarUF(uf, colunasTentadas, barramento, alturaColuna, false, 'bestFit');
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
    
                        adicionarUF(novaUF, colunasTentadas, barramento, alturaColuna, true, 'bestFit');
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
                        

                        adicionarUF(novaUF, colunasTentadas, barramento, alturaColuna, false, 'bestFit');
                    }
            } else {
                for (let j = 0; j < quantidade; j++) {
                    adicionarUF(uf, colunasTentadas, barramento, alturaColuna, false, 'bestFit');
                }
            }
        }

        return colunasTentadas;
    }

    let tentativas = 0;
    const maximoTentativas = 100;
    while (tentativas < maximoTentativas) {
        let colunasTentadas = adicionarItemNaLista(dados);
        let numeroColunas = Object.values(colunasTentadas).reduce((quantidade, barramento) => quantidade + barramento.length, 0);
        let quantidadeColunasCheias = Object.values(colunasTentadas).reduce((quantidade, barramento) => quantidade + barramento.filter(coluna => coluna.alturaColuna === alturaColuna).length, 0);

        if (numeroColunas < melhorNumeroColunas || quantidadeColunasCheias > maiorNumeroColunasCheias) {
            melhorNumeroColunas = numeroColunas;
            melhoresColunas = colunasTentadas;
            maiorNumeroColunasCheias = quantidadeColunasCheias;
        }

        if (melhorNumeroColunas <= limiteColunas && quantidadeColunasCheias === numeroColunas) {
            break;
        }

        embaralheDados(dados);
        tentativas++;
    }

    for (let barramento in melhoresColunas) {
        const colunasBarramento = melhoresColunas[barramento];
        const barramentoContainer = document.createElement('div');
        barramentoContainer.id = `bin${barramento}`;
        barramentoContainer.innerHTML = `<h2>Barramento ${barramento}</h2>`;
        container.appendChild(barramentoContainer);

        colunasBarramento.forEach((coluna, columnIndex) => {
            const elementoColuna = document.createElement('div');
            elementoColuna.classList.add('bins');
            barramentoContainer.appendChild(elementoColuna);
            
            coluna.ufs.forEach((uf, ufIndex) => {
                const elementoUF = document.createElement('div');
                elementoUF.classList.add('item');
                elementoUF.classList.add('large');
                elementoUF.style.height = (uf.altura / escalaPixels) + 'px';

                const buttonMudar = document.createElement('button');
                buttonMudar.textContent = 'Mudar';
                buttonMudar.classList.add('lock-button');
                buttonMudar.onclick = () => menuMudarUF(uf, columnIndex, elementoUF, barramento);
                elementoUF.appendChild(buttonMudar);
                elementoColuna.appendChild(elementoUF);

                if (uf.largura === 100 && uf.gavetaVertical) {
                    if (uf.nome === 'Disjuntor Caixa Moldada Vertical') {
                    elementoUF.classList.add('gaveta-vertical');
                    elementoUF.style.display = 'flex';
                    elementoUF.style.justifyContent = 'center';
                    elementoUF.style.width = '100%';
                    elementoUF.style.color = 'white';
                    elementoUF.style.flexDirection = 'row';

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

                    elementoUF.appendChild(uf1);
                    elementoUF.appendChild(uf2);
                    elementoUF.appendChild(uf3);
                    elementoUF.appendChild(uf4);

                    buttonMudar.textContent = 'Mudar';
                    buttonMudar.classList.add('lock-button');
                    buttonMudar.onclick = () => menuMudarUF(uf, columnIndex, elementoUF, barramento);
                    uf1.appendChild(buttonMudar);
                    elementoColuna.appendChild(elementoUF);
                } else  if (uf.nome === 'Partida Direta Vertical' && Number(uf.valor.match(/\d+/g).join('')) < 30) {
                    elementoUF.classList.add('gaveta-vertical');
                    elementoUF.style.display = 'flex';
                    elementoUF.style.justifyContent = 'center';
                    elementoUF.style.width = '100%';
                    elementoUF.style.color = 'white';
                    elementoUF.style.flexDirection = 'row';

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

                    elementoUF.appendChild(uf1);
                    elementoUF.appendChild(uf2);
                    elementoUF.appendChild(uf3);
                    elementoUF.appendChild(uf4);

                    buttonMudar.textContent = 'Mudar';
                    buttonMudar.classList.add('lock-button');
                    buttonMudar.onclick = () => menuMudarUF(uf, columnIndex, elementoUF, barramento);
                    uf1.appendChild(buttonMudar);
                    elementoColuna.appendChild(elementoUF);
                }  
                else {
                    elementoUF.classList.add('gaveta-vertical');
                    elementoUF.style.display = 'flex';
                    elementoUF.style.justifyContent = 'center';
                    elementoUF.style.width = '100%';
                    elementoUF.style.color = 'white';
                    elementoUF.style.flexDirection = 'row';
                    elementoUF.style.fontSize = '90%';

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

                    elementoUF.appendChild(uf1);
                    elementoUF.appendChild(uf2);

                    buttonMudar.textContent = 'Mudar';
                    buttonMudar.classList.add('lock-button');
                    buttonMudar.onclick = () => menuMudarUF(uf, columnIndex, elementoUF, barramento);
                    uf1.appendChild(buttonMudar);
                    elementoColuna.appendChild(elementoUF);
                }
                }else if (uf.largura === 50) {
                    elementoUF.classList.add('gaveta-vertical');
                    elementoUF.style.width = '50%';
                    elementoUF.style.color = 'white';
                    elementoUF.style.flexDirection = 'row';

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
        
                    elementoUF.appendChild(uf1);
                    elementoUF.appendChild(uf2);
                    buttonMudar.textContent = 'Mudar';
                    buttonMudar.classList.add('lock-button');
                    buttonMudar.onclick = () => menuMudarUF(uf, columnIndex, elementoUF, barramento);
                    uf1.appendChild(buttonMudar);
                    elementoColuna.appendChild(elementoUF);
                } else if (uf.largura === 75) {
                    elementoUF.classList.add('gaveta-vertical');
                    elementoUF.style.width = '75%';
                    elementoUF.style.color = 'white';
                    elementoUF.style.flexDirection = 'row';

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
        
                    elementoUF.appendChild(uf1);
                    elementoUF.appendChild(uf2);
                    elementoUF.appendChild(uf3);
                    buttonMudar.textContent = 'Mudar';
                    buttonMudar.classList.add('lock-button');
                    buttonMudar.onclick = () => menuMudarUF(uf, columnIndex, elementoUF, barramento);
                    uf1.appendChild(buttonMudar);
                    elementoColuna.appendChild(elementoUF);
                } else {
                    if (uf.nome === 'Disjuntor Caixa Moldada Vertical' && uf.largura == 25) {
                        elementoUF.textContent = `DISJ. ${uf.valor}`;
                    } else if (uf.nome === 'Partida Direta Vertical' && uf.largura == 25) {
                        elementoUF.textContent = `PTD. ${uf.valor}`;
                    } else {
                        elementoUF.textContent = `${uf.nome} ${uf.valor}`;
                    }
                    elementoUF.style.width = (uf.largura / larguraColuna) * 100 + '%';
                    elementoUF.style.fontSize = '90%';
                    buttonMudar.textContent = 'Mudar';
                    buttonMudar.classList.add('lock-button');
                    buttonMudar.onclick = () => menuMudarUF(uf, columnIndex, elementoUF, barramento);
                    elementoUF.appendChild(buttonMudar);
                    elementoColuna.appendChild(elementoUF);
                }
            });
        });
    }


      

    function menuMudarUF(uf, columnIndex, elementoUF, barramento) {
        const menuExistente = document.querySelector('.lock-menu');
        if (menuExistente) {
            document.body.removeChild(menuExistente);
        }

        const menuMudar = document.createElement('div');
        menuMudar.classList.add('lock-menu');

        const labelMudar = document.createElement('label');
        labelMudar.textContent = 'Selecione a Coluna:';
        menuMudar.appendChild(labelMudar);

        const selectMudar = document.createElement('select');
        for (let i = 0; i < document.querySelectorAll(`#bin${barramento} .bins`).length; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = `Coluna ${i + 1}`;
            selectMudar.appendChild(option);
        }
        menuMudar.appendChild(selectMudar);

        const buttonMudar = document.createElement('button');
        buttonMudar.textContent = 'Mudar';
        buttonMudar.onclick = () => lockItemToColumn(uf, columnIndex, elementoUF, selectMudar.value, barramento);
        menuMudar.appendChild(buttonMudar);

        document.body.insertBefore(menuMudar, document.body.firstChild);
    }

    function lockItemToColumn(uf, columnIndex, elementoUF, targetColumnIndex, barramento) {
        const elementoColuna = document.querySelectorAll(`#bin${barramento} .bins`)[columnIndex];
        if (elementoColuna.contains(elementoUF)) {
            elementoColuna.removeChild(elementoUF);
        }

        let capacidadeAtual = Array.from(elementoColuna.children)
            .filter(item => item.classList.contains('item'))
            .reduce((soma, item) => soma + parseInt(item.style.height), 0);

        if (capacidadeAtual === 0) {
            elementoColuna.parentElement.removeChild(elementoColuna);
        }

        let colunaSelecionada = document.querySelectorAll(`#bin${barramento} .bins`)[targetColumnIndex];

        if (!colunaSelecionada) {
            colunaSelecionada = document.createElement('div');
            colunaSelecionada.classList.add('bins');
            document.getElementById(`bin${barramento}`).appendChild(colunaSelecionada);
        }

        let capacidadeSelecionada = Array.from(colunaSelecionada.children)
            .filter(item => item.classList.contains('item'))
            .reduce((soma, item) => soma + parseInt(item.style.height), 0);

        if (capacidadeSelecionada + parseInt(elementoUF.style.height) > alturaColuna / escalaPixels) {
            const novaElementoColuna = document.createElement('div');
            novaElementoColuna.classList.add('bins');
            document.getElementById(`bin${barramento}`).appendChild(novaElementoColuna);
            novaElementoColuna.appendChild(elementoUF);
        } else {
            colunaSelecionada.appendChild(elementoUF);
        }

        let dados = JSON.parse(sessionStorage.getItem('dados'));
        let ufdados = dados.find(item => item.nome === uf.nome && item.valor === uf.valor);
        ufdados.lockedColumn = targetColumnIndex;
        sessionStorage.setItem('dados', JSON.stringify(dados));

        const menuMudar = document.querySelector('.lock-menu');
        if (menuMudar) {
            document.body.removeChild(menuMudar);
        }

        document.querySelectorAll('.bins').forEach(elementoColuna => {
            if (elementoColuna.children.length === 0) {
                elementoColuna.parentElement.removeChild(elementoColuna);
            }
        });
    }
}

function algoritmos(sortType, algoritmo) {
    let dados = JSON.parse(sessionStorage.getItem('dados'));
    switch (sortType) {
        case 'Crescente':
            dados.sort((a, b) => a.altura - b.altura);
            break;
        case 'Decrescente':
            dados.sort((a, b) => b.altura - a.altura);
            break;
    }

    const alturaColuna = 1800;  
    const larguraColuna = 100;    
    let heightScale = alturaColuna / 400;

    // Inicializa colunas para cada barramento
    let colunas = {
        A: [],
        Tie: [],
        B: []
    };

    // Limpa os containers de cada barramento
    document.getElementById('binA').innerHTML = '';
    document.getElementById('binB').innerHTML = '';
    document.getElementById('binTie').innerHTML = '';

    for (let k = 0; k < dados.length; k++) {
        let uf = dados[k];
        let { nome, altura, valor, quantidade, barramento, largura } = uf;

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

                
                adicionarUF(novaUF, colunas, barramento, alturaColuna, true, algoritmo);
            }

            
            if (restante === 1) {
                adicionarUF(uf, colunas, barramento, alturaColuna, false, algoritmo);
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
        
                adicionarUF(novaUF, colunas, barramento, alturaColuna, true, algoritmo);
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
        
                adicionarUF(novaUF, colunas, barramento, alturaColuna, false, algoritmo);
            }
        } else {
            for (let j = 0; j < quantidade; j++) {
                adicionarUF(uf, colunas, barramento, alturaColuna, false, algoritmo);
            }
        }
        
    }

    for (let barramento in colunas) {
        const colunasBarramento = colunas[barramento];
        const barramentoContainer = document.getElementById(`bin${barramento}`);

        const nomeBarramento = document.createElement('h2');
        nomeBarramento.textContent = `Barramento ${barramento}`;
        barramentoContainer.appendChild(nomeBarramento);

        colunasBarramento.forEach((coluna) => {
            const elementoColuna = document.createElement('div');
            elementoColuna.classList.add('bins');
            barramentoContainer.appendChild(elementoColuna);

            coluna.ufs.forEach(uf => {
                const elementoUF = document.createElement('div');
                elementoUF.classList.add('item');
                elementoUF.style.height = (uf.altura / heightScale) + 'px';

                if (uf.largura === 100) {
                  if (uf.nome === 'Disjuntor Caixa Moldada Vertical') {
                    elementoUF.classList.add('gaveta-vertical');
                    elementoUF.style.display = 'flex';
                    elementoUF.style.justifyContent = 'center';
                    elementoUF.style.width = '100%';
                    elementoUF.style.color = 'white';

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


            
                    elementoUF.appendChild(uf1);
                    elementoUF.appendChild(uf2);
                    elementoUF.appendChild(uf3);
                    elementoUF.appendChild(uf4);
                  } else if (uf.nome === 'Partida Direta Vertical' && Number(uf.valor.match(/\d+/g).join('')) < 30) {
                    elementoUF.classList.add('gaveta-vertical');
                    elementoUF.style.display = 'flex';
                    elementoUF.style.justifyContent = 'center';
                    elementoUF.style.width = '100%';
                    elementoUF.style.color = 'white';

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


            
                    elementoUF.appendChild(uf1);
                    elementoUF.appendChild(uf2);
                    elementoUF.appendChild(uf3);
                    elementoUF.appendChild(uf4);
                  } 
                  else {
                    elementoUF.classList.add('gaveta-vertical');
                    elementoUF.style.display = 'flex';
                    elementoUF.style.justifyContent = 'center';
                    elementoUF.style.width = '100%';
                    elementoUF.style.color = 'white';

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


            
                    elementoUF.appendChild(uf1);
                    elementoUF.appendChild(uf2);
                  } 
                } else if (uf.largura === 50) {
                    elementoUF.classList.add('gaveta-vertical');
                    elementoUF.style.width = '50%';
                    elementoUF.style.color = 'white';

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
        
                    elementoUF.appendChild(uf1);
                    elementoUF.appendChild(uf2);
                } else if (uf.largura === 75) {
                    elementoUF.classList.add('gaveta-vertical');
                    elementoUF.style.width = '75%';
                    elementoUF.style.color = 'white';

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
        
                    elementoUF.appendChild(uf1);
                    elementoUF.appendChild(uf2);
                    elementoUF.appendChild(uf3);
                } else {
            
                    elementoUF.style.width = (uf.largura / larguraColuna) * 100 + '%';
                    if (uf.nome === 'Disjuntor Caixa Moldada Vertical' && uf.largura == 25) {
                        elementoUF.textContent = `DISJ. ${uf.valor}`;
                    }
                    else if (uf.nome === 'Partida Direta Vertical' && uf.largura == 25) {
                        elementoUF.textContent = `PTD. ${uf.valor}`;
                    }
                    else {
                        elementoUF.textContent = `${uf.nome} ${uf.valor}`;
                    }
                }

                elementoColuna.appendChild(elementoUF);
            });
        });
    }
}

function adicionarUF(uf, colunas, barramento, alturaColuna, gavetaVertical, algoritmo = 'bestFit') {
    let { nome, altura, valor, largura } = uf;

    if (nome === 'Tie Breaker' && altura < 1000) {
        let melhorBarramento = barramento;
        let maiorEspacoSobrando = -1;

        for (let b in colunas) {
            let espacoTotalUsado = colunas[b].reduce((soma, coluna) => soma + coluna.capacidadeAtual, 0);
            let espacoDisponivel = alturaColuna * colunas[b].length - espacoTotalUsado;

            if (espacoDisponivel > maiorEspacoSobrando) {
                maiorEspacoSobrando = espacoDisponivel;
                melhorBarramento = b;
            }
        }

        barramento = melhorBarramento;
    }

    let colunasBarramento = colunas[barramento];

    switch (algoritmo) {
        case 'bestFit':
            let melhorColuna = null;
            let menorEspacoSobrando = alturaColuna + 1;

            colunasBarramento.forEach((coluna) => {
                const espacoDisponivel = alturaColuna - coluna.capacidadeAtual;
                if (espacoDisponivel >= altura && espacoDisponivel < menorEspacoSobrando) {
                    melhorColuna = coluna;
                    menorEspacoSobrando = espacoDisponivel;
                }
            });

            if (melhorColuna) {
                melhorColuna.ufs.push({ nome, altura, valor, largura, gavetaVertical });
                melhorColuna.capacidadeAtual += altura;
            } else {
                const novaColuna = {
                    capacidadeAtual: altura,
                    ufs: [{ nome, altura, valor, largura, gavetaVertical }]
                };
                colunasBarramento.push(novaColuna);
            }
            break;

        case 'nextFit':
            let ultimaColuna = colunasBarramento[colunasBarramento.length - 1];

            if (ultimaColuna && ultimaColuna.capacidadeAtual + altura <= alturaColuna) {
                ultimaColuna.ufs.push({ nome, altura, valor, largura, gavetaVertical });
                ultimaColuna.capacidadeAtual += altura;
            } else {
                const novaColuna = {
                    capacidadeAtual: altura,
                    ufs: [{ nome, altura, valor, largura, gavetaVertical }]
                };
                colunasBarramento.push(novaColuna);
            }
            break;

        case 'binCompletion':
            let colunaSelecionada = colunasBarramento.find(coluna => coluna.capacidadeAtual + altura <= alturaColuna);
            if (colunaSelecionada) {
                colunaSelecionada.ufs.push({ nome, altura, valor, largura, gavetaVertical });
                colunaSelecionada.capacidadeAtual += altura;
            } else {
                const novaColuna = {
                    capacidadeAtual: altura,
                    ufs: [{ nome, altura, valor, largura, gavetaVertical }]
                };
                colunasBarramento.push(novaColuna);
            }
            break;

        default:
            console.error('Algoritmo desconhecido:', algoritmo);
            break;
    }
}

