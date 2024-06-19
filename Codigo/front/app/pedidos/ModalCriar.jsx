import { useEffect, useState } from "react";

function ModalCriar({ open, setOpen }) {
    const [pedido, setPedido] = useState({
        id_cliente: "",
        id_compra: "",
        data: null,
        valor_total: "",
    });
    const [compras, setCompras] = useState([]);
    const [clientes, setClientes] = useState([]);

    const handleChange = (e) => {
        setPedido({ ...pedido, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        fetch("http://localhost:3001/clientes")
            .then((response) => response.json())
            .then((data) => setClientes(data))
            .catch((error) => console.error(error));
        fetch("http://localhost:3001/compras")
            .then((response) => response.json())
            .then((data) => setCompras(data))
            .catch((error) => console.error(error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:3001/pedidos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(pedido),
        })
            .then((response) => response.json())
            .then((data) => {
                alert("Pedido criado com sucesso");
                console.log(data);
                window.location.reload();
            })
            .catch((error) => console.error(error));
        setOpen(!open);
        window.location.reload();
    };

    return (
        <div className={`${open ? "" : "hidden"}`}>
            <div className="fixed top-0 left-0 w-full h-full bg-zinc-800/70 z-50"></div>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-5 z-50 max-h-[calc(100vh-20%)] rounded-md overflow-auto scrollbartop">
                <h1 className="text-2xl font-semibold">Criar Pedido</h1>
                <form
                    className="mt-5 grid grid-cols-2 gap-2"
                    onSubmit={handleSubmit}
                >
                    <label>
                        Data:
                        <input
                            type="date"
                            name="data"
                            className="p-2 border-2 border-gray-200 rounded-md w-full"
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Cliente:
                        <select
                            name="id_cliente"
                            className="p-2 border-2 border-gray-200 rounded-md w-full"
                            onChange={handleChange}
                        >
                            <option value="">Selecione um cliente</option>
                            {clientes &&
                                clientes.map((cliente) => (
                                    <option key={cliente.id} value={cliente.id}>
                                        {cliente.tipo === "PJ"
                                            ? cliente.pessoa.razao_social
                                            : cliente.pessoa.nome}
                                    </option>
                                ))}
                        </select>
                    </label>
                    <label>
                        Compra:
                        <select
                            name="id_compra"
                            className="p-2 border-2 border-gray-200 rounded-md w-full"
                            onChange={handleChange}
                        >
                            <option value="">Selecione uma compra</option>
                            {compras &&
                                compras.map((compra) => (
                                    <option key={compra.id} value={compra.id}>
                                        {compra.id}
                                    </option>
                                ))}
                        </select>
                    </label>
                    <div className="grid grid-cols-2 col-span-2 gap-2 mt-5">
                        <button
                            className="p-2 rounded-md text-white bg-red-500 hover:bg-red-600"
                            onClick={(e) => {
                                e.preventDefault();
                                setOpen(!open);
                            }}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="p-2 rounded-md text-white bg-green-500 hover:bg-green-600"
                        >
                            Criar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModalCriar;
