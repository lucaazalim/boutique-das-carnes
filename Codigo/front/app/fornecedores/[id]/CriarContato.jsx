import {useState} from "react";

function CriarContato({openContato, setOpenContato, idFornecedor}) {
    const [contato, setContato] = useState({
        id_fornecedor: idFornecedor,
        nome: "",
        celular: "",
        cargo: "",
    });

    function handleChange(e) {
        setContato({...contato, [e.target.name]: e.target.value});
    }

    function handleSubmit(e) {
        e.preventDefault();
        fetch(`http://localhost:3001/fornecedores/${idFornecedor}/contatos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(contato),
        })
            .then((response) => {
                if (response.ok) {
                    console.log("Contato criado com sucesso");
                    setOpenContato(false);
                    window.location.reload();
                } else {
                    console.error("Falha ao criar contato");
                }
            })
            .catch((error) => console.error(error));
    }

    return (
        <div className={`${openContato ? "" : "hidden"}`}>
            <div className="fixed top-0 left-0 w-full h-full bg-zinc-800/70 z-50"></div>
            <div
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-5 z-50 max-h-[calc(100vh-20%)] rounded-md overflow-auto">
                <h1 className="text-2xl font-semibold">Criar Contato</h1>
                <form className="mt-5 grid grid-cols-2 gap-2" onSubmit={handleSubmit}>
                    <label>
                        Nome:
                        <input
                            type="text"
                            name="nome"
                            className="p-2 border-2 border-gray-200 rounded-md w-full"
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Celular:
                        <input
                            type="text"
                            name="celular"
                            className="p-2 border-2 border-gray-200 rounded-md w-full"
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Cargo:
                        <input
                            type="text"
                            name="cargo"
                            className="p-2 border-2 border-gray-200 rounded-md w-full"
                            onChange={handleChange}
                        />
                    </label>
                    <div className="col-span-2 flex justify-between">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                setOpenContato(!openContato);
                            }}
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

export default CriarContato;
