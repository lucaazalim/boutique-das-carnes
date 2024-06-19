import Link from "next/link";
import React, {useState} from "react";
import {FaEdit} from "react-icons/fa";
import {FaTrash} from "react-icons/fa6";
import {formatCPFOrCNPJ} from "@/app/utils/string";

function Table({clientes}) {

    const apagarCliente = async (idCliente) => {
        try {
            const response = await fetch(
                `http://localhost:3001/clientes/${idCliente}`,
                {
                    method: "DELETE",
                    redirect: "follow",
                }
            );
            if (response.ok) {
                alert("Cliente apagado com sucesso!");
                window.location.reload();
            } else {
                alert("Falha ao apagar cliente.");
                console.error("Falha ao apagar cliente.");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <table>
            <thead>
            <tr>
                <th>ID</th>
                <th>Tipo</th>
                <th>Nome/Razão Social</th>
                <th>CPF/CNPJ</th>
                <th className>Opções</th>
            </tr>
            </thead>
            <tbody>
            {clientes && clientes.map((cliente) => {

                let document = cliente.pessoa.cpf || cliente.pessoa.cnpj;
                document = formatCPFOrCNPJ(document);

                return <tr key={cliente.id}>
                    <td>{cliente.id}</td>
                    <td>{cliente.tipo}</td>
                    <td>{cliente.pessoa.nome || cliente.pessoa.razao_social}</td>
                    <td>{document}</td>
                    <td className="flex justify-center gap-2">
                        <Link href={`clientes/${cliente.id}`}>
                            <button className="p-2 rounded-md text-white bg-blue-500 hover:bg-blue-600">
                                <FaEdit/>
                            </button>
                        </Link>
                        <button
                            className="p-2 rounded-md text-white bg-red-500 hover:bg-red-600"
                            onClick={() => apagarCliente(cliente.id)}
                        >
                            <FaTrash/>
                        </button>
                    </td>
                </tr>;
            })}
            </tbody>
        </table>
    );
}

export default Table;