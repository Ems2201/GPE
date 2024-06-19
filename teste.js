function lowerBoundL2(S, C) {
    // Busca a maior unidade funcional 
    S.sort((a, b) => b - a);

    let w = 0; // Inicializa o espaço desperdiçado
    let remainingElements = [...S]; // Faz uma cópia do array S

    while (remainingElements.length > 0) {
        let s1 = remainingElements.shift(); // Remove o maior elemento
        let r = C - s1; // Calcula a capacidade residual
        let sumSmallerElements = 0; // Inicializa a soma dos elementos menores

        // Encontra elementos que cabem na capacidade residual r
        for (let i = remainingElements.length - 1; i >= 0; i--) {
            if (remainingElements[i] <= r) {
                sumSmallerElements += remainingElements[i];
                remainingElements.splice(i, 1); // Remove o elemento
            }
        }

        if (sumSmallerElements <= r) {
            w += r - sumSmallerElements; // Adiciona a diferença ao espaço desperdiçado
        } else {
            remainingElements.push(sumSmallerElements - r); // Transporta a soma excedente para o próximo bin
        }
    }

    let totalSize = S.reduce((a, b) => a + b, 0); // Soma todos os elementos de S
    return Math.ceil((w + totalSize) / C); // Calcula e retorna o limite inferior L2
}

// Exemplo de uso
const S = [1800, 250, 250, 250, 250, 250, 250, 450, 450, 450, 450, 450, 450, 450, 450, 450, 450, 450, 450, 450, 450, 450, 450, 450, 450, 450, 750, 750, 900];
const C = 1800;

const L2 = lowerBoundL2(S, C);
console.log(`Lower Bound L2: ${L2}`);