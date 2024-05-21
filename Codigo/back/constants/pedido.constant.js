const INDIVISIVEIS = [
    'FIGADO',
    'FATO',
    'DIANTEIRO_SEM_COSTELA',
    'SERROTE_SEM_RABADA',
    'SERROTE_COM_RABADA',
    'COSTELA',
    'CUPIM'
]

const CONJUNTOS = [
    {
        nome: 'CARCACA',
        itens: [
            'DIANTEIRO_SEM_COSTELA',
            'DIANTEIRO_SEM_COSTELA',
            'SERROTE_SEM_RABADA',
            'SERROTE_COM_RABADA',
            'COSTELA',
            'COSTELA'
        ]
    },
    {
        nome: 'BANDA_CARREGADA',
        itens: [
            'DIANTEIRO_SEM_COSTELA',
            'SERROTE_COM_RABADA',
            'COSTELA'
        ]
    },
    {
        nome: 'BANDA_DESCARREGADA',
        itens: [
            'DIANTEIRO_SEM_COSTELA',
            'SERROTE_SEM_RABADA',
            'COSTELA'
        ]
    },
    {
        nome: 'DIANTEIRO_COM_COSTELA',
        itens: [
            'DIANTEIRO_SEM_COSTELA',
            'COSTELA'
        ]
    }
]

for (let nome of INDIVISIVEIS) {
    CONJUNTOS.push({
        nome,
        itens: [nome]
    });
}


module.exports = {
    INDIVISIVEIS,
    CONJUNTOS
}