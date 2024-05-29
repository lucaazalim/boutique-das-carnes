import React, {useState} from "react";

function ModalCriar({openModal, setOpenModal}) {
    const [usuario, setUsuario] = useState({
        usuario: "",
        nome: "",
        email: "",
        cargo: "",
        senha: "",
    });

    async function handleSubmit(e) {
        e.preventDefault();
        const response = await fetch(`http://localhost:3001/usuarios`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(usuario),
            redirect: "follow",
        });
        window.location.reload();
    }

    function handleChange(e) {
        setUsuario({...usuario, [e.target.name]: e.target.value});
    }

    return (
        <div className={`${openModal ? "" : "hidden"}`}>
            <div className="fixed top-0 left-0 w-full h-full bg-zinc-800/70 z-50"></div>
            <div
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-5 z-50 max-h-[calc(100vh-20%)] rounded-md overflow-auto scrollbartop">
                <h1 className="text-2xl font-semibold">Criar Usuário</h1>
                <form className="mt-5 grid grid-cols-2 gap-2" onSubmit={handleSubmit}>
                    <label>
                        Usuário:
                        <input
                            name="usuario"
                            onChange={(e) => handleChange(e)}
                            type="text"
                            className="p-2 border-2 border-gray-200 rounded-md w-full"
                        />
                    </label>
                    <label>
                        Nome:
                        <input
                            name="nome"
                            onChange={(e) => handleChange(e)}
                            type="text"
                            className="p-2 border-2 border-gray-200 rounded-md w-full"
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            name="email"
                            onChange={(e) => handleChange(e)}
                            type="email"
                            className="p-2 border-2 border-gray-200 rounded-md w-full"
                        />
                    </label>
                    <label>
                        Cargo:
                        <select
                            name="cargo"
                            onChange={(e) => handleChange(e)}
                            className="p-2 border-2 border-gray-200 rounded-md w-full"
                        >
                            <option value="">Selecione o cargo</option>
                            <option value="ADMINISTRADOR">Administrador</option>
                            <option value="GERENTE">Gerente</option>
                        </select>
                    </label>
                    <label>
                        Senha:
                        <input
                            name="senha"
                            onChange={(e) => handleChange(e)}
                            type="password"
                            className="p-2 border-2 border-gray-200 rounded-md w-full"
                        />
                    </label>
                    <button
                        type="submit"
                        className="bg-green-500 text-white p-2 rounded-md col-span-2"
                    >
                        Criar
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            setOpenModal(false);
                        }}
                        className="bg-red-500 text-white p-2 rounded-md col-span-2"
                    >
                        Cancelar
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ModalCriar;
