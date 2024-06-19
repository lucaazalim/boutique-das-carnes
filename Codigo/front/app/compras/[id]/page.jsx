"use client";

import { useEffect, useState } from "react";
import TableCarcacas from "./TableCarcacas";
import CriarCarcaca from "./CriarCarcaca";
import CriarPagamento from "./CriarPagamento";
import CriarPesagem from "./CriarPesagem";
import TablePagamentos from "./TablePagamentos";
import TablePesagens from "./TablePesagens";
import DocumentWrapper from "./DocumentWrapper";

export default function Page({ params }) {
    const [compra, setCompra] = useState({});
    const [fornecedores, setFornecedores] = useState([]);
    const [openCarcaca, setOpenCarcaca] = useState(false);
    const [openPesagem, setOpenPesagem] = useState(false);
    const [openPagamento, setOpenPagamento] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:3001/compras/${params.id}`)
            .then((response) => response.json())
            .then((data) => {
                setCompra(data);
            })
            .catch((error) => console.error(error));
    }, [params.id]);

    useEffect(() => {
        fetch(`http://localhost:3001/fornecedores`)
            .then((response) => response.json())
            .then((data) => {
                setFornecedores(data);
            })
            .catch((error) => console.error(error));
    }, []);

    function handleChange(e) {
        setCompra({ ...compra, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const response = await fetch(
            `http://localhost:3001/compras/${params.id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(compra),
                redirect: "follow",
            }
        );
        const data = await response.json();
        console.log(data);
        window.history.back();
    }

    return (
        <div className="p-5 h-[calc(100vh-136px)] overflow-auto">
            <h1 className="text-4xl font-semibold">Editar Compra</h1>
            <form
                className="mt-5 grid grid-cols-2 gap-2"
                onSubmit={handleSubmit}
            >
                <label>
                    Fornecedor:
                    <select
                        name="id_fornecedor"
                        value={compra.id_fornecedor}
                        onChange={handleChange}
                        className="p-2 border-2 border-gray-300 rounded-md w-full h-[44px]"
                    >
                        {fornecedores.map((fornecedor) => (
                            <option key={fornecedor.id} value={fornecedor.id}>
                                {fornecedor.pessoa.nome ||
                                    fornecedor.pessoa.razao_social}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Unidades Macho:
                    <input
                        onChange={handleChange}
                        type="number"
                        name="unidades_macho"
                        value={compra.unidades_macho}
                        className="p-2 border-2 border-gray-300 rounded-md w-full"
                    />
                </label>
                <label>
                    Unidades Fêmea:
                    <input
                        onChange={handleChange}
                        type="number"
                        name="unidades_femea"
                        value={compra.unidades_femea}
                        className="p-2 border-2 border-gray-300 rounded-md w-full"
                    />
                </label>
                <label>
                    Preço da Arroba:
                    <input
                        onChange={handleChange}
                        type="number"
                        name="preco_arroba"
                        value={compra.preco_arroba}
                        className="p-2 border-2 border-gray-300 rounded-md w-full"
                    />
                </label>
                <label>
                    Desconto:
                    <input
                        onChange={handleChange}
                        type="number"
                        name="desconto"
                        value={compra.desconto}
                        className="p-2 border-2 border-gray-300 rounded-md w-full"
                    />
                </label>
                <label>
                    Preço frete:
                    <input
                        onChange={handleChange}
                        type="number"
                        name="preco_frete"
                        value={compra.preco_frete}
                        className="p-2 border-2 border-gray-300 rounded-md w-full"
                    />
                </label>
                <label>
                    Preço sangria:
                    <input
                        onChange={handleChange}
                        type="number"
                        name="preco_sangria"
                        value={compra.preco_sangria}
                        className="p-2 border-2 border-gray-300 rounded-md w-full"
                    />
                </label>

                <button className="p-2 bg-green-500 hover:bg-green-400 text-white rounded-md col-span-2">
                    Salvar
                </button>
            </form>
            <div className="col-span-2 w-full">
                <DocumentWrapper compra={compra} />
            </div>

            <div>
                <h1 className="text-3xl font-semibold mt-5">Pagamentos</h1>
                <div className="mt-5">
                    <TablePagamentos pagamentos={compra.pagamentos} />
                </div>
                <button
                    className="bg-green-500 p-2 text-white rounded-md w-full mt-2"
                    onClick={() => setOpenPagamento(!openPagamento)}
                >
                    Criar Pagamento
                </button>
                <CriarPagamento
                    openPagamento={openPagamento}
                    setOpenPagamento={setOpenPagamento}
                    idPagamento={params.id}
                />
            </div>

            <div>
                <h1 className="text-3xl font-semibold mt-5">Pesagens</h1>
                <div className="mt-5">
                    <TablePesagens pesagens={compra.pesagens} />
                </div>
                <button
                    className="bg-green-500 p-2 text-white rounded-md w-full mt-2"
                    onClick={() => setOpenPesagem(!openPesagem)}
                >
                    Criar Pesagem
                </button>
                <CriarPesagem
                    openPesagem={openPesagem}
                    setOpenPesagem={setOpenPesagem}
                    idCompra={params.id}
                />
            </div>

            <div>
                <h1 className="text-3xl font-semibold mt-5">Carcaças</h1>
                <div className="mt-5">
                    <TableCarcacas carcacas={compra.carcacas} />
                </div>
                <button
                    className="bg-green-500 p-2 text-white rounded-md w-full mt-2"
                    onClick={() => setOpenCarcaca(!openCarcaca)}
                >
                    Criar Carcaça
                </button>
                <CriarCarcaca
                    openCarcaca={openCarcaca}
                    setOpenCarcaca={setOpenCarcaca}
                    idCompra={params.id}
                />
            </div>
        </div>
    );
}
