"use client";

import React, {useEffect, useState} from "react";
import {estados} from "@/app/utils/estados";
import TableContatos from "./TableContatos";
import CriarContato from "./CriarContato";

function Page({params}) {
    const [fornecedor, setFornecedor] = useState({});
    const [openContatos, setOpenContatos] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:3001/fornecedores/${params.id}`)
            .then((response) => response.json())
            .then((data) => {
                setFornecedor(data);
            })
            .catch((error) => console.error(error));
    }, [params.id]);

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
        const response = await fetch(
            `http://localhost:3001/fornecedores/${params.id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(fornecedor),
                redirect: "follow",
            }
        );
        const data = await response.json();
        window.history.back();
    }

    return (
        <div className="h-[calc(100vh-136px)] overflow-auto">
            <h1 className="text-4xl font-semibold">Editar Fornecedor</h1>
            <form className="mt-5 grid grid-cols-2 gap-2" onSubmit={handleSubmit}>
                {fornecedor.tipo === "PF" && (
                    <>
                        <label>
                            Nome:
                            <input
                                onChange={handleChange}
                                type="text"
                                name="nome"
                                value={fornecedor.pessoa.nome}
                                className="p-2 border-2 border-gray-200 rounded-md w-full"
                            />
                        </label>
                        <label>
                            CPF:
                            <input
                                onChange={handleChange}
                                type="text"
                                name="cpf"
                                value={fornecedor.pessoa.cpf}
                                className="p-2 border-2 border-gray-200 rounded-md w-full"
                            />
                        </label>
                    </>
                )}
                {fornecedor.tipo === "PJ" && (
                    <>
                        <label>
                            Razão Social:
                            <input
                                onChange={handleChange}
                                type="text"
                                name="razao_social"
                                value={fornecedor.pessoa.razao_social}
                                className="p-2 border-2 border-gray-200 rounded-md w-full"
                            />
                        </label>
                        <label>
                            Nome Fantasia:
                            <input
                                onChange={handleChange}
                                type="text"
                                name="nome_fantasia"
                                value={fornecedor.pessoa.nome_fantasia}
                                className="p-2 border-2 border-gray-200 rounded-md w-full"
                            />
                        </label>
                        <label>
                            CNPJ:
                            <input
                                onChange={handleChange}
                                type="text"
                                name="cnpj"
                                value={fornecedor.pessoa.cnpj}
                                className="p-2 border-2 border-gray-200 rounded-md w-full"
                            />
                        </label>
                    </>
                )}
                <label>
                    Email:
                    <input
                        onChange={handleChange}
                        type="email"
                        name="email"
                        value={fornecedor.email}
                        className="p-2 border-2 border-gray-200 rounded-md w-full"
                    />
                </label>
                <label>
                    Telefone:
                    <input
                        onChange={handleChange}
                        type="tel"
                        name="telefone"
                        value={fornecedor.telefone}
                        className="p-2 border-2 border-gray-200 rounded-md w-full"
                    />
                </label>
                <label>
                    Celular:
                    <input
                        onChange={handleChange}
                        type="tel"
                        name="celular"
                        value={fornecedor.celular}
                        className="p-2 border-2 border-gray-200 rounded-md w-full"
                    />
                </label>
                <label>
                    CEP:
                    <input
                        onChange={handleChange}
                        type="text"
                        name="cep"
                        value={fornecedor.cep}
                        className="p-2 border-2 border-gray-200 rounded-md w-full"
                    />
                </label>
                <label>
                    Logradouro:
                    <input
                        onChange={handleChange}
                        type="text"
                        name="logradouro"
                        value={fornecedor.logradouro}
                        className="p-2 border-2 border-gray-200 rounded-md w-full"
                    />
                </label>
                <label>
                    Bairro:
                    <input
                        onChange={handleChange}
                        type="text"
                        name="bairro"
                        value={fornecedor.bairro}
                        className="p-2 border-2 border-gray-200 rounded-md w-full"
                    />
                </label>
                <label>
                    Numero:
                    <input
                        onChange={handleChange}
                        type="text"
                        name="numero"
                        value={fornecedor.numero}
                        className="p-2 border-2 border-gray-200 rounded-md w-full"
                    />
                </label>
                <label>
                    Complemento:
                    <input
                        onChange={handleChange}
                        type="text"
                        name="complemento"
                        value={fornecedor.complemento}
                        className="p-2 border-2 border-gray-200 rounded-md w-full"
                    />
                </label>
                <label>
                    Estado:
                    <select
                        className="p-2 border-2 border-gray-200 rounded-md w-full"
                        onChange={handleChange}
                        name="estado"
                    >
                        {estados.map((estado) => (
                            <option key={estado.sigla} value={estado.sigla}>
                                {estado.nome}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Cidade:
                    <input
                        onChange={handleChange}
                        type="text"
                        name="cidade"
                        value={fornecedor.cidade}
                        className="p-2 border-2 border-gray-200 rounded-md w-full"
                    />
                </label>
                <label>
                    Notas:
                    <textarea
                        onChange={handleChange}
                        name="notas"
                        value={fornecedor.notas}
                        className="p-2 border-2 border-gray-200 rounded-md w-full"
                    />
                </label>
                <button className="p-2 bg-green-500 hover:bg-green-400 text-white rounded-md col-span-2">
                    Salvar
                </button>
            </form>

            <h1 className="text-3xl font-semibold mt-5">Contatos</h1>
            <div className="mt-5">
                <TableContatos contatos={fornecedor.contatos}/>
            </div>
            <button
                className="bg-green-500 p-2 text-white rounded-md w-full mt-2"
                onClick={() => setOpenContatos(!openContatos)}
            >
                Criar Contato
            </button>
            <CriarContato
                openContato={openContatos}
                setOpenContato={setOpenContatos}
                idFornecedor={params.id}
            />
        </div>
    );
}

export default Page;
