import Link from "next/link";
import React, {useEffect, useState} from "react";
import ModalConf from "./ModalConf";
import {FaEdit, FaTrash} from "react-icons/fa";
import {formatCurrency} from "@/app/utils/currency";

export default function Table({compras}) {
    const [open, setOpen] = useState(false);
    const [fornecedores, setFornecedores] = useState([]);

    useEffect(() => {
        fetch(`http://vps.azal.im:3001/fornecedores`)
            .then((response) => response.json())
            .then((data) => {
                setFornecedores(data);
            })
            .catch((error) => console.error(error));
    }, []);

    return (
        <div>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Fornecedor</th>
                    <th>Numero de Animais</th>
                    <th>Preço Total</th>
                    <th>Opções</th>
                </tr>
                </thead>
                <tbody>
                {compras &&
                    fornecedores &&
                    compras.map((compra) => {
                        let fornecedor = fornecedores.find(
                            (fornecedor) => fornecedor.id === compra.id_fornecedor
                        );
                        let pesagens = 0;

                        pesagens = compra.pesagens.reduce((acc, pesagem) => {
                            return acc + pesagem.peso;
                        }, 0);

                        return <tr key={compra.id}>
                            <td>{compra.id}</td>
                            <td>{fornecedor &&
                                (fornecedor.pessoa.nome ||
                                    fornecedor.pessoa.razao_social)}</td>
                            <td>{compra.unidades_macho + compra.unidades_femea}</td>
                            <td>{formatCurrency(pesagens * compra.preco_arroba - compra.desconto || 0)}</td>
                            <td className="flex justify-center gap-1">
                                <Link href={`compras/${compra.id}`}>
                                    <button className="p-2 rounded-md text-white bg-blue-500 hover:bg-blue-600">
                                        <FaEdit/>
                                    </button>
                                </Link>
                                <ModalConf
                                    open={open}
                                    setOpen={setOpen}
                                    idCompra={compra.id}
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
        </div>
    );
}