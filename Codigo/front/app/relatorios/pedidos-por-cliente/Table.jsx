import {useEffect, useState} from 'react';
import {formatCurrency} from '../../utils/currency';
import Link from "next/link";
import {FaArrowUpRightFromSquare} from "react-icons/fa6";

export default function Table({relatorio}) {
    
    const [clienteData, setClienteData] = useState([]);

    useEffect(() => {

        const fetchCliente = async (id_cliente) => {
            const response = await fetch(`http://localhost:3001/clientes/${id_cliente}`);
            return response.json();
        };

        const fetchAllClientes = async () => {
            const data = await Promise.all(
                relatorio.map((record) => fetchCliente(record.id_cliente))
            );
            setClienteData(data);
        };

        if (relatorio.length > 0) {
            fetchAllClientes();
        }

    }, [relatorio]);

    return <table>
        <thead>
        <tr>
            <th>Cliente</th>
            <th>Total de pedidos</th>
            <th>Valor total dos pedidos</th>
        </tr>
        </thead>
        <tbody>
        {relatorio.map((record, index) => {

            const cliente = clienteData[index];

            return (
                <tr key={record.id_cliente}>
                    <td>
                        <Link href={`/clientes/${record.id_cliente}`}>
                            <div className="flex flex-row items-center justify-center gap-2">
                                {cliente && (cliente.pessoa.nome || cliente.pessoa.razao_social)}
                                <FaArrowUpRightFromSquare className="text-link"/>
                            </div>
                        </Link>
                    </td>
                    <td>
                        {record.total_pedidos}
                    </td>
                    <td>
                        {formatCurrency(record.valor_total)}
                    </td>
                </tr>
            );
        })}
        </tbody>
        <tfoot>
        <tr>
            <td>
            </td>
            <td>
                {relatorio.reduce((acc, record) => acc + record.total_pedidos, 0)}
            </td>
            <td>
                {formatCurrency(relatorio.reduce((acc, record) => acc + record.valor_total, 0))}
            </td>
        </tr>
        </tfoot>
    </table>;
}
