import Link from "next/link";
import React, {useState} from "react";
import ModalConf from "./ModalConf";
import {FaEdit} from "react-icons/fa";
import {FaTrash} from "react-icons/fa6";

export default function Table({catDespesas}) {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <table>
                <thead>
                <tr>
                    <th>Nome</th>
                    <th>Descrição</th>
                    <th>Cor</th>
                    <th>Opções</th>
                </tr>
                </thead>
                <tbody>
                {catDespesas && catDespesas.map((catDesp) =>
                    <tr key={catDesp.id}>
                        <td>
                            {catDesp.nome}
                        </td>
                        <td>
                            {catDesp.descricao}
                        </td>
                        <td>
                            <div className="flex justify-center">
                                <div className="h-6 w-6 rounded-full" style={{'background-color': catDesp.cor}}></div>
                            </div>
                        </td>
                        <td className="flex justify-center gap-1">
                            <Link href={`categoria-despesa/${catDesp.id}`}>
                                <button className="p-2 rounded-md text-white bg-blue-500 hover:bg-blue-600">
                                    <FaEdit/>
                                </button>
                            </Link>
                            <ModalConf
                                open={open}
                                setOpen={setOpen}
                                idCatDesp={catDesp.id}
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
        </div>
    );
}
