"use client";

import React, {useEffect, useState} from "react";
import TableItens from "./TableItens";
import ModalCriarItem from "./ModalCriarItem";

function Page({params}) {
    const [openCriar, setOpenCriar] = useState(false);
    const [pedido, setPedido] = useState({
        id_cliente: "",
        id_compra: "",
        data: null,
    });
    const [clientes, setClientes] = useState([]);
    const [compras, setCompras] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3001/pedidos/${params.id}`)
            .then((response) => response.json())
            .then((data) => setPedido(data))
            .catch((error) => console.error(error));
        fetch("http://localhost:3001/clientes")
            .then((response) => response.json())
            .then((data) => setClientes(data))
            .catch((error) => console.error(error));
        fetch("http://localhost:3001/compras")
            .then((response) => response.json())
            .then((data) => setCompras(data))
            .catch((error) => console.error(error));
    }, [params]);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:3001/pedidos/${params.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(pedido),
        })
            .then((response) => response.json())
            .then((data) => {
                window.history.back();
            })
            .catch((error) => console.error(error));
    };

    const handleChange = (e) => {
        setPedido({...pedido, [e.target.name]: e.target.value});
    };

    return (
        <div className="p-5 h-[calc(100vh-212px)] overflow-auto">
            <h1 className="text-4xl font-semibold mb-5">Editar Pedido</h1>
            <form className="grid grid-cols-1 gap-2" onSubmit={handleSubmit}>
                <label>
                    Data
                    <input
                        type="date"
                        name="data"
                        className="p-2 border-2 border-gray-200 rounded-md w-full"
                        onChange={handleChange}
                        value={pedido.data}
                    />
                </label>
                <label>
                    Cliente
                    <select
                        className="p-2 border-2 border-gray-200 rounded-md w-full"
                        onChange={handleChange}
                        name="id_cliente"
                    >
                        <option value={""}>Selecione um cliente</option>
                        {clientes.map((cliente) => (
                            <option
                                key={cliente.id}
                                value={cliente.id}
                                selected={cliente.id == pedido.id_cliente}
                            >
                                {cliente.tipo === "PJ" ? cliente.pessoa.razao_social : cliente.pessoa.nome}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Compra
                    <select
                        className="p-2 border-2 border-gray-200 rounded-md w-full"
                        onChange={handleChange}
                        name="id_compra"
                    >
                        <option value={""}>Selecione uma compra</option>
                        {compras.map((compra) => (
                            <option
                                key={compra.id}
                                value={compra.id}
                                selected={compra.id == pedido.id_compra}
                            >
                                {compra.id}
                            </option>
                        ))}
                    </select>
                </label>
                <button
                    className="p-2 bg-green-500 text-white rounded-md w-full"
                    type="submit"
                >
                    Salvar
                </button>
            </form>

            <h1 className="text-4xl font-semibold mt-5">Itens</h1>
            <div className="mt-5">
                <TableItens idPedido={params.id}/>
            </div>
            <div className="mt-2 w-full flex justify-center">
                <button
                    onClick={() => setOpenCriar(true)}
                    className="p-2 bg-green-500 text-white rounded-md"
                >
                    Adicionar Item
                </button>
            </div>
            <ModalCriarItem
                openCriar={openCriar}
                setOpenCriar={setOpenCriar}
                idPedido={params.id}
            />
        </div>
    );
}

export default Page;
