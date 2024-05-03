// Definir as Principais Entradas
let fabricante = document.getElementById('fabricante');
let unidadeFuncional = document.getElementById('unidadeFuncional');
let valor = document.getElementById('valor');
let quantidade = document.getElementById('quantidade');
let addUF = document.getElementById('addUF');
let addPanel = document.getElementById('addPanel');


// Quando um Fabricante for selecionado
fabricante.addEventListener('change', () => {
    // Defina cada conexão de Banco de Dados de Cada Fabricante
    let fabricantes = {
        'WEG': () => {

        },

        'ABB': () => {

        },

        'SCHNEIDER': () => {

        },

        'SIEMENS': () => {

        }
    }

    // Seleciona o Valor
    let valor = fabricante.value;

    // Se o Fabricante for Selecionado
    if (fabricantes[valor]) {
        // Conecte com o Banco de dados do Fabricante
        fabricantes[valor]();
    }
})


// Quando uma Unidade Funcional for Selecionada
unidadeFuncional.addEventListener('change', () => {
    const unidadesFuncionais = {
        'PTDD': function() {
            // Mudar o Nome da Label e Placeholder
            document.querySelector('#label').innerHTML = "Potência"
            document.querySelector('#valor').placeholder = "Digite a Potência"
            return 'Ptddireta';
        },

        'PTDR': () => {
            document.querySelector('#label').innerHTML = "Potência";
            document.querySelector('#valor').placeholder = "Digite a Potência"
            return 'Ptdreversa';
        },

        'DISJ': () => {
            document.querySelector('#label').innerHTML = "Corrente";
            document.querySelector('#valor').placeholder = "Digite a Corrente";
            return 'Disjuntor';
        },

        'ALI': () => {
            document.querySelector('#label').innerHTML = "Corrente";
            document.querySelector('#valor').placeholder = "Digite a Corrente";
            return 'alimentador';
        },

        'INV': () => {
            document.querySelector('#label').innerHTML = "Potência";
            document.querySelector('#valor').placeholder = "Digite a Potência"
            return 'inversor';
        },

        'SOFT': () => {
            document.querySelector('#label').innerHTML = "Potência";
            document.querySelector('#valor').placeholder = "Digite a Potência"
            return 'softstarter';
        },
    }

    let valor = unidadeFuncional.value;

    if (unidadesFuncionais[valor]) {
        unidadesFuncionais[valor]();
    }
});

// Quando o Botão de Adicionar UF for Clicado
addUF.addEventListener('click', () => {
});