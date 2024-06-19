import Link from "next/link";
import React, {useEffect, useState} from "react";
import ModalConf from "./ModalConf";
import {FaEdit} from "react-icons/fa";
import {FaTrash} from "react-icons/fa6";

export default function Table({despesas}) {
    const [open, setOpen] = useState(false);
    const [catDesp, setCatDesp] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3001/despesas-categorias`)
            .then((response) => response.json())
            .then((data) => {
                setCatDesp(data);
            })
            .catch((error) => console.error(error));
    }, []);

    const apagarDespesa = async (idDespesa) => {
        try {
            const response = await fetch(
                `http://localhost:3001/despesas/${idDespesa}`,
                {
                    method: "DELETE",
                    redirect: "follow",
                }
            );
            if (response.ok) {
                alert("Despesa apagada com sucesso!");
                window.location.reload();
            } else {
                alert("Falha ao apagar despesa.");
                console.error("Falha ao apagar despesa.");
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
                <th>Nome</th>
                <th>Valor</th>
                <th>Data</th>
                <th>Categoria</th>
                <th>Opções</th>
            </tr>
            </thead>
            <tbody>
            {despesas && despesas.map((despesa) => {

                const categoria = catDesp.find(
                    (cat) => cat.id === despesa.id_categoria
                );

                return <tr key={despesa.id}>
                    <td>{despesa.id}</td>
                    <td>{despesa.nome}</td>
                    <td>{despesa.valor}</td>
                    <td>{despesa.data}</td>
                    <td>
                        <div className="flex justify-center">
                            <div
                                className="px-2 rounded-full text-white"
                                style={{"background-color": categoria ? categoria.cor : "gray"}}
                            >
                                {categoria ? categoria.nome : "Sem categoria"}
                            </div>
                        </div>
                    </td>
                    <td className="flex justify-center gap-1">
                        <Link href={`despesas/${despesa.id}`}>
                            <button className="p-2 rounded-md text-white bg-blue-500 hover:bg-blue-600">
                                <FaEdit/>
                            </button>
                        </Link>
                        <button
                            className="p-2 rounded-md text-white bg-red-500 hover:bg-red-600"
                            onClick={() => apagarDespesa(despesa.id)}
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
