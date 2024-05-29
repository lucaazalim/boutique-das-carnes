import Link from "next/link";
import React, {useEffect, useState} from "react";
import ModalConf from "./ModalConf";
import {FaEdit, FaTrash} from "react-icons/fa";

const Table = ({pedidos}) => {

    const [open, setOpen] = useState(false);
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/clientes")
            .then((response) => response.json())
            .then((data) => setClientes(data))
            .catch((error) => console.error(error));
    }, []);

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
                {pedidos && pedidos.map((pedido) => {

                    const cliente = clientes.find(c => c.id === pedido.id_cliente);
                    const clienteName = cliente.tipo === "PJ" ? cliente.pessoa.razao_social : cliente.pessoa.nome;

                    return <tr key={pedido.id}>
                        <td>{pedido.id}</td>
                        <td>{formatTimestampToDate(pedido.data)}</td>
                        <td>{clienteName}</td>
                        <td></td>
                        <td className="flex justify-center gap-1">
                            <Link href={`pedidos/${pedido.id}`}>
                                <button className="p-2 rounded-md text-white bg-blue-500 hover:bg-blue-600">
                                    <FaEdit/>
                                </button>
                            </Link>
                            <ModalConf
                                open={open}
                                setOpen={setOpen}
                                idPedido={pedido.id}
                            />
                            <button
                                className="p-2 rounded-md text-white bg-red-500 hover:bg-red-600"
                                onClick={() => setOpen(!open)}
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
