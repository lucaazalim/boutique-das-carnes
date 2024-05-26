"use client";

import {useState} from "react";

export default function Login() {
    const [data, setData] = useState({
        usuario: "",
        senha: "",
    });

    function handleChange(e) {
        setData({...data, [e.target.name]: e.target.value});
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const response = await fetch(`http://localhost:3001/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            redirect: "follow",
        });
        if (response.ok) {
            window.location.replace("/");
        }
    }

    return (
        <div
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-5 z-50 max-h-[calc(100vh-20%)] rounded-md overflow-auto border-2 border-gray-400 shadow-xl">
            <h1 className="flex justify-center text-2xl font-semibold">
                Fazer Login
            </h1>
            <form className="mt-2" onSubmit={handleSubmit}>
                <label>
                    Usuário:
                    <input
                        type="text"
                        name="usuario"
                        className="p-2 border-2 border-gray-200 rounded-md w-full"
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Senha:
                    <input
                        type="password"
                        name="senha"
                        className="p-2 border-2 border-gray-200 rounded-md w-full"
                        onChange={handleChange}
                    />
                </label>
                <button
                    className="bg-green-500 text-white p-2 rounded-md w-full mt-5"
                    type="submit"
                >
                    Entrar
                </button>
            </form>
        </div>
    );
}
