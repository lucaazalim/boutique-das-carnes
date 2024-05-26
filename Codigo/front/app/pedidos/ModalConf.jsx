import React from "react";

export default function ModalConf({open, setOpen, idPedido}) {
    const apagarPedido = async () => {
        try {
            const response = await fetch(
                `http://localhost:3001/pedidos/${idPedido}`,
                {
                    method: "DELETE",
                    redirect: "follow",
                }
            );
            if (response.ok) {
                console.log("Pedido apagado com sucesso");
            } else {
                console.error("Falha ao apagar pedido");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div
            className={`${
                open ? "" : "hidden"
            } fixed inset-0 z-10 bg-black bg-opacity-50 flex justify-center items-center`}
        >
            <div className="bg-white p-5 rounded-md w-1/4">
                <h1 className="text-2xl font-semibold">Confirmação</h1>
                <p className="mt-5">Deseja realmente apagar este pedido?</p>
                <div className="mt-5 flex justify-end">
                    <button
                        className="p-2 rounded-md text-white bg-red-500 hover:bg-red-600"
                        onClick={() => {
                            apagarPedido();
                            setOpen(!open);
                            window.location.reload();
                        }}
                    >
                        Apagar
                    </button>
                    <button
                        className="ml-5 p-2 rounded-md text-white bg-gray-500 hover:bg-gray-600"
                        onClick={() => setOpen(!open)}
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
}