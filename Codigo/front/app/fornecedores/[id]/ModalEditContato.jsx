import React, {useEffect, useState} from "react";

function ModalEditContato({editContato, setEditContato, contato}) {
    const [contatoE, setContatoE] = useState(contato);

    const handleChange = (e) => {
        setContatoE({...contatoE, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:3001/fornecedores/contatos/${contato.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(contatoE),
        })
            .then((response) => {
                if (response.ok) {
                    console.log("Contato atualizado com sucesso");
                    setEditContato(false);
                    window.location.reload();
                } else {
                    console.error("Falha ao atualizar contato");
                }
            })
            .catch((error) => console.error(error));
    };

    useEffect(() => {
        console.log(contatoE);
    }, [contatoE]);

    return (
        <div>
            <div
                className={`${
                    editContato ? "" : "hidden"
                } fixed inset-0 z-10 bg-black bg-opacity-50 flex justify-center items-center`}
            >
                <div className="bg-white p-5 rounded-md w-1/4">
                    <h1 className="text-2xl font-semibold">Editar contato</h1>
                    <form className="mt-2 grid grid-cols-2 gap-2">
                        <label>
                            Nome:
                            <input
                                type="text"
                                name="nome"
                                className="p-2 border-2 border-gray-200 rounded-md w-full"
                                value={contatoE.nome}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Celular:
                            <input
                                type="text"
                                name="celular"
                                className="p-2 border-2 border-gray-200 rounded-md w-full"
                                value={contatoE.celular}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Cargo:
                            <input
                                type="text"
                                name="cargo"
                                className="p-2 border-2 border-gray-200 rounded-md w-full"
                                value={contatoE.cargo}
                                onChange={handleChange}
                            />
                        </label>
                    </form>
                    <div className="mt-4 flex justify-between">
                        <button
                            className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
                            onClick={() => setEditContato(!editContato)}
                        >
                            Cancelar
                        </button>
                        <button
                            className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
                            onClick={handleSubmit}
                        >
                            Salvar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalEditContato;
