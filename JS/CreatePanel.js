import { fabricantes } from "./data.js";

document.addEventListener('DOMContentLoaded', function() {
    const fabricanteSelect = document.getElementById('fabricante');
    const unidadeSelect = document.getElementById('unidade');
    const valorInput = document.getElementById('valor');
    const quantidadeInput = document.getElementById('quantidade');
    const barramentoSelect = document.getElementById('barramento');
    const tabela = document.getElementById('corpo-tabela');
    const adicionarBtn = document.getElementById('adicionar');
    const cadastrarBtn = document.getElementById('cadastrar');

    // Popula o select de fabricantes
    function popularFabricantes() {
        fabricantes.forEach(fabricante => {
            const option = document.createElement('option');
            option.text = fabricante.nome;
            fabricanteSelect.add(option);
        });
    }

    // Popula o select de unidades funcionais com base no fabricante selecionado
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

    // Encontra o valor mais próximo na lista de valores da unidade funcional
    function encontrarValorMaisProximo(unidade, valor) {
        const valores = unidade.dados.map(dado => dado.valor);
        return valores.find(v => v >= valor) || null;
    }

    // Atualiza o placeholder e o label com base na unidade funcional selecionada
    unidadeSelect.addEventListener('change', () => {
        const label = document.getElementById('labelvalor');
        const valor = document.getElementById('valor');
        const unidade = unidadeSelect.value;
        const config = {
            'Disjuntor CCM': ["Corrente (A)", "Digite a Corrente(A)"],
            'Partida Direta': ["Potência (CV)", "Digite a Potência(CV)"],
            'Partida Reversora': ["Potência (CV)", "Digite a Potência(CV)"],
            'Alimentador CCM': ["Corrente (A)", "Digite a Corrente(A)"],
            'Inversor': ["Potência (CV)", "Digite a Potência(CV)"],
            'Soft-Starter': ["Potência (CV)", "Digite a Potência(CV)"],
            'Disjuntor CDC Aberto': ["Corrente (A)", "Digite a Corrente(A)"],
            'Disjuntor CDC Caixa Moldada': ["Corrente (A)", "Digite a Corrente(A)"],
            'Compartimento de Controle': ["Altura (mm)", "Digite a Altura(mm)"],
            'Tie Breaker': ["Corrente (A)", "Digite a Corrente(A)"]
        };
        label.innerText = config[unidade][0];
        valor.placeholder = config[unidade][1];
    });

    // Evento que ocorre ao selecionar um fabricante
    fabricanteSelect.addEventListener('change', popularUnidadesFuncionais);

    // Adiciona uma nova linha à tabela ao clicar em "Adicionar"
    adicionarBtn.addEventListener('click', function() {
        if (!valorInput.value || !quantidadeInput.value || !barramentoSelect.value) {
            alert('Insira os Valores Corretamente');
            return;
        }

        const fabricanteNome = fabricanteSelect.value;
        const unidadeNome = unidadeSelect.value;
        let valor = parseFloat(valorInput.value);
        const quantidade = quantidadeInput.value;
        const fabricante = fabricantes.find(fab => fab.nome === fabricanteNome);
        const unidade = fabricante.unidadesFuncionais.find(uni => uni.nome === unidadeNome);
        const barramento = barramentoSelect.value;

        const valorMaisProximo = encontrarValorMaisProximo(unidade, valor);
        if (!valorMaisProximo) {
            alert('Unidade Não Existe');
            return;
        }

        valor = valorMaisProximo;
        const dados = unidade.dados.find(dado => dado.valor == valor);
        const altura = dados ? dados.altura : '';
        const medida = unidade.medida;

        // Adiciona a nova linha na tabela
        const newRow = tabela.insertRow();
        newRow.innerHTML = `
            <td>${unidadeNome}</td>
            <td>${altura}</td>
            <td>${valor} ${medida}</td>
            <td>${quantidade}</td>
            <td><button class="remover">Remover</button></td>
            <td>${barramento}</td>
        `;
    });

    // Remove uma linha da tabela ao clicar em "Remover"
    tabela.addEventListener('click', function(e) {
        if (e.target.classList.contains('remover')) {
            e.target.closest('tr').remove();
        }
    });

    // Armazena os dados da tabela e redireciona para outra página
    cadastrarBtn.addEventListener('click', function() {
        if (tabela.rows.length < 1) {
            alert('Cadastre Uma Unidade Funcional Antes!');
            return;
        }

        const data = Array.from(tabela.rows).map(row => ({
            nome: row.cells[0].innerText,
            altura: Number(row.cells[1].innerText),
            valor: row.cells[2].innerText,
            quantidade: Number(row.cells[3].innerText),
            barramento: row.cells[5].innerText
        }));

        sessionStorage.setItem('data', JSON.stringify(data));
        window.location.href = 'ViewPanel.html';
    });

    // Inicializa os selects de fabricantes e unidades funcionais
    popularFabricantes();
    popularUnidadesFuncionais();
});
