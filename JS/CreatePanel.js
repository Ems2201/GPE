const fabricantes = [
    {
        nome: 'ABB',
        unidadesFuncionais: [
            {
                nome: 'Disjuntor',
                dados: [
                    { altura: 150, valor: 30 }, { altura: 150, valor: 40 }, { altura: 150, valor: 63 }, { altura: 150, valor: 80 },
                    { altura: 150, valor: 100 }, { altura: 150, valor: 125 }, { altura: 150, valor: 250 }, { altura: 300, valor: 320 },
                    { altura: 300, valor: 400 }, { altura: 300, valor: 630 }, { altura: 1800, valor: 800 }, { altura: 1800, valor: 1000 },
                    { altura: 1800, valor: 1250 }, { altura: 1800, valor: 1600 }, { altura: 1800, valor: 2000 }, { altura: 1800, valor: 2500 },
                    { altura: 1800, valor: 3200 }, { altura: 1800, valor: 4000 }, { altura: 1800, valor: 5000 }, { altura: 1800, valor: 6300 }
                ]
            },
            {
                nome: 'Partida Direta',
                dados: [
                    { altura: 150, valor: 0.5 }, { altura: 150, valor: 0.75 }, { altura: 150, valor: 1 }, { altura: 150, valor: 1.5 },
                    { altura: 150, valor: 2 }, { altura: 150, valor: 3 }, { altura: 150, valor: 5 }, { altura: 300, valor: 7.5 },
                    { altura: 300, valor: 10 }, { altura: 300, valor: 15 }, { altura: 300, valor: 20 }, { altura: 300, valor: 25 },
                    { altura: 300, valor: 30 }, { altura: 450, valor: 40 }, { altura: 450, valor: 50 }, { altura: 600, valor: 60 },
                    { altura: 600, valor: 75 }, { altura: 750, valor: 100 }, { altura: 900, valor: 125 }, { altura: 900, valor: 150 },
                    { altura: 1050, valor: 200 }, { altura: 1800, valor: 250 }, { altura: 1800, valor: 300 }, { altura: 1800, valor: 350 },
                    { altura: 1800, valor: 400 }
                ]
            },
                {
                nome: 'Partida Reversora',
                dados: [
                    { altura: 450, valor: 0.75 }, { altura: 450, valor: 1 }, { altura: 450, valor: 2 }, { altura: 450, valor: 3 },
                    { altura: 450, valor: 5 }, { altura: 450, valor: 7.5 }, { altura: 450, valor: 10 }, { altura: 450, valor: 15 },
                    { altura: 450, valor: 20 }, { altura: 450, valor: 25 }, { altura: 450, valor: 30 }, { altura: 450, valor: 40 },
                    { altura: 450, valor: 50 }, { altura: 900, valor: 60 }, { altura: 900, valor: 75 }, { altura: 1050, valor: 100 },
                    { altura: 1200, valor: 125 }, { altura: 1800, valor: 150 }, { altura: 1800, valor: 200 }, { altura: 1800, valor: 250 },
                    { altura: 1800, valor: 300 }, { altura: 1800, valor: 350 }, { altura: 1800, valor: 400 }
                ]
            },
             {
                nome: 'Alimentador',
                dados: [
                    { altura: 150, valor: 63 }, { altura: 150, valor: 80 }, { altura: 150, valor: 100 }, { altura: 150, valor: 160 },
                    { altura: 200, valor: 200 }, { altura: 250, valor: 250 }, { altura: 250, valor: 320 }, { altura: 250, valor: 400 },
                    { altura: 250, valor: 630 }, { altura: 600, valor: 800 }, { altura: 600, valor: 1000 }, { altura: 600, valor: 1250 },
                    { altura: 600, valor: 1600 }, { altura: 900, valor: 2000 }, { altura: 900, valor: 2500 }, { altura: 1800, valor: 3200 },
                    { altura: 1800, valor: 4000 }, { altura: 1800, valor: 5000 }, { altura: 1800, valor: 6300 }
                ]
             },
             {
                nome: 'Inversor',
                dados: [
                    { altura: 450, valor: 0.75 }, { altura: 450, valor: 1.1 }, { altura: 450, valor: 1.5 }, { altura: 450, valor: 2.2 },
                    { altura: 450, valor: 3 }, { altura: 450, valor: 4 }, { altura: 450, valor: 5.5 }, { altura: 450, valor: 7.5 },
                    { altura: 450, valor: 11 }, { altura: 600, valor: 15 }, { altura: 600, valor: 18.5 }, { altura: 600, valor: 22 },
                    { altura: 900, valor: 30 }, { altura: 900, valor: 37 }, { altura: 900, valor: 45 }, { altura: 900, valor: 55 },
                    { altura: 900, valor: 75 }, { altura: 900, valor: 90 }, { altura: 900, valor: 110 }, { altura: 1050, valor: 132 },
                    { altura: 1050, valor: 160 }, { altura: 1050, valor: 200 }, { altura: 1050, valor: 250}
                    
                ]
             },
             {
                nome: 'Soft-Starter',
                dados: [
                    { altura: 15, valor: 7.5 },
                    { altura: 10, valor: 5 }
                ]
             }
        ]
    }
];

