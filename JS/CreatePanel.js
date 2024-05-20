const fabricantes = [
    {
        nome: 'ABB',
        unidadesFuncionais: [
            {
                nome: 'Disjuntor',
                dados: [
                    { altura: 600, valor: 540 }, { altura: 750, valor: 640 }, { altura: 1800, valor: 800 },{ altura: 1800, valor: 960 },
                    { altura: 1800, valor: 1200 }, { altura: 1800, valor: 1600 }, { altura: 1800, valor: 2000 }, { altura: 1800, valor: 2500 },
                    { altura: 1800, valor: 3200 }, { altura: 1800, valor: 4000 }, { altura: 1800, valor: 5000 }, { altura: 1800, valor: 6300 },
                    { altura: 600, valor: "540 A" }, { altura: 750, valor: "640 A" }, { altura: 1800, valor: "800 A" },{ altura: 1800, valor: "960 A" },
                    { altura: 1800, valor: "1200 A" }, { altura: 1800, valor: "1600 A" }, { altura: 1800, valor: "2000 A" }, { altura: 1800, valor: "2500 A" },
                    { altura: 1800, valor: "3200 A" }, { altura: 1800, valor: "4000 A" }, { altura: 1800, valor: "5000 A" }, { altura: 1800, valor: "6300 A" }
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
                    { altura: 1800, valor: 400 }, 
                    { altura: 150, valor: "0.5 CV" }, { altura: 150, valor: "0.75 CV" }, { altura: 150, valor: "1 CV" }, { altura: 150, valor: "1.5 CV" },
                    { altura: 150, valor: "2 CV" }, { altura: 150, valor: "3 CV" }, { altura: 150, valor: "5 CV" }, { altura: 300, valor: "7.5 CV" },
                    { altura: 300, valor: "10 CV" }, { altura: 300, valor: "15 CV" }, { altura: 300, valor: "20 CV" }, { altura: 300, valor: "25 CV" },
                    { altura: 300, valor: "30 CV" }, { altura: 450, valor: "40 CV" }, { altura: 450, valor: "50 CV" }, { altura: 600, valor: "60 CV" },
                    { altura: 600, valor: "75 CV" }, { altura: 750, valor: "100 CV" }, { altura: 900, valor: "125 CV" }, { altura: 900, valor: "150 CV" },
                    { altura: 1050, valor: "200 CV" }, { altura: 1800, valor: "250 CV" }, { altura: 1800, valor: "300 CV" }, { altura: 1800, valor: "350 CV" },
                    { altura: 1800, valor: "400 CV" }
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
                    { altura: 1800, valor: 300 }, { altura: 1800, valor: 350 }, { altura: 1800, valor: 400 },
                    { altura: 450, valor: "0.75 CV" }, { altura: 450, valor: "1 CV" }, { altura: 450, valor: "2 CV" }, { altura: 450, valor: "3 CV" },
                    { altura: 450, valor: "5 CV" }, { altura: 450, valor: "7.5 CV" }, { altura: 450, valor: "10 CV" }, { altura: 450, valor: "15 CV" },
                    { altura: 450, valor: "20 CV" }, { altura: 450, valor: "25 CV" }, { altura: 450, valor: "30 CV" }, { altura: 450, valor: "40 CV" },
                    { altura: 450, valor: "50 CV" }, { altura: 900, valor: "60 CV" }, { altura: 900, valor: "75 CV" }, { altura: 1050, valor: "100 CV" },
                    { altura: 1200, valor: "125 CV" }, { altura: 1800, valor: "150 CV" }, { altura: 1800, valor: "200 CV" }, { altura: 1800, valor: "250 CV" },
                    { altura: 1800, valor: "300 CV" }, { altura: 1800, valor: "350 CV" }, { altura: 1800, valor: "400 CV" }
                ]
            },
             {
                nome: 'Alimentador',
                dados: [
                    { altura: 150, valor: 15 }, { altura: 150, valor: 20 }, { altura: 150, valor: 25 }, { altura: 150, valor: 30 },
                    { altura: 150, valor: 35 }, { altura: 150, valor: 40 }, { altura: 150, valor: 50 }, { altura: 150, valor: 60 },
                    { altura: 150, valor: 70 }, { altura: 150, valor: 80 }, { altura: 150, valor: 90 }, { altura: 250, valor: 100 },
                    { altura: 250, valor: 125 }, { altura: 250, valor: 150 }, { altura: 250, valor: 200 }, { altura: 250, valor: 250 },
                    { altura: 250, valor: 300 }, { altura: 250, valor: 400 }, { altura: 600, valor: 630 }, { altura: 600, valor: 800 },
                    { altura: 150, valor: "15 A" }, { altura: 150, valor: "20 A" }, { altura: 150, valor: "25 A" }, { altura: 150, valor: "30 A" },
                    { altura: 150, valor: "35 A" }, { altura: 150, valor: "40 A" }, { altura: 150, valor: "50 A" }, { altura: 150, valor: "60 A" },
                    { altura: 150, valor: "70 A" }, { altura: 150, valor: "80 A" }, { altura: 150, valor: "90 A" }, { altura: 250, valor: "100 A" },
                    { altura: 250, valor: "125 A" }, { altura: 250, valor: "150 A" }, { altura: 250, valor: "200 A" }, { altura: 250, valor: "250 A" },
                    { altura: 250, valor: "300 A" }, { altura: 250, valor: "400 A" }, { altura: 600, valor: "630 A" }, { altura: 600, valor: "800 A" }
                ]
             },
             {
                nome: 'Inversor',
                dados: [
                    { altura: 150, valor: 1 }, { altura: 150, valor: 1.5 },{ altura: 150, valor: 2 }, { altura: 150, valor: 3 }, 
                    { altura: 150, valor: 5 }, { altura: 300, valor: 7.5 },{ altura: 300, valor: 10 }, { altura: 300, valor: 15 }, 
                    { altura: 300, valor: 20 }, { altura: 300, valor: 25 },{ altura: 300, valor: 30 }, { altura: 450, valor: 40 }, 
                    { altura: 450, valor: 50 }, { altura: 600, valor: 60 },{ altura: 600, valor: 75 }, { altura: 750, valor: 100 }, 
                    { altura: 900, valor: 125 }, { altura: 900, valor: 150 },{ altura: 1050, valor: 200 }, { altura: 1800, valor: 250 }, 
                    { altura: 1800, valor: 300 }, { altura: 1800, valor: 350 },
                    
                    { altura: 150, valor: "1 CV" }, { altura: 150, valor: "1.5 CV" },{ altura: 150, valor: "2 CV" }, { altura: 150, valor: "3 CV" }, 
                    { altura: 150, valor: "5 CV" }, { altura: 300, valor: "7.5 CV" },{ altura: 300, valor: "10 CV" }, { altura: 300, valor: "15 CV" }, 
                    { altura: 300, valor: "20 CV" }, { altura: 300, valor: "25 CV" },{ altura: 300, valor: "30 CV" }, { altura: 450, valor: "40 CV" }, 
                    { altura: 450, valor: "50 CV" }, { altura: 600, valor: "60 CV" },{ altura: 600, valor: "75 CV" }, { altura: 750, valor: "100 CV" }, 
                    { altura: 900, valor: "125 CV" }, { altura: 900, valor: "150 CV" },{ altura: 1050, valor: "200 CV" }, { altura: 1800, valor: "250 CV" }, 
                    { altura: 1800, valor: "300 CV" }, { altura: 1800, valor: "350 CV" },
                    ]
             },
             {
                nome: 'Soft-Starter',
                dados: [
                    { altura: 150, valor: 2 }, { altura: 150, valor: 3 }, { altura: 150, valor: 5 }, { altura: 150, valor: 7.5 }, { altura: 150, valor: 10 },
                    { altura: 200, valor: 15 }, { altura: 200, valor: 20 }, { altura: 200, valor: 25 },  { altura: 200, valor: 30 }, { altura: 200, valor: 40 },
                    { altura: 200, valor: 50 }, { altura: 200, valor: 60 }, { altura: 200, valor: 75 }, { altura: 250, valor: 100 }, { altura: 250, valor: 125 },
                    { altura: 250, valor: 150 }, { altura: 250, valor: 200 }, { altura: 250, valor: 250 }, { altura: 250, valor: 300 },
                    { altura: 150, valor: "2 CV" }, { altura: 150, valor: "3 CV" }, { altura: 150, valor: "5 CV" }, { altura: 150, valor: "7.5 CV" }, { altura: 150, valor: "10 CV" },
                    { altura: 200, valor: "15 CV" }, { altura: 200, valor: "20 CV" }, { altura: 200, valor: "25 CV" }, { altura: 200, valor: "30 CV" }, { altura: 200, valor: "40 CV" },
                    { altura: 200, valor: "50 CV" }, { altura: 200, valor: "60 CV" }, { altura: 200, valor: "75 CV" }, { altura: 250, valor: "100 CV" }, { altura: 250, valor: "125 CV" },
                    { altura: 250, valor: "150 CV" }, { altura: 250, valor: "200 CV" }, { altura: 250, valor: "250 CV" }, { altura: 250, valor: "300 CV" }
                ]
             }, 
             {
                nome: 'Disjuntor CDC',
                dados: [
                    { altura: 600, valor: 630 }, { altura: 600, valor: 800 }, { altura: 600, valor: 1000 }, { altura: 600, valor: 1200 }, 
                    { altura: 900, valor: 1600 }, { altura: 900, valor: 2000 }, { altura: 900, valor: 2500 }, { altura: 1800, valor: 3200 }, 
                    { altura: 1800, valor: 4000 }, { altura: 1800, valor: 5000 }, { altura: 1800, valor: 6300 },
                    { altura: 600, valor: "630 A" }, { altura: 600, valor: "800 A" }, { altura: 600, valor: "1000 A" }, { altura: 600, valor: "1200 A" },
                    { altura: 900, valor: "1600 A" }, { altura: 900, valor: "2000 A" }, { altura: 900, valor: "2500 A" }, { altura: 1800, valor: "3200 A" },
                    { altura: 1800, valor: "4000 A" }, { altura: 1800, valor: "5000 A" }, { altura: 1800, valor: "6300 A" }
                ]
             },
             {
                nome: 'Alimentador CDC',
                dados: [
                    { altura: 150, valor: 15 }, { altura: 150, valor: 20 }, { altura: 150, valor: 25 }, { altura: 150, valor: 30 },
                    { altura: 150, valor: 35 }, { altura: 150, valor: 40 }, { altura: 150, valor: 50 }, { altura: 150, valor: 60 },
                    { altura: 150, valor: 70 }, { altura: 150, valor: 80 }, { altura: 150, valor: 90 }, { altura: 250, valor: 100 },
                    { altura: 250, valor: 125 }, { altura: 250, valor: 150 }, { altura: 250, valor: 200 }, { altura: 250, valor: 250 },
                    { altura: 250, valor: 300 }, { altura: 250, valor: 400 }, { altura: 600, valor: 630 }, { altura: 600, valor: 800 },
                    { altura: 150, valor: "15 A" }, { altura: 150, valor: "20 A" }, { altura: 150, valor: "25 A" }, { altura: 150, valor: "30 A" },
                    { altura: 150, valor: "35 A" }, { altura: 150, valor: "40 A" }, { altura: 150, valor: "50 A" }, { altura: 150, valor: "60 A" },
                    { altura: 150, valor: "70 A" }, { altura: 150, valor: "80 A" }, { altura: 150, valor: "90 A" }, { altura: 250, valor: "100 A" },
                    { altura: 250, valor: "125 A" }, { altura: 250, valor: "150 A" }, { altura: 250, valor: "200 A" }, { altura: 250, valor: "250 A" },
                    { altura: 250, valor: "300 A" }, { altura: 250, valor: "400 A" }, { altura: 600, valor: "630 A" }, { altura: 600, valor: "800 A" }
                ]
             },
             {
                nome: 'Compartimento de Controle',
                dados: [
                    { altura: 150, valor: 150 }, { altura: 200, valor: 200 }, { altura: 250, valor: 250 }, { altura: 300, valor: 300 }, 
                    { altura: 450, valor: 450 }, { altura: 600, valor: 600 }, { altura: 750, valor: 750 }, { altura: 900, valor: 900 },
                    { altura: 1050, valor: 1050 }, { altura: 1200, valor: 1200 }, { altura: 1800, valor: 1800 },
                    { altura: 150, valor: "150 mm" }, { altura: 200, valor: "200 mm" }, { altura: 250, valor: "250 mm" }, { altura: 300, valor: "300 mm" }, 
                    { altura: 450, valor: "450 mm" }, { altura: 600, valor: "600 mm" }, { altura: 750, valor: "750 mm" }, { altura: 900, valor: "900 mm" },
                    { altura: 1050, valor: "1050 mm" }, { altura: 1200, valor: "1200 mm" }, { altura: 1800, valor: "1800 mm" },
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

    function encontrarValorMaisProximo(unidade, valor) {
        const valores = unidade.dados.map(dado => dado.valor);
        const valorMaisProximo = valores.find(v => v >= valor);
        return valorMaisProximo || null; // Retorna null se não encontrar um valor maior ou igual
    }

    unidadeSelect.addEventListener('change', () => {
        let label = document.getElementById('labelvalor');
        let valor = document.getElementById('valor');
        switch (unidadeSelect.value) {
            case 'Disjuntor':
                label.innerText = "Corrente (A)";
                valor.placeholder = "Digite a Corrente(A)";
                break;
            case 'Partida Direta':
                label.innerText = "Potência (CV)";
                valor.placeholder = "Digite a Potência(CV)";
                break;
            case 'Partida Reversora':
                label.innerText = "Potência (CV)";
                valor.placeholder = "Digite a Potência(CV)";
                break;
            case 'Alimentador':
                label.innerText = "Corrente (A)";
                valor.placeholder = "Digite a Corrente(A)";
                break;
            case 'Inversor':
                label.innerText = "Potência (kW)";
                valor.placeholder = "Digite a Potência(kW)";
                break;
            case 'Soft-Starter':
                label.innerText = "Potência (CV)";
                valor.placeholder = "Digite a Potência(CV)";
                break;
            case 'Disjuntor CDC':
                label.innerText = "Corrente (A)";
                valor.placeholder = "Digite a Corrente(A)";
                break;
            case 'Alimentador CDC':
                label.innerText = "Corrente (A)";
                valor.placeholder = "Digite a Corrente(A)";
                break;
            case 'Compartimento de Controle':
                label.innerText = "Altura (mm)";
                valor.placeholder = "Digite a Altura(mm)";
                break;
        }
    });

    fabricanteSelect.addEventListener('change', function() {
        popularUnidadesFuncionais();
    });

    adicionarBtn.addEventListener('click', function() {
        if (valorInput.value == '' || quantidadeInput.value == '') {
            alert('Insira os Valores Corretamente');
        } else {
            const fabricanteNome = fabricanteSelect.value;
            const unidadeNome = unidadeSelect.value;
            let valor = parseFloat(valorInput.value);
            const quantidade = quantidadeInput.value;
            const fabricante = fabricantes.find(fab => fab.nome === fabricanteNome);
            const unidade = fabricante.unidadesFuncionais.find(uni => uni.nome === unidadeNome);

            let valorMaisProximo = encontrarValorMaisProximo(unidade, valor);
            if (valorMaisProximo) {
                valor = valorMaisProximo;
            } else {
                window.alert('Unidade Não Existe');
                return; // Sai da função se não encontrar um valor próximo
            }

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
            tabela.deleteRow(row.rowIndex - 1);
        }
    });

    popularFabricantes();
    popularUnidadesFuncionais();

    const cadastrarBtn = document.getElementById('cadastrar');

    cadastrarBtn.addEventListener('click', function() {
        const data = [];

        // Itera sobre as linhas da tabela e armazena os dados em um array
        for (let i = 0; i < tabela.rows.length; i++) {
            const row = tabela.rows[i];
            const nome = row.cells[0].innerText;
            const altura = Number(row.cells[1].innerText);
            const valor = row.cells[2].innerText;
            const quantidade = Number(row.cells[3].innerText);

            data.push({ nome, altura, valor, quantidade });
        }

        if (tabela.rows.length < 1) {
            window.alert('Cadastre Uma Unidade Funcional Antes!');
        } else {
            // Armazena os dados no sessionStorage
            sessionStorage.setItem('data', JSON.stringify(data));

            // Redireciona para a outra página
            window.location.href = 'ViewPanel.html';
        }
    });
})