import React, {useEffect, useState} from "react";
import ModalConf from "./ModalConf";

function TableItens({idPedido}) {
    const [openEdit, setOpenEdit] = useState(false);
    const [open, setOpen] = useState(false);
    const [itens, setItens] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3001/pedidos/${idPedido}/itens`)
            .then((response) => response.json())
            .then((data) => setItens(data))
            .catch((error) => console.error(error));
    }, [idPedido]);

    return (
        <div>
            <table className="w-full">
                <thead>
                <tr className="grid grid-cols-5">
                    <th>ID</th>
                    <th>Produto</th>
                    <th>Quantidade</th>
                    <th>Valor</th>
                    <th className="p-2">Apagar</th>
                </tr>
                </thead>
                <tbody className="border-t-2 border-gray-300">
                {itens &&
                    itens.map((item) => {
                        return (
                            <tr key={item.id} className="grid grid-cols-5">
                                <td className="border-r-2 border-gray-200 p-2 flex items-center justify-center">
                                    {item.id}
                                </td>
                                <td className="border-r-2 border-gray-200 p-2 flex items-center justify-center">
                                    {item.conjunto}
                                </td>
                                <td className="border-r-2 border-gray-200 p-2 flex items-center justify-center">
                                    {item.quantidade}
                                </td>
                                <td className="border-r-2 border-gray-200  p-2 flex items-center justify-center">
                                    {item.preco}
                                </td>
                                <td className="p-2 flex items-center justify-center ">

                                    <ModalConf open={open} setOpen={setOpen} idItem={item.id}/>
                                    <button
                                        className="p-2 bg-red-500 text-white rounded-md"
                                        onClick={() => {
                                            setOpen(!open);
                                        }}
                                    >
                                        Apagar
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

export default TableItens;
