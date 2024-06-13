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