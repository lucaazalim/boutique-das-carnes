import React, { useEffect } from "react";

function EditarPesagem({ open, setOpen, pesagem }) {
    const [newPesagem, setNewPesagem] = React.useState(pesagem);

    const handleChange = (e) => {
        setNewPesagem({ ...newPesagem, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:3001/compras/pesagens/${newPesagem.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPesagem),
        })
            .then((response) => {
                if (response.ok) {
                    console.log("Pesagem atualizado com sucesso");
                    setOpen(false);
                    window.location.reload();
                } else {
                    console.error("Falha ao atualizar pesagem");
                }
            })
            .catch((error) => console.error(error));
    };

    return (
        <div className={`${open ? "" : "hidden"}`}>
            <div className="fixed top-0 left-0 w-full h-full bg-zinc-800/70 z-50"></div>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-5 z-50 max-h-[calc(100vh-20%)] rounded-md overflow-auto">
                <h1 className="text-2xl font-semibold">Editar Pesagem</h1>
                <form
                    className="mt-5 grid grid-cols-2 gap-2"
                    onSubmit={handleSubmit}
                >
                    <label>
                        Unidades:
                        <input
                            type="number"
                            name="unidades"
                            value={newPesagem.unidades}
                            className="p-2 border-2 border-gray-200 rounded-md w-full"
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Peso:
                        <input
                            type="number"
                            name="peso"
                            value={newPesagem.peso}
                            className="p-2 border-2 border-gray-200 rounded-md w-full"
                            onChange={handleChange}
                        />
                    </label>
                    <div className="col-span-2 flex justify-between">
                        <button
                            onClick={() => setOpen(!open)}
                            className="bg-red-500 text-white p-2 rounded-md"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="bg-green-500 text-white p-2 rounded-md"
                        >
                            Salvar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditarPesagem;
