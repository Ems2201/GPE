import { fabricantes } from "./data.js";

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
            case 'Disjuntor CCM':
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
            case 'Alimentador CCM':
                label.innerText = "Corrente (A)";
                valor.placeholder = "Digite a Corrente(A)";
                break;
            case 'Inversor':
                label.innerText = "Potência (CV)";
                valor.placeholder = "Digite a Potência(CV)";
                break;
            case 'Soft-Starter':
                label.innerText = "Potência (CV)";
                valor.placeholder = "Digite a Potência(CV)";
                break;
            case 'Disjuntor CDC Aberto':
                label.innerText = "Corrente (A)";
                valor.placeholder = "Digite a Corrente(A)";
                break;
            case 'Disjuntor CDC Caixa Moldada':
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


            function obterMedida(fabricantes, nomeFabricante, nomeUnidadeFuncional) {
                // Procura o fabricante
                const fabricante = fabricantes.find(fab => fab.nome === nomeFabricante);
                if (!fabricante) {
                    return null; // Retorna null se o fabricante não for encontrado
                }
            
                // Procura a unidade funcional
                const unidadeFuncional = fabricante.unidadesFuncionais.find(uf => uf.nome === nomeUnidadeFuncional);
                if (!unidadeFuncional) {
                    return null; // Retorna null se a unidade funcional não for encontrada
                }
            
                // Retorna a medida da unidade funcional
                return unidadeFuncional.medida;
            }
        
            const medida = obterMedida(fabricantes, fabricanteNome, unidadeNome);
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
            cell3.innerHTML = valor + ' ' + medida;
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