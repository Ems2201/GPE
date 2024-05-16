const select = document.getElementById('select');

document.addEventListener('DOMContentLoaded', function() {    
    select.addEventListener('change', () => {
        const selectValue = select.value; // Moveu esta linha para dentro do evento de mudança
        switch (selectValue) {
            case "firstFit":
                firstFit();
                break;
            case "firstFit2":
                firstFit2();
                break;
            case "firstFit3":
                firstFit3();
                break;
            case "bestFit":
                bestFit();
                break;
            case "bestFit2":
                bestFit2();
                break;
            case "bestFit3":
                bestFit3();
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


function firstFit() {
    const data = JSON.parse(sessionStorage.getItem('data'));

    // Ordena os dados do objeto data em ordem crescente de altura

    const columnCapacity = 1800;
    let scale = columnCapacity / 350;

    let columns = [];

    // Remove todas as bins e itens anteriores
    const container = document.getElementById('bin');
    container.innerHTML = '';

    // Realiza o algoritmo First Fit com os dados do objeto data
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
                    break; // item alocado, sai do loop
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

    // Exibe os bins na página
    columns.forEach((column, index) => {
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

function firstFit2() {
    const data = JSON.parse(sessionStorage.getItem('data'));

    // Ordena os dados do objeto data em ordem crescente de altura
    data.sort((a, b) => a.altura - b.altura);

    const columnCapacity = 1800;
    let scale = columnCapacity / 350;

    let columns = [];

    // Remove todas as bins e itens anteriores
    const container = document.getElementById('bin');
    container.innerHTML = '';

    // Realiza o algoritmo First Fit com os dados do objeto data
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
                    break; // item alocado, sai do loop
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

    // Exibe os bins na página
    columns.forEach((column, index) => {
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

    // Limpa os dados do sessionStorage
}

function firstFit3() {
    const data = JSON.parse(sessionStorage.getItem('data'));

    // Ordena os dados do objeto data em ordem crescente de altura
    data.sort((a, b) => b.altura - a.altura);

    const columnCapacity = 1800;
    let scale = columnCapacity / 350;

    let columns = [];

    // Remove todas as bins e itens anteriores
    const container = document.getElementById('bin');
    container.innerHTML = '';

    // Realiza o algoritmo First Fit com os dados do objeto data
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
                    break; // item alocado, sai do loop
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

    // Exibe os bins na página
    columns.forEach((column, index) => {
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

    // Limpa os dados do sessionStorage
}


function bestFit() {
    const data = JSON.parse(sessionStorage.getItem('data'));

    // Ordena os dados do objeto data em ordem crescente de altura

    const columnCapacity = 1800;
    let scale = columnCapacity / 350;

    let columns = [];

    // Remove todas as bins e itens anteriores
    const container = document.getElementById('bin');
    container.innerHTML = '';

    // Realiza o algoritmo Best Fit com os dados do objeto data
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

    // Exibe os bins na página
    columns.forEach((column, index) => {
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

    // Limpa os dados do sessionStorage
    
}

function bestFit2() {
    const data = JSON.parse(sessionStorage.getItem('data'));

    // Ordena os dados do objeto data em ordem crescente de altura
    data.sort((a, b) => a.altura - b.altura);

    const columnCapacity = 1800;
    let scale = columnCapacity / 350;

    let columns = [];

    // Remove todas as bins e itens anteriores
    const container = document.getElementById('bin');
    container.innerHTML = '';

    // Realiza o algoritmo Best Fit com os dados do objeto data
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

    // Exibe os bins na página
    columns.forEach((column, index) => {
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

    // Limpa os dados do sessionStorage
    
}


function bestFit3() {
    const data = JSON.parse(sessionStorage.getItem('data'));

    // Ordena os dados do objeto data em ordem crescente de altura
    data.sort((a, b) => b.altura - a.altura);

    const columnCapacity = 1800;
    let scale = columnCapacity / 350;

    let columns = [];

    // Remove todas as bins e itens anteriores
    const container = document.getElementById('bin');
    container.innerHTML = '';

    // Realiza o algoritmo Best Fit com os dados do objeto data
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

    // Exibe os bins na página
    columns.forEach((column, index) => {
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

    // Limpa os dados do sessionStorage
    
}
