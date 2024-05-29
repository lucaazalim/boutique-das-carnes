import {useEffect, useState} from 'react';
import {formatCurrency} from '../../utils/currency';
import Link from "next/link";
import {FaArrowUpRightFromSquare} from "react-icons/fa6";

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
            <th>Compra</th>
            <th>Fornecedor</th>
            <th>Valor</th>
            <th>Custo</th>
            <th>Receita</th>
            <th>Lucro</th>
        </tr>
        </thead>
        <tbody>
        {relatorio.map((record, index) => {

            const fornecedor = fornecedorData[index];

            return (
                <tr key={record.id_compra}>
                    <td>
                        <Link href={`/compras/${record.id}`}>
                            <div className="flex flex-row items-center justify-center gap-2">
                                <span>{record.id}</span>
                                <FaArrowUpRightFromSquare className="text-link"/>
                            </div>
                        </Link>
                    </td>
                    <td>
                        <Link href={`/fornecedores/${record.id_fornecedor}`}>
                            <div className="flex flex-row items-center justify-center gap-2">
                                {fornecedor && (fornecedor.pessoa.nome || fornecedor.pessoa.razao_social)}
                                <FaArrowUpRightFromSquare className="text-link"/>
                            </div>
                        </Link>
                    </td>
                    <td>
                        {formatCurrency(record.valor_total)}
                    </td>
                    <td>
                        {formatCurrency(record.custo_total)}
                    </td>
                    <td>
                        {formatCurrency(record.receita_total)}
                    </td>
                    <td>
                        {formatCurrency(record.lucro)}
                    </td>
                </tr>
            );
        })}
        </tbody>
        <tfoot>
        <tr>
            <td colSpan="2">
            </td>
            <td>
                {formatCurrency(relatorio.reduce((acc, record) => acc + record.valor_total, 0))}
            </td>
            <td>
                {formatCurrency(relatorio.reduce((acc, record) => acc + record.custo_total, 0))}
            </td>
            <td>
                {formatCurrency(relatorio.reduce((acc, record) => acc + record.receita_total, 0))}
            </td>
            <td>
                {formatCurrency(relatorio.reduce((acc, record) => acc + record.lucro, 0))}
            </td>
        </tr>
        </tfoot>
    </table>;
}
