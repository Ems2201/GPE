export const fabricantes = [
    {
        nome: 'Selecione o Fabricante',
        unidadesFuncionais: [ {
            nome: 'Selecione a Unidade Funcional',
            dados: ['']
        }]
    },
    {
        nome: 'ABB',
        unidadesFuncionais: [
            {
                nome: '',
                dados: ['']
            },
            {
                nome: 'Disjuntor CCM',
                dados: [
                    { altura: 600, valor: 540 }, { altura: 750, valor: 640 }, { altura: 1800, valor: 800 },{ altura: 1800, valor: 960 },
                    { altura: 1800, valor: 1200 }, { altura: 1800, valor: 1600 }, { altura: 1800, valor: 2000 }, { altura: 1800, valor: 2500 },
                    { altura: 1800, valor: 3200 }, { altura: 1800, valor: 4000 }, { altura: 1800, valor: 5000 }, { altura: 1800, valor: 6300 }
                ],
                medida: 'A'
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
                ],
                medida: 'CV'
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
                ],
                medida: 'CV'
            },
             {
                nome: 'Alimentador CCM',
                dados: [
                    { altura: 150, valor: 15 }, { altura: 150, valor: 20 }, { altura: 150, valor: 25 }, { altura: 150, valor: 30 },
                    { altura: 150, valor: 35 }, { altura: 150, valor: 40 }, { altura: 150, valor: 50 }, { altura: 150, valor: 60 },
                    { altura: 150, valor: 70 }, { altura: 150, valor: 80 }, { altura: 150, valor: 90 }, { altura: 250, valor: 100 },
                    { altura: 250, valor: 125 }, { altura: 250, valor: 150 }, { altura: 250, valor: 200 }, { altura: 250, valor: 250 },
                    { altura: 250, valor: 320 }, { altura: 250, valor: 400 }
                ],
                medida: 'A'
             },
             {
                nome: 'Inversor',
                dados: [
                    { altura: 450, valor: 1 }, { altura: 450, valor: 1.5 },{ altura: 450, valor: 2 }, { altura: 450, valor: 3 }, 
                    { altura: 450, valor: 5 }, { altura: 450, valor: 7.5 },{ altura: 450, valor: 10 }, { altura: 450, valor: 15 }, 
                    { altura: 600, valor: 20 }, { altura: 600, valor: 25 },{ altura: 600, valor: 30 }, { altura: 900, valor: 40 }, 
                    { altura: 900, valor: 50 }, { altura: 900, valor: 60 },{ altura: 900, valor: 75 }, { altura: 900, valor: 100 }, 
                    { altura: 900, valor: 125 }, { altura: 900, valor: 150 },{ altura: 1050, valor: 200 }, { altura: 1050, valor: 250 }, 
                    { altura: 1050, valor: 300 }, { altura: 1050, valor: 350 }
                    ],
                    medida: 'CV'
             },
             {
                nome: 'Soft-Starter',
                dados: [
                    { altura: 600, valor: 20 }, { altura: 600, valor: 25 },  { altura: 600, valor: 30 }, { altura: 600, valor: 40 },
                    { altura: 600, valor: 50 }, { altura: 900, valor: 60 }, { altura: 900, valor: 75 }, { altura: 900, valor: 100 }, { altura: 1800, valor: 125 },
                    { altura: 1800, valor: 150 }, { altura: 1800, valor: 200 }, { altura: 1800, valor: 250 }, { altura: 1800, valor: 300 },
                ],
                medida: 'CV'
             }, 
             {
                nome: 'Disjuntor CDC Aberto',
                dados: [
                    { altura: 550, valor: 630 }, { altura: 550, valor: 800 }, { altura: 550, valor: 1000 }, { altura: 550, valor: 1250 }, 
                    { altura: 550, valor: 1600 }, { altura: 900, valor: 2000 }, { altura: 900, valor: 2500 }, { altura: 1800, valor: 3200 }, 
                    { altura: 1800, valor: 4000 }, { altura: 1800, valor: 5000 }, { altura: 1800, valor: 6300 }
                ],
                medida: 'A'
             },
             {
                nome: 'Disjuntor CDC Caixa Moldada',
                dados: [
                    { altura: 200, valor: 160 }, { altura: 200, valor: 250 }, { altura: 300, valor: 400 },
                    { altura: 300, valor: 630 }, { altura: 550, valor: 800 }, { altura: 550, valor: 1000 }, { altura: 550, valor: 1250 }, 
                    { altura: 550, valor: 1600 }
                ],
                medida: 'A'
             },
             {
                nome: 'Compartimento de Controle',
                dados: [
                    { altura: 150, valor: 150 }, { altura: 200, valor: 200 }, { altura: 250, valor: 250 }, { altura: 300, valor: 300 }, { altura: 400, valor: 400 },
                    { altura: 450, valor: 450 }, { altura: 600, valor: 600 }, { altura: 750, valor: 750 }, { altura: 900, valor: 900 },
                    { altura: 1050, valor: 1050 }, { altura: 1200, valor: 1200 }, { altura: 1800, valor: 1800 },
                    { altura: 150, valor: "150 mm" }, { altura: 200, valor: "200 mm" }, { altura: 250, valor: "250 mm" }, { altura: 300, valor: "300 mm" }, 
                    { altura: 400, valor: "400 mm" }, { altura: 450, valor: "450 mm" }, { altura: 600, valor: "600 mm" }, { altura: 750, valor: "750 mm" }, { altura: 900, valor: "900 mm" },
                    { altura: 1050, valor: "1050 mm" }, { altura: 1200, valor: "1200 mm" }, { altura: 1800, valor: "1800 mm" },
                ],
                medida: 'mm'
             },
             {
                nome: 'Tie Breaker',
                dados: [
                    { altura: 550, valor: 630 }, { altura: 550, valor: 800 }, { altura: 550, valor: 1000 }, { altura: 550, valor: 1250 }, 
                    { altura: 550, valor: 1600 }, { altura: 900, valor: 2000 }, { altura: 900, valor: 2500 }, { altura: 1800, valor: 3200 }, 
                    { altura: 1800, valor: 4000 }, { altura: 1800, valor: 5000 }, { altura: 1800, valor: 6300 }
                ],
                medida: 'A'
             }
        ]
    }
];