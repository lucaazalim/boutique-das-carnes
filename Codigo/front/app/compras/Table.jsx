import Link from "next/link";
import React, {useEffect, useState} from "react";
import ModalConf from "./ModalConf";
import {FaEdit, FaTrash} from "react-icons/fa";
import {formatCurrency} from "@/app/utils/currency";

export default function Table({compras}) {
    const [fornecedores, setFornecedores] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3001/fornecedores`)
            .then((response) => response.json())
            .then((data) => {
                setFornecedores(data);
            })
            .catch((error) => console.error(error));
    }, []);

    const apagarCompra = async (idCompra) => {
        try {
            const response = await fetch(
                `http://localhost:3001/compras/${idCompra}`,
                {
                    method: "DELETE",
                    redirect: "follow",
                }
            );
            if (response.ok) {
                alert("Compra apagada com sucesso!");
                window.location.reload();
            } else {
                alert("Falha ao apagar compra. Confira se não há carcaças vinculadas.");
                console.error("Falha ao apagar compra.");
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
                            <td>{formatCurrency((pesagens / 30) * compra.preco_arroba - (compra.desconto + compra.preco_sangria - compra.preco_frete) || 0)}</td>
                            <td className="flex justify-center gap-1">
                                <Link href={`compras/${compra.id}`}>
                                    <button className="p-2 rounded-md text-white bg-blue-500 hover:bg-blue-600">
                                        <FaEdit/>
                                    </button>
                                </Link>
                                <button
                                    className="p-2 rounded-md text-white bg-red-500 hover:bg-red-600"
                                    onClick={() => apagarCompra(compra.id)}
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