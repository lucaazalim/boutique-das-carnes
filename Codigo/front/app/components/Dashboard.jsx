import {Bar, Pie} from 'react-chartjs-2';

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    Title,
    CategoryScale,
    LinearScale,
    BarElement,
} from 'chart.js';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    Title,
    CategoryScale,
    LinearScale,
    BarElement
);

export default function Dashboard() {

    return <div className="grid grid-cols-2 gap-2 justify-items-center">
        <Chart><QuantidadeDePedidosPorDia/></Chart>
        <Chart><ValorTotalDePedidosPorDia/></Chart>
        <Chart><ClientesUnicosDiarios/></Chart>
        <Chart><Estoque/></Chart>
    </div>
}

function Chart({children}) {
    return <div className="h-full w-full bg-gray-100 p-2 rounded-2xl">
        {children}
    </div>
}

function QuantidadeDePedidosPorDia() {

    const data = {
        labels: Array.from({
            length: 7
        }, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() + i);
            return date.toLocaleDateString('pt-BR');
        }),
        datasets: [
            {
                label: 'Quantidade de pedidos',
                data: Array.from({length: 7}, () => Math.floor(Math.random() * 100)),
                backgroundColor: 'rgba(132,227,40,0.32)',
                borderColor: 'rgb(99,166,32)',
                borderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: 'Quantidade de pedidos na última semana',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return <Bar data={data} options={options}/>;

}

function ValorTotalDePedidosPorDia() {

    const data = {
        labels: Array.from({
            length: 7
        }, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() + i);
            return date.toLocaleDateString('pt-BR');
        }),
        datasets: [
            {
                label: 'Valor total em pedidos',
                data: Array.from({length: 7}, () => Math.floor(Math.random() * 10000)),
                backgroundColor: 'rgba(115,40,227,0.32)',
                borderColor: 'rgb(112,32,166)',
                borderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: 'Valor total em pedidos na última semana',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return <Bar data={data} options={options}/>;

}

function ClientesUnicosDiarios() {

    const data = {
        labels: Array.from({
            length: 7
        }, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() + i);
            return date.toLocaleDateString('pt-BR');
        }),
        datasets: [
            {
                label: 'Clientes únicos',
                data: Array.from({length: 7}, () => Math.floor(Math.random() * 50)),
                backgroundColor: 'rgba(227,96,40,0.32)',
                borderColor: 'rgb(166,72,32)',
                borderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: 'Quantidade de clientes únicos na última semana',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return <Bar data={data} options={options}/>;

}

function Estoque() {
    const data = {
        labels: ['Cupim', 'Fígado', 'Rabada', 'Serrote', 'Dianteiro'],
        datasets: [
            {
                data: [30, 20, 25, 25, 50],
                backgroundColor: [
                    'rgba(227, 96, 40, 0.32)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255,207,102,0.2)'
                ],
                borderColor: [
                    'rgb(166, 72, 32)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(255,179,102)'
                ],
                borderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'left',
            },
            title: {
                display: true,
                text: 'Distribuição do Estoque',
            },
        },
    };

    return <Pie data={data} options={options}/>;
}