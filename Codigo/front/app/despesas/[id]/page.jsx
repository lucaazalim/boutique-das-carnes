"use client";

import React from "react";

function Page({params}) {
    const [despesa, setDespesa] = React.useState({});
    const [categorias, setCategorias] = React.useState([]);

    React.useEffect(() => {
        fetch(`http://localhost:3001/despesas/${params.id}`)
            .then((response) => response.json())
            .then((data) => {
                setDespesa(data);
            })
            .catch((error) => console.error(error));

        fetch(`http://localhost:3001/despesas-categorias`)
            .then((response) => response.json())
            .then((data) => {
                setCategorias(data);
            })
            .catch((error) => console.error(error));
    }, [params.id]);

    const handleChange = (e) => {
        setDespesa({...despesa, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:3001/despesas/${params.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(despesa),
            redirect: "follow",
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                window.history.back();
            })
            .catch((error) => console.error(error));
    };

    return (
        <div className="p-5 h-[calc(100vh-212px)] overflow-auto">
            <h1 className="text-4xl font-semibold">Editar Despesa</h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-2">
                <label>
                    Data:
                    <input
                        type="date"
                        name="data"
                        value={despesa.data}
                        onChange={handleChange}
                        className="p-2 border-2 border-gray-200 rounded-md w-full"
                    />
                </label>
                <label>
                    Valor:
                    <input
                        type="number"
                        name="valor"
                        value={despesa.valor}
                        onChange={handleChange}
                        className="p-2 border-2 border-gray-200 rounded-md w-full"
                    />
                </label>
                <label>
                    Nome:
                    <input
                        type="text"
                        name="nome"
                        value={despesa.nome}
                        onChange={handleChange}
                        className="p-2 border-2 border-gray-200 rounded-md w-full"
                    />
                </label>
                <label>
                    Categoria:
                    <select
                        name="id_categoria"
                        onChange={handleChange}
                        className="p-2 border-2 border-gray-200 rounded-md w-full"
                    >
                        <option value="">Selecione uma categoria</option>
                        {categorias.map((cat) => {
                            return (
                                <option key={cat.id} value={cat.id}>
                                    {cat.nome}
                                </option>
                            );
                        })}
                    </select>
                </label>
                <div className="w-full flex justify-center">
                    <button className="mt-2 p-2 bg-green-500 hover:bg-green-600 rounded-md text-white w-1/4">
                        Salvar
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Page;
