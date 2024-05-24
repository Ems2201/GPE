const select = document.getElementById('select');

document.addEventListener('DOMContentLoaded', function() {    
    select.addEventListener('change', () => {
        const selectValue = select.value; // Moveu esta linha para dentro do evento de mudança
        switch (selectValue) {
            case "firstFit":
                firstFit('normal');
                break;
            case "firstFit2":
                firstFit('Crescente');
                break;
            case "firstFit3":
                firstFit('Decrescente');
                break;
            case "bestFit":
                bestFit('normal');
                break;
            case "bestFit2":
                bestFit('Crescente');
                break;
            case "bestFit3":
                bestFit('Decrescente');
                break;
            default:
                break;
        }

        let TotalColumns = document.getElementById('TotalColumns');
        let bin = document.getElementById('bin');
        let bins = bin.querySelectorAll('.bins');
        TotalColumns.textContent = 'Total de Colunas: ' + bins.length;
        
       
    });
    sessionStorage.removeItem("item");
    
});

function firstFit(sortType = 'normal') {
    let data = JSON.parse(sessionStorage.getItem('data'));

    const container = document.getElementById('bin');
    container.innerHTML = '';

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

    for (let k = 0; k < data.length; k++) {
        const uf = data[k];
        const { nome, altura, valor, quantidade } = uf;

        for (let j = 0; j < quantidade; j++) {
            let columnFound = false;

            for (let i = 0; i < columns.length; i++) {
                let column = columns[i];
                if (column.currentCapacity + altura <= columnCapacity) {
                    column.ufs.push({ nome, altura, valor });
                    column.currentCapacity += altura;
                    columnFound = true;
                    break;
                }
            }

            if (!columnFound) {
                const newColumn = {
                    currentCapacity: altura,
                    ufs: [{ nome, altura, valor }]
                };
                columns.push(newColumn);
            }
        }
    }

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