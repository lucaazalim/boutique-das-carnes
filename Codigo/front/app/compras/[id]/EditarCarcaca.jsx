import React, { useEffect } from "react";

function EditarCarcaca({ open, setOpen, carcaca }) {
    const [newCarcaca, setNewCarcaca] = React.useState(carcaca);

    const handleChange = (e) => {
        setNewCarcaca({ ...newCarcaca, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:3001/compras/carcacas/${newCarcaca.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newCarcaca),
        })
            .then((response) => {
                if (response.ok) {
                    console.log("Carcaça atualizado com sucesso");
                    setOpen(false);
                    window.location.reload();
                } else {
                    console.error("Falha ao atualizar carcaça");
                }
            })
            .catch((error) => console.error(error));
    };

    return (
        <div className={`${open ? "" : "hidden"}`}>
            <div className="fixed top-0 left-0 w-full h-full bg-zinc-800/70 z-50"></div>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-5 z-50 max-h-[calc(100vh-20%)] rounded-md overflow-auto">
                <h1 className="text-2xl font-semibold">Editar Carcaça</h1>
                <form
                    className="mt-5 grid grid-cols-2 gap-2"
                    onSubmit={handleSubmit}
                >
                    <label>
                        Sequencial:
                        <input
                            type="number"
                            name="sequencial"
                            value={newCarcaca.sequencial}
                            className="p-2 border-2 border-gray-200 rounded-md w-full"
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Peso Total:
                        <input
                            type="number"
                            name="peso_total"
                            max={999}
                            value={newCarcaca.peso_total}
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

export default EditarCarcaca;
