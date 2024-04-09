document.addEventListener("DOMContentLoaded", () => {
    let UF = JSON.parse(localStorage.getItem('form') || '[]');
    let select = document.getElementById('select');
});

// function bestFit(objects, binCapacity) {
//     let bins = [[]]; // Inicializa a lista de recipientes com um recipiente vazio
//     objects.sort((a, b) => b - a); // Ordena os objetos em ordem decrescente de tamanho

//     for (let object of objects) {
//         let bestBinIndex = -1;
//         let minWaste = Infinity;

//         // Procura o melhor recipiente para o objeto
//         for (let i = 0; i < bins.length; i++) {
//             let bin = bins[i];
//             let remainingSpace = binCapacity - bin.reduce((acc, val) => acc + val, 0);

//             if (object <= remainingSpace && remainingSpace < minWaste) {
//                 bestBinIndex = i;
//                 minWaste = remainingSpace;
//             }
//         }

//         // Adiciona o objeto ao melhor recipiente encontrado ou cria um novo recipiente
//         if (bestBinIndex !== -1) {
//             bins[bestBinIndex].push(object);
//         } else {
//             bins.push([object]);
//         }
//     }

//     return bins;
// }

// // Exemplo de uso
// let objects = [900, 1800, 400, 450, 350, 600, 1200];
// let binCapacity = 1800;
// let result = bestFit(objects, binCapacity);
// console.log(result);