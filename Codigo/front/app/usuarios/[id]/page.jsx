"use client";

import {useEffect, useState} from "react";

function Page({params}) {
    const [usuario, setUsuario] = useState({});

    useEffect(() => {
        fetch(`http://localhost:3001/usuarios/${params.id}`)
            .then((response) => response.json())
            .then((data) => {
                setUsuario(data);
            })
            .catch((error) => console.error(error));
    }, [params.id]);

    function handleChange(e) {
        setUsuario({...usuario, [e.target.name]: e.target.value});
    }

    function handleSubmit(e) {
        e.preventDefault();
        fetch(`http://localhost:3001/usuarios/${params.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(usuario),
            redirect: "follow",
        })
            .then((response) => response.json())
            .then((data) => {
                window.history.back();
            })
            .catch((error) => console.error(error));
    }

    return (
        <div className="p-5 overflow-auto mb-[80px]">
            <h1 className="text-4xl font-semibold">Editar Usuário</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Usuario:
                    <input
                        type="text"
                        name="usuario"
                        value={usuario.usuario}
                        onChange={handleChange}
                        className="p-2 border-2 border-gray-200 rounded-md w-full"
                    />
                </label>
                <label>
                    Nome:
                    <input
                        type="text"
                        name="nome"
                        value={usuario.nome}
                        onChange={handleChange}
                        className="p-2 border-2 border-gray-200 rounded-md w-full"
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={usuario.email}
                        onChange={handleChange}
                        className="p-2 border-2 border-gray-200 rounded-md w-full"
                    />
                </label>
                <button
                    type="submit"
                    className="p-2 bg-green-500 text-white rounded-md mt-2"
                >
                    Salvar
                </button>
            </form>
        </div>
    );
}

export default Page;
