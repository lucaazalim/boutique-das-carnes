import React, { useEffect, useState } from "react";
import ModalConf from "./ModalConf";
import { formatCurrency } from "@/app/utils/currency";
import { FaTrash } from "react-icons/fa6";

function TableItens({ idPedido }) {
    const [open, setOpen] = useState(false);
    const [itens, setItens] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3001/pedidos/${idPedido}/itens`)
            .then((response) => response.json())
            .then((data) => setItens(data))
            .catch((error) => console.error(error));
    }, [idPedido]);

    const apagarItem = async (idItem) => {
        try {
            const response = await fetch(
                `http://localhost:3001/pedidos/itens/${idItem}`,
                {
                    method: "DELETE",
                    redirect: "follow",
                }
            );
            if (response.ok) {
                alert("Item apagado com sucesso");
                console.log("Item apagado com sucesso");
                window.location.reload();
            } else {
                console.error("Falha ao apagar item");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Produto</th>
                        <th>Quantidade</th>
                        <th>Valor</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {itens &&
                        itens.map((item) => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.conjunto}</td>
                                    <td>{item.quantidade}</td>
                                    <td>{formatCurrency(item.preco)}</td>
                                    <td className="p-2 flex items-center justify-center ">
                                        <ModalConf
                                            open={open}
                                            setOpen={setOpen}
                                            idItem={item.id}
                                        />
                                        <button
                                            className="p-2 bg-red-500 text-white rounded-md"
                                            onClick={() => {
                                                apagarItem(item.id);
                                            }}
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
}

export default TableItens;
