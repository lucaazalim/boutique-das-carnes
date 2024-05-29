import Link from "next/link";
import React, {useState} from "react";
import ModalConf from "./ModalConf";
import {FaEdit} from "react-icons/fa";
import {FaTrash} from "react-icons/fa6";
import {formatCPFOrCNPJ} from "@/app/utils/string";

function Table({clientes}) {
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
            {clientes && clientes.map((cliente) => {

                let document = cliente.pessoa.cpf || cliente.pessoa.cnpj;
                document = formatCPFOrCNPJ(document);

                <tr key={cliente.id}>
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
                        <ModalConf
                            open={open}
                            setOpen={setOpen}
                            idCliente={cliente.id}
                        />
                        <button
                            className="p-2 rounded-md text-white bg-red-500 hover:bg-red-600"
                            onClick={() => setOpen(!open)}
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