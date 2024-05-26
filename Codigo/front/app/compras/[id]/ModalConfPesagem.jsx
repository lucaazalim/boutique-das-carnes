import React from "react";

function ModalConfPesagem({open, setOpen, idPesagem}) {
    async function apagarPesagem() {
        try {
            const response = await fetch(
                `http://localhost:3001/compras/pesagens/${idPesagem}`,
                {
                    method: "DELETE",
                    redirect: "follow",
                }
            );
            if (response.ok) {
                console.log("Pesagem apagada com sucesso");
                window.location.reload();
            } else {
                console.error("Falha ao apagar pesagem");
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <div
                className={`${
                    open ? "" : "hidden"
                } fixed inset-0 z-10 bg-black bg-opacity-50 flex justify-center items-center`}
            >
                <div className="bg-white p-5 rounded-md w-1/4">
                    <h1 className="text-2xl font-semibold">Confirmação</h1>
                    <p className="mt-5">Deseja realmente apagar esta compra?</p>
                    <div className="mt-5 flex justify-end">
                        <button
                            className="p-2 rounded-md text-white bg-red-500 hover:bg-red-600"
                            onClick={() => {
                                apagarPesagem();
                                setOpen(!open);
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

export default ModalConfPesagem;
