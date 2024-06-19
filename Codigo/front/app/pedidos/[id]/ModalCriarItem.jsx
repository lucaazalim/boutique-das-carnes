import React, { useEffect, useState } from "react";

const ModalCriarItem = ({ openCriar, setOpenCriar, idPedido }) => {
    const [pedido, setPedido] = useState({
        id_pedido: idPedido,
        conjunto: "",
        letra: "",
        quantidade: "",
        peso: "",
        preco: "",
    });

    const handleChange = (e) => {
        setPedido({ ...pedido, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:3001/pedidos/itens", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(pedido),
        })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.error(error));
        setOpenCriar(!openCriar);
        window.location.reload();
    };

    useEffect(() => {
        console.log(pedido);
    }, [pedido]);

    return (
        <div
            className={`${
                openCriar ? "" : "hidden"
            } fixed inset-0 z-10 bg-black bg-opacity-50 flex justify-center items-center`}
        >
            <div className="bg-white p-5 rounded-md w-1/2">
                <h1 className="text-2xl font-semibold">Criar Item</h1>
                <form
                    className="grid grid-cols-2 gap-2"
                    onSubmit={handleSubmit}
                >
                    <label>
                        Conjunto:
                        <select
                            className="p-2 border-2 border-gray-200 rounded-md w-full"
                            name="conjunto"
                            onChange={handleChange}
                        >
                            <option value="">Selecione um conjunto</option>
                            {/* 'FIGADO','FATO','DIANTEIRO_SEM_COSTELA','SERROTE_SEM_RABADA','SERROTE_COM_RABADA','COSTELA','CUPIM','CARCACA','BANDA_CARREGADA','BANDA_DESCARREGADA','DIANTEIRO_COM_COSTELA' */}
                            <option value="FIGADO">Fígado</option>
                            <option value="FATO">Fato</option>
                            <option value="DIANTEIRO_SEM_COSTELA">
                                Dianteiro sem costela
                            </option>
                            <option value="DIANTEIRO_COM_COSTELA">
                                Dianteiro com costela
                            </option>
                            <option value="SERROTE_SEM_RABADA">
                                Serrote sem rabada
                            </option>
                            <option value="SERROTE_COM_RABADA">
                                Serrote com rabada
                            </option>
                            <option value="COSTELA">Costela</option>
                            <option value="CUPIM">Cupim</option>
                            <option value="CARCACA">Carcaça</option>
                            <option value="BANDA_CARREGADA">
                                Banda carregada
                            </option>
                            <option value="BANDA_DESCARREGADA">
                                Banda descarregada
                            </option>
                        </select>
                    </label>
                    <label>
                        Letra:
                        <input
                            type="text"
                            name="letra"
                            onChange={handleChange}
                            className="p-2 border-2 border-gray-200 rounded-md w-full"
                        />
                    </label>
                    <label>
                        Quantidade:
                        <input
                            type="number"
                            name="quantidade"
                            onChange={handleChange}
                            className="p-2 border-2 border-gray-200 rounded-md w-full"
                        />
                    </label>
                    <label>
                        Peso:
                        <input
                            type={"number"}
                            step={0.01}
                            name="peso"
                            onChange={handleChange}
                            className="p-2 border-2 border-gray-200 rounded-md w-full"
                        />
                    </label>
                    <label>
                        Preço:
                        <input
                            type={"number"}
                            step={0.01}
                            name="preco"
                            onChange={handleChange}
                            className="p-2 border-2 border-gray-200 rounded-md w-full"
                        />
                    </label>

                    <div className="mt-5 flex justify-between col-span-2">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                setOpenCriar(!openCriar);
                            }}
                            className="bg-red-500 hover:bg-red-400 p-2 rounded-md text-white"
                        >
                            Cancelar
                        </button>
                        <button
                            className="bg-green-500 hover:bg-green-400 p-2 rounded-md text-white"
                            type="submit"
                        >
                            Salvar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalCriarItem;
