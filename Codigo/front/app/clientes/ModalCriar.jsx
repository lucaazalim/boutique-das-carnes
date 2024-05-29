import {useEffect, useState} from "react";
import {estados} from "../utils/estados";

function ModalCriar({openModal, setOpenModal}) {
    const [fornecedor, setFornecedor] = useState({
        ativo: true,
        tipo: "PF",
        email: "",
        telefone: "",
        celular: "",
        cep: "",
        logradouro: "",
        bairro: "",
        numero: "",
        complemento: "",
        estado: "SP",
        cidade: "",
        notas: "",
        pessoa: {},
    });

    function handleChange(e) {
        if (e.target.name === "nome" || e.target.name === "cpf") {
            setFornecedor({
                ...fornecedor,
                pessoa: {...fornecedor.pessoa, [e.target.name]: e.target.value},
            });
            return;
        }
        if (
            e.target.name === "razao_social" ||
            e.target.name === "nome_fantasia" ||
            e.target.name === "cnpj"
        ) {
            setFornecedor({
                ...fornecedor,
                pessoa: {...fornecedor.pessoa, [e.target.name]: e.target.value},
            });
            return;
        } else setFornecedor({...fornecedor, [e.target.name]: e.target.value});
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const response = await fetch("http://localhost:3001/clientes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(fornecedor),
            redirect: "follow",
        });
        window.location.reload();
    }

    return (
        <div className={`${openModal ? "" : "hidden"}`}>
            <div className="fixed top-0 left-0 w-full h-full bg-zinc-800/70 z-50"></div>
            <div
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-5 z-50 max-h-[calc(100vh-20%)] rounded-md overflow-auto scrollbartop">
                <h1 className="text-2xl font-semibold">Criar Cliente</h1>
                <form className="mt-5 grid grid-cols-2 gap-2" onSubmit={handleSubmit}>
                    <label>
                        Tipo:
                        <select
                            name="tipo"
                            className="p-2 border-2 border-gray-200 rounded-md w-full"
                            onChange={(e) => {
                                setFornecedor({
                                    ...fornecedor,
                                    pessoa: {},
                                });
                                handleChange(e);
                            }}
                        >
                            <option value="PF">Pessoa Física</option>
                            <option value="PJ">Pessoa Jurídica</option>
                        </select>
                    </label>
                    {fornecedor.tipo && fornecedor.tipo === "PF" ? (
                        <>
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
                                CPF:
                                <input
                                    name="cpf"
                                    onChange={(e) => handleChange(e)}
                                    type="number"
                                    min={0}
                                    className="p-2 border-2 border-gray-200 rounded-md w-full"
                                />
                            </label>
                        </>
                    ) : (
                        <>
                            <label>
                                Razão Social:
                                <input
                                    name="razao_social"
                                    onChange={(e) => handleChange(e)}
                                    type="text"
                                    className="p-2 border-2 border-gray-200 rounded-md w-full"
                                />
                            </label>
                            <label>
                                Nome Fantasia:
                                <input
                                    name="nome_fantasia"
                                    onChange={(e) => handleChange(e)}
                                    type="text"
                                    className="p-2 border-2 border-gray-200 rounded-md w-full"
                                />
                            </label>
                            <label>
                                CNPJ:
                                <input
                                    name="cnpj"
                                    onChange={(e) => handleChange(e)}
                                    type="number"
                                    min={0}
                                    className="p-2 border-2 border-gray-200 rounded-md w-full"
                                />
                            </label>
                        </>
                    )}
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
                        Telefone:
                        <input
                            name="telefone"
                            onChange={(e) => handleChange(e)}
                            type="tel"
                            className="p-2 border-2 border-gray-200 rounded-md w-full"
                        />
                    </label>
                    <label>
                        Celular:
                        <input
                            name="celular"
                            onChange={(e) => handleChange(e)}
                            type="tel"
                            className="p-2 border-2 border-gray-200 rounded-md w-full"
                        />
                    </label>
                    <label>
                        CEP:
                        <input
                            name="cep"
                            onChange={(e) => handleChange(e)}
                            type="number"
                            className="p-2 border-2 border-gray-200 rounded-md w-full"
                        />
                    </label>
                    <label>
                        Logradouro:
                        <input
                            name="logradouro"
                            onChange={(e) => handleChange(e)}
                            type="text"
                            className="p-2 border-2 border-gray-200 rounded-md w-full"
                        />
                    </label>
                    <label>
                        Bairro:
                        <input
                            name="bairro"
                            onChange={(e) => handleChange(e)}
                            type="text"
                            className="p-2 border-2 border-gray-200 rounded-md w-full"
                        />
                    </label>
                    <label>
                        Número:
                        <input
                            name="numero"
                            onChange={(e) => handleChange(e)}
                            type="number"
                            className="p-2 border-2 border-gray-200 rounded-md w-full"
                        />
                    </label>
                    <label>
                        Complemento:
                        <input
                            name="complemento"
                            onChange={(e) => handleChange(e)}
                            type="text"
                            className="p-2 border-2 border-gray-200 rounded-md w-full"
                        />
                    </label>
                    <label>
                        Estado:
                        <select
                            name="estado"
                            onChange={(e) => handleChange(e)}
                            className="p-2 border-2 border-gray-200 rounded-md w-full"
                        >
                            {estados.map((estado) => {
                                return (
                                    <option key={estado.sigla} value={estado.sigla}>
                                        {estado.nome}
                                    </option>
                                );
                            })}
                        </select>
                    </label>
                    <label>
                        Cidade:
                        <input
                            name="cidade"
                            onChange={(e) => handleChange(e)}
                            type="tel"
                            className="p-2 border-2 border-gray-200 rounded-md w-full"
                        />
                    </label>
                    <label>
                        Notas:
                        <textarea
                            name="notas"
                            onChange={(e) => handleChange(e)}
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
