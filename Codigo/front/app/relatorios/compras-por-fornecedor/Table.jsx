import {useEffect, useState} from 'react';

const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
};

export default function Table({relatorio}) {
    const [fornecedorData, setFornecedorData] = useState([]);

    useEffect(() => {
        const fetchFornecedor = async (id_fornecedor) => {
            const response = await fetch(`http://localhost:3001/fornecedores/${id_fornecedor}`);
            return response.json();
        };

        const fetchAllFornecedores = async () => {
            const data = await Promise.all(
                relatorio.map((record) => fetchFornecedor(record.id_fornecedor))
            );
            setFornecedorData(data);
        };

        if (relatorio.length > 0) {
            fetchAllFornecedores();
        }
    }, [relatorio]);

    return <table>
        <thead>
        <tr>
            <th>Nome do fornecedor</th>
            <th>Compras no período</th>
            <th>
                Valor total das compras no período
            </th>
        </tr>
        </thead>
        <tbody>
        {relatorio.map((record, index) => {
            const fornecedor = fornecedorData[index];
            return (
                <tr key={record.id_fornecedor}>
                    <td>
                        {fornecedor && (fornecedor.pessoa.nome || fornecedor.pessoa.razao_social)}
                    </td>
                    <td>
                        {record.total_compras}
                    </td>
                    <td>
                        {formatCurrency(record.valor_total)}
                    </td>
                </tr>
            );
        })}
        <tr>
            <td>
                Total
            </td>
            <td>
                {relatorio.reduce((acc, record) => acc + record.total_compras, 0)}
            </td>
            <td>
                {formatCurrency(relatorio.reduce((acc, record) => acc + record.valor_total, 0))}
            </td>
        </tr>
        </tbody>
    </table>;
}
