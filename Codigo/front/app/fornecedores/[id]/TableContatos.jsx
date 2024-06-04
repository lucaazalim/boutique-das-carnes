import { useState } from "react";
import ModalConfContato from "./ModalConfContato";
import ModalEditContato from "./ModalEditContato";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";

function TableContatos({ contatos }) {
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Celular</th>
                        <th>Cargo</th>
                        <th className="p-2">Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {contatos &&
                        contatos.map((contato) => {
                            return (
                                <tr key={contato.id}>
                                    <td>{contato.id}</td>
                                    <td>{contato.nome}</td>
                                    <td>{contato.celular}</td>
                                    <td>{contato.cargo}</td>
                                    <td className="flex justify-around">
                                        <button
                                            className="p-2 rounded-md text-white bg-blue-500 hover:bg-blue-600"
                                            onClick={() =>
                                                setOpenEdit(!openEdit)
                                            }
                                        >
                                            <FaEdit />
                                        </button>
                                        <ModalEditContato
                                            contato={contato}
                                            setEditContato={setOpenEdit}
                                            editContato={openEdit}
                                        />
                                        <ModalConfContato
                                            open={open}
                                            setOpen={setOpen}
                                            idContato={contato.id}
                                        />
                                        <button
                                            className="p-2 rounded-md text-white bg-red-500 hover:bg-red-600"
                                            onClick={() => setOpen(!open)}
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
}

export default TableContatos;
