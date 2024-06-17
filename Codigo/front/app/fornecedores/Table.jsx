import Link from "next/link";
import React, {useState} from "react";
import ModalConf from "./ModalConf";
import {FaEdit} from "react-icons/fa";
import {FaTrash} from "react-icons/fa6";
import {formatCPFOrCNPJ} from "@/app/utils/string";

function Table({fornecedores}) {

    const apagarFornecedor = async (idFornecedor) => {
        try {
            const response = await fetch(
                `http://localhost:3001/fornecedores/${idFornecedor}`,
                {
                    method: "DELETE",
                    redirect: "follow",
                }
            );
            if (response.ok) {
                alert("Fornecedor apagado com sucesso!");
                window.location.reload();
            } else {
                alert("Falha ao apagar fornecedor.");
                console.error("Falha ao apagar fornecedor.");
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
            {fornecedores && fornecedores.map((fornecedor) => {

                let document = fornecedor.pessoa.cpf || fornecedor.pessoa.cnpj;
                document = formatCPFOrCNPJ(document);

                return <tr key={fornecedor.id}>
                    <td>{fornecedor.id}</td>
                    <td>{fornecedor.tipo}</td>
                    <td>{fornecedor.pessoa.nome || fornecedor.pessoa.razao_social}</td>
                    <td>{document}</td>
                    <td className="flex justify-center gap-1">
                        <Link href={`fornecedores/${fornecedor.id}`}>
                            <button className="p-2 rounded-md text-white bg-blue-500 hover:bg-blue-600">
                                <FaEdit/>
                            </button>
                        </Link>
                        <button
                            className="p-2 rounded-md text-white bg-red-500 hover:bg-red-600"
                            onClick={() => apagarFornecedor(fornecedor.id)}
                        >
                            <FaTrash/>
                        </button>
                    </td>
                </tr>
            })}
            </tbody>
        </table>
    );
}

export default Table;
