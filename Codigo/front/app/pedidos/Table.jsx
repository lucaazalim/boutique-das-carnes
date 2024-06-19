import Link from "next/link";
import React, {useEffect, useState} from "react";
import {FaEdit, FaTrash} from "react-icons/fa";
import {formatCurrency} from "@/app/utils/currency";

const Table = ({pedidos}) => {

    const [clienteData, setClienteData] = useState([]);

    const apagarPedido = async (idPedido) => {
        try {
            const response = await fetch(
                `http://localhost:3001/pedidos/${idPedido}`,
                {
                    method: "DELETE",
                    redirect: "follow",
                }
            );
            if (response.ok) {
                alert("Pedido apagado com sucesso");
                console.log("Pedido apagado com sucesso");
                window.location.reload();
            } else {
                console.error("Falha ao apagar pedido");
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {

        const fetchCliente = async (id_cliente) => {
            const response = await fetch(`http://localhost:3001/clientes/${id_cliente}`);
            return response.json();
        };

        const fetchAllClientes = async () => {
            const data = await Promise.all(
                pedidos.map((record) => fetchCliente(record.id_cliente))
            );
            setClienteData(data);
        };

        if (pedidos.length > 0) {
            fetchAllClientes();
        }

    }, [pedidos]);

    return (
        <div>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Data</th>
                    <th>Cliente</th>
                    <th>Valor total</th>
                    <th>Opções</th>
                </tr>
                </thead>
                <tbody>
                {pedidos && pedidos.map((pedido, index) => {

                    const cliente = clienteData[index];
                    const clienteName = cliente && (cliente.tipo === "PJ" ? cliente.pessoa.razao_social : cliente.pessoa.nome);

                    return <tr key={pedido.id}>
                        <td>{pedido.id}</td>
                        <td>{formatTimestampToDate(pedido.data)}</td>
                        <td>{clienteName}</td>
                        <td>
                            {formatCurrency(pedido.itens.reduce((acc, item) => acc + item.valor_total, 0))}
                        </td>
                        <td className="flex justify-center gap-1">
                            <Link href={`pedidos/${pedido.id}`}>
                                <button className="p-2 rounded-md text-white bg-blue-500 hover:bg-blue-600">
                                    <FaEdit/>
                                </button>
                            </Link>
                            <button
                                className="p-2 rounded-md text-white bg-red-500 hover:bg-red-600"
                                onClick={() => apagarPedido(pedido.id)}
                            >
                                <FaTrash/>
                            </button>
                        </td>
                    </tr>;
                })}
                </tbody>
            </table>
        </div>
    );
};

function formatTimestampToDate(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleDateString("pt-BR");
}

export default Table;