document.addEventListener('DOMContentLoaded', function() {
    const fabricanteSelect = document.getElementById('fabricante');
    const unidadeSelect = document.getElementById('unidade');
    const valorInput = document.getElementById('valor');
    const quantidadeInput = document.getElementById('quantidade');
    const tabela = document.getElementById('corpo-tabela');
    const adicionarBtn = document.getElementById('adicionar');
    const cadastrarBtn = document.getElementById('cadastrar');

    function popularFabricantes() {
        fabricantes.forEach(fabricante => {
            const option = document.createElement('option');
            option.text = fabricante.nome;
            fabricanteSelect.add(option);
        });
    }

    function popularUnidadesFuncionais() {
        const fabricanteSelecionado = fabricanteSelect.value;
        const fabricante = fabricantes.find(fab => fab.nome === fabricanteSelecionado);
        unidadeSelect.innerHTML = '';
        fabricante.unidadesFuncionais.forEach(unidade => {
            const option = document.createElement('option');
            option.text = unidade.nome;
            unidadeSelect.add(option);
        });
    }

    fabricanteSelect.addEventListener('change', function() {
        popularUnidadesFuncionais();
    });

    adicionarBtn.addEventListener('click', function() {
        if (valorInput.value == '' || quantidadeInput.value == '') {
            alert('Insira os Valores Corretamente');
        }
        else {
            const fabricanteNome = fabricanteSelect.value;
            const unidadeNome = unidadeSelect.value;
            const valor = valorInput.value;
            const quantidade = quantidadeInput.value;
            const fabricante = fabricantes.find(fab => fab.nome === fabricanteNome);
            const unidade = fabricante.unidadesFuncionais.find(uni => uni.nome === unidadeNome);
            const dados = unidade.dados.find(dado => dado.valor == valor);
            const altura = dados ? dados.altura : ''; // Verifica se dados existe antes de acessar a altura
    
            const newRow = tabela.insertRow();
            const cell1 = newRow.insertCell(0);
            const cell2 = newRow.insertCell(1);
            const cell3 = newRow.insertCell(2);
            const cell4 = newRow.insertCell(3);
            const cell5 = newRow.insertCell(4);
            cell1.innerHTML = unidadeNome;
            cell2.innerHTML = altura; // Se dados for undefined, altura será uma string vazia
            cell3.innerHTML = valor;
            cell4.innerHTML = quantidade;
            cell5.innerHTML = '<button class="remover">Remover</button>';
        }
    });

    

    tabela.addEventListener('click', function(e) {
        if (e.target.classList.contains('remover')) {
            const row = e.target.parentNode.parentNode;
            tabela.deleteRow(row.rowIndex-1);
        }
    });

    popularFabricantes();
    popularUnidadesFuncionais();
});