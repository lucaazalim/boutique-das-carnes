import { useState } from "react";
import ModalConfCarcaca from "./ModalConfCarcaca";
import { FaTrash } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import EditarCarcaca from "./EditarCarcaca";

export default function TableCarcacas({ carcacas }) {
    const [openEdit, setOpenEdit] = useState(false);

    const apagarCarcaca = async (idCarcaca) => {
        try {
            const response = await fetch(
                `http://localhost:3001/compras/carcacas/${idCarcaca}`,
                {
                    method: "DELETE",
                    redirect: "follow",
                }
            );
            if (response.ok) {
                alert("Carcaça apagada com sucesso");
                window.location.reload();
            } else {
                console.error("Falha ao apagar carcaça");
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
                        <th>Sequencial</th>
                        <th>Letra</th>
                        <th>Peso Total</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {carcacas &&
                        carcacas.map((carcaca) => (
                            <tr key={carcaca.id}>
                                <td>{carcaca.id}</td>
                                <td>{carcaca.sequencial}</td>
                                <td>
                                    {String.fromCharCode(
                                        64 + carcaca.sequencial
                                    )}
                                </td>
                                <td>{carcaca.peso_total}</td>
                                <td className="flex justify-around">
                                    <button
                                        className="p-2 rounded-md text-white bg-blue-500 hover:bg-blue-600"
                                        onClick={() => setOpenEdit(!openEdit)}
                                    >
                                        <FaEdit />
                                    </button>
                                    <EditarCarcaca
                                        open={openEdit}
                                        setOpen={setOpenEdit}
                                        carcaca={carcaca}
                                    />
                                    <button
                                        className="p-2 rounded-md text-white bg-red-500 hover:bg-red-600"
                                        onClick={() =>
                                            apagarCarcaca(carcaca.id)
                                        }
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
