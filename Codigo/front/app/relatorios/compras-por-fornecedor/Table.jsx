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

    return (
        <div>
            <table className="w-full mt-5 border-2 border-gray-200 rounded-md">
                <thead>
                <tr className="grid grid-cols-3">
                    <th>Nome do fornecedor</th>
                    <th>Compras no período</th>
                    <th>
                        Valor total das compras no período
                    </th>
                </tr>
                </thead>
                <tbody className="border-t-2 border-gray-300">
                {relatorio.map((record, index) => {
                    const fornecedor = fornecedorData[index];
                    return (
                        <tr key={record.id_fornecedor} className="grid grid-cols-3">
                            <td className="border-r-2 border-gray-200 p-2 flex items-center justify-center">
                                {fornecedor && (fornecedor.pessoa.nome || fornecedor.pessoa.razao_social)}
                            </td>
                            <td className="border-r-2 border-gray-200 p-2 flex items-center justify-center">
                                {record.total_compras}
                            </td>
                            <td className="border-r-2 border-gray-200 p-2 flex items-center justify-center">
                                {formatCurrency(record.valor_total)}
                            </td>
                        </tr>
                    );
                })}
                <tr className="grid grid-cols-3 border-t-2 font-bold">
                    <td className="border-r-2 border-gray-200 p-2 flex items-center justify-center">
                        Total
                    </td>
                    <td className="border-r-2 border-gray-200 p-2 flex items-center justify-center">
                        {relatorio.reduce((acc, record) => acc + record.total_compras, 0)}
                    </td>
                    <td className="border-r-2 border-gray-200 p-2 flex items-center justify-center">
                        {formatCurrency(relatorio.reduce((acc, record) => acc + record.valor_total, 0))}
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}
