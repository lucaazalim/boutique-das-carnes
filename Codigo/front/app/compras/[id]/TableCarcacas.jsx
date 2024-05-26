import {useState} from "react";
import ModalConfCarcaca from "./ModalConfCarcaca";
import {FaTrash} from "react-icons/fa6";
import {FaEdit} from "react-icons/fa";

export default function TableCarcacas({carcacas}) {
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);

    return (
        <div>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Sequencial</th>
                    <th>Letra</th>
                    <th>Carregado</th>
                    <th>Peso Total</th>
                    <th>Opções</th>
                </tr>
                </thead>
                <tbody>
                {carcacas && carcacas.map((carcaca) =>
                    <tr key={carcaca.id}>
                        <td>{carcaca.id}</td>
                        <td>{carcaca.sequencial}</td>
                        <td>{String.fromCharCode(64 + carcaca.sequencial)}</td>
                        <td>{carcaca.carregado ? "Sim" : "Não"}</td>
                        <td>{carcaca.peso_total}</td>
                        <td className="flex justify-center">
                            <button
                                className="p-2 rounded-md text-white bg-blue-500 hover:bg-blue-600"
                                onClick={() => setOpenEdit(!openEdit)}
                            >
                                <FaEdit/>
                            </button>
                            <button
                                className="p-2 rounded-md text-white bg-red-500 hover:bg-red-600"
                                onClick={() => setOpen(!open)}
                            >
                                <FaTrash/>
                            </button>
                            <ModalConfCarcaca
                                open={open}
                                setOpen={setOpen}
                                idCarcaca={carcaca.id}
                            />
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
}