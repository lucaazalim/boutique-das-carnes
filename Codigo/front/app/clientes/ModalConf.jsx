import {Router} from "next/navigation";
import React from "react";

function ModalConf({open, setOpen, idCliente}) {
    const apagarCliente = async () => {
        try {
            const response = await fetch(
                `http://localhost:3001/clientes/${idCliente}`,
                {
                    method: "DELETE",
                    redirect: "follow",
                }
            );
            if (response.ok) {
                console.log("Fornecedor apagado com sucesso");
            } else {
                console.error("Falha ao apagar fornecedor");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <div
                className={`${
                    open ? "" : "hidden"
                } fixed inset-0 z-10 bg-black bg-opacity-50 flex justify-center items-center`}
            >
                <div className="bg-white p-5 rounded-md w-1/4">
                    <h1 className="text-2xl font-semibold">Confirmação</h1>
                    <p className="mt-5">Deseja realmente apagar este cliente?</p>
                    <div className="mt-5 flex justify-end">
                        <button
                            className="p-2 rounded-md text-white bg-red-500 hover:bg-red-600"
                            onClick={() => {
                                apagarCliente();
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
        </div>
    );
}

export default ModalConf;
