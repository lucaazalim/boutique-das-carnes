"use client";

import React, {useEffect, useState} from "react";

function Page({params}) {
    const [categoria, setCategoria] = useState({});

    useEffect(() => {
        fetch(`http://localhost:3001/despesas-categorias/${params.id}`)
            .then((response) => response.json())
            .then((data) => setCategoria(data))
            .catch((error) => console.error(error));
    }, [params.id]);

    const handleChange = (e) => {
        setCategoria({...categoria, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`http://localhost:3001/despesas-categorias/${params.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(categoria),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                window.location.href = "/categoria-despesa";
            })
            .catch((error) => console.error(error));
    };

    return (
        <div>
            <h1 className="text-4xl font-semibold">Editar Categoria de Despesa</h1>
            <form className="grid grid-cols-1 gap-2 mt-5">
                <label>
                    Nome:
                    <input
                        type="text"
                        name="nome"
                        className="p-2 border-2 border-gray-200 rounded-md w-full"
                        value={categoria.nome}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Descrição:
                    <input
                        type="text"
                        name="descricao"
                        className="p-2 border-2 border-gray-200 rounded-md w-full"
                        value={categoria.descricao}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Cor:
                    <input
                        type="color"
                        name="cor"
                        className="p-2 border-2 border-gray-200 rounded-md w-full h-14"
                        value={categoria.cor}
                        onChange={handleChange}
                    />
                </label>
                <button
                    type="submit"
                    className="bg-green-500 text-white p-2 rounded-md"
                    onClick={handleSubmit}
                >
                    Salvar
                </button>
            </form>
        </div>
    );
}

export default Page;
