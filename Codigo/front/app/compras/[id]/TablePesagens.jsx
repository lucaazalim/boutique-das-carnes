import { useState } from "react";
import ModalConfPesagem from "./ModalConfPesagem";
import { FaTrash } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";

export default function TablePesagens({ pesagens }) {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Unidades</th>
                        <th>Peso</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {pesagens &&
                        pesagens.map((pesagem) => (
                            <tr key={pesagem.id}>
                                <td>{pesagem.id}</td>
                                <td>{pesagem.unidades}</td>
                                <td>{pesagem.peso}</td>
                                <td className="flex justify-around">
                                    <button
                                        className="p-2 rounded-md text-white bg-blue-500 hover:bg-blue-600"
                                        onClick={() => setOpenEdit(!openEdit)}
                                    >
                                        <FaEdit />
                                    </button>
                                    <ModalConfPesagem
                                        open={open}
                                        setOpen={setOpen}
                                        idPesagem={pesagem.id}
                                    />
                                    <button
                                        className="p-2 rounded-md text-white bg-red-500 hover:bg-red-600"
                                        onClick={() => setOpen(!open)}
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
