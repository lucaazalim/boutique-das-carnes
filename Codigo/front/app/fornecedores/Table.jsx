import Link from "next/link";
import React, {useState} from "react";
import ModalConf from "./ModalConf";
import {FaEdit} from "react-icons/fa";
import {FaTrash} from "react-icons/fa6";

function Table({fornecedores}) {
    const [open, setOpen] = useState(false);

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
            {fornecedores && fornecedores.map((fornecedor) =>
                <tr key={fornecedor.id}>
                    <td>{fornecedor.id}</td>
                    <td>{fornecedor.tipo}</td>
                    <td>{fornecedor.pessoa.nome || fornecedor.pessoa.razao_social}</td>
                    <td>{fornecedor.pessoa.cpf || fornecedor.pessoa.cnpj}</td>
                    <td className="flex justify-center gap-1">
                        <Link href={`fornecedores/${fornecedor.id}`}>
                            <button className="p-2 rounded-md text-white bg-blue-500 hover:bg-blue-600">
                                <FaEdit/>
                            </button>
                        </Link>
                        <ModalConf
                            open={open}
                            setOpen={setOpen}
                            idFornecedor={fornecedor.id}
                        />
                        <button
                            className="p-2 rounded-md text-white bg-red-500 hover:bg-red-600"
                            onClick={() => setOpen(!open)}
                        >
                            <FaTrash/>
                        </button>
                    </td>
                </tr>
            )}
            </tbody>
        </table>
    );
}

export default Table;
