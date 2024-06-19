import { useState } from "react";
import ModalConfPagamento from "./ModalConfPagamento";
import { FaTrash } from "react-icons/fa6";

export default function TablePagamentos({ pagamentos }) {
    const [open, setOpen] = useState(false);

    function handleRedirect(idPagamento) {
        fetch(`http://localhost:3001/documentos/${idPagamento}`)
            .then((response) => response.json())
            .then((data) => {
                window.open(
                    `http://localhost:3001/documentos/uploads/${data.nome_arquivo}`,
                    "_blank"
                );
            })
            .catch((error) => console.error(error));
    }

    function deletePagamento(idPagamento) {
        fetch(`http://localhost:3001/compras/pagamentos/${idPagamento}`, {
            method: "DELETE",
        })
            .then((response) => {
                if (response.ok) {
                    alert("Pagamento deletado com sucesso");
                    console.log("Pagamento deletado com sucesso");
                    window.location.reload();
                } else {
                    console.error("Falha ao deletar pagamento");
                }
            })
            .catch((error) => console.error(error));
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Meio de Pagamento</th>
                        <th>Valor</th>
                        <th>Comprovante</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {pagamentos &&
                        pagamentos.map((pagamentos) => (
                            <tr key={pagamentos.id}>
                                <td>{pagamentos.id}</td>
                                <td>{pagamentos.meio_pagamento}</td>
                                <td>{pagamentos.valor}</td>
                                <td>
                                    <button
                                        className="p-2 rounded-md text-white bg-zinc-400 hover:bg-zinc-300"
                                        onClick={() =>
                                            handleRedirect(
                                                pagamentos.id_documento_comprovante
                                            )
                                        }
                                    >
                                        Comprovante
                                    </button>
                                </td>
                                <td className="p-2 flex justify-center">
                                    <ModalConfPagamento
                                        open={open}
                                        setOpen={setOpen}
                                        idPagamento={pagamentos.id}
                                    />
                                    <button
                                        className="p-2 rounded-md text-white bg-red-500 hover:bg-red-600"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            deletePagamento(pagamentos.id);
                                        }}
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}
