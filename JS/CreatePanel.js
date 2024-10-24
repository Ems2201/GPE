import { conjuntos } from "./data.js";

document.addEventListener('DOMContentLoaded', function() {
    const conjuntoSelect = document.getElementById('conjunto');
    const unidadeSelect = document.getElementById('unidade');
    const valorInput = document.getElementById('valor');
    const quantidadeInput = document.getElementById('quantidade');
    const barramentoSelect = document.getElementById('barramento');
    const tabela = document.getElementById('corpo-tabela');
    const adicionarBtn = document.getElementById('adicionar');
    const cadastrarBtn = document.getElementById('cadastrar');

    function popularConjuntos() {
        conjuntos.forEach(conjunto => {
            const option = document.createElement('option');
            option.text = conjunto.nome;
            conjuntoSelect.add(option);
        });
    }

    function popularUnidadesFuncionais() {
        const conjuntoSelecionado = conjuntoSelect.value;
        const conjunto = conjuntos.find(fab => fab.nome === conjuntoSelecionado);
        unidadeSelect.innerHTML = '';
        conjunto.unidadesFuncionais.forEach(unidade => {
            const option = document.createElement('option');
            option.text = unidade.nome;
            unidadeSelect.add(option);
        });

        if (conjuntoSelecionado == 'CCM') {
            barramentoSelect.placeholder = 'Barramento A';
            barramentoSelect.value = 'A';
            barramentoSelect.disabled = true;
        } else {
            barramentoSelect.placeholdedr = 'Selecione o Barramento';
            barramentoSelect.disabled = false;
        }
    }

    function encontrarValorMaisProximo(unidade, valor) {
        const valores = unidade.dados.map(dado => dado.valor);
        return valores.find(v => v >= valor) || null;
    }

    unidadeSelect.addEventListener('change', () => {
        const label = document.getElementById('labelvalor');
        const valor = document.getElementById('valor');
        const unidade = unidadeSelect.value;
        const config = {
            'Disjuntor de Entrada': ["Corrente (A)", "Digite a Corrente(A)"],
            'Partida Direta': ["Potência (CV)", "Digite a Potência(CV)"],
            'Partida Reversora': ["Potência (CV)", "Digite a Potência(CV)"],
            'Alimentador': ["Corrente (A)", "Digite a Corrente(A)"],
            'Partida Direta Vertical': ["Potência (CV)", "Digite a Potência(CV)"],
            'Inversor': ["Potência (CV)", "Digite a Potência(CV)"],
            'Soft-Starter': ["Potência (CV)", "Digite a Potência(CV)"],
            'Disjuntor Aberto': ["Corrente (A)", "Digite a Corrente(A)"],
            'Disjuntor Caixa Moldada': ["Corrente (A)", "Digite a Corrente(A)"],
            'Disjuntor Caixa Moldada Vertical': ["Corrente (A)", "Digite a Corrente(A)"],
            'Compartimento de Controle': ["Altura (mm)", "Digite a Altura(mm)"],
            'Tie Breaker': ["Corrente (A)", "Digite a Corrente(A)"]
        };
        label.innerText = config[unidade][0];
        valor.placeholder = config[unidade][1];
    });

    conjuntoSelect.addEventListener('change', popularUnidadesFuncionais);

    // Adiciona uma nova linha à tabela ao clicar em "Adicionar"
    adicionarBtn.addEventListener('click', function() {
        if (!valorInput.value || !quantidadeInput.value || !barramentoSelect.value) {
            alert('Insira os Valores Corretamente');
            return;
        }

        const conjuntoNome = conjuntoSelect.value;
        const unidadeNome = unidadeSelect.value;
        let valor = parseFloat(valorInput.value);
        const quantidade = quantidadeInput.value;
        const conjunto = conjuntos.find(fab => fab.nome === conjuntoNome);
        const unidade = conjunto.unidadesFuncionais.find(uni => uni.nome === unidadeNome);
        const barramento = barramentoSelect.value;

        const valorMaisProximo = encontrarValorMaisProximo(unidade, valor);
        if (!valorMaisProximo) {
            alert('Unidade Não Existe');
            return;
        }

        valor = valorMaisProximo;
        const dados = unidade.dados.find(dado => dado.valor == valor);
        const altura = dados ? dados.altura : '';
        const largura = dados ? dados.largura : '';
        const medida = unidade.medida;

        const linhadaTabela = tabela.insertRow();
        linhadaTabela.innerHTML = `
            <td>${unidadeNome}</td>
            <td>${altura}</td>
            <td>${valor} ${medida}</td>
            <td>${quantidade}</td>
            <td><button class="remover">Remover</button></td>
            <td>${barramento}</td>
            <td>${largura}</td>
        `;
    });

    tabela.addEventListener('click', function(e) {
        if (e.target.classList.contains('remover')) {
            e.target.closest('tr').remove();
        }
    });

    cadastrarBtn.addEventListener('click', function() {
        if (tabela.rows.length < 1) {
            alert('Cadastre Uma Unidade Funcional Antes!');
            return;
        }

        const conjuntoNome = conjuntoSelect.value;

        const dados = Array.from(tabela.rows).map(row => ({
            nome: row.cells[0].innerText,
            altura: Number(row.cells[1].innerText),
            valor: row.cells[2].innerText,
            quantidade: Number(row.cells[3].innerText),
            barramento: row.cells[5].innerText,
            conjunto: conjuntoNome,
            largura: row.cells[6].innerText
        }));

        sessionStorage.setItem('dados', JSON.stringify(dados));
        window.location.href = 'ViewPanel.html';
    });

    popularConjuntos();
    popularUnidadesFuncionais();
});
