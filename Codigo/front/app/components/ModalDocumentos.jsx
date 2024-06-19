"use client";

import {useEffect, useState} from "react";

function ModalDocumentos({openDocumento, setOpenDocumento, setIdDoc}) {
    const [dados, setDados] = useState({
        numero_referencia: "",
        descricao: "",
    });
    var arquivo = null;

    function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("file", arquivo);
        formData.append("numero_referencia", dados.numero_referencia);
        formData.append("descricao", dados.descricao);

        fetch("http://localhost:3001/documentos", {
            method: "POST",
            body: formData,
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    console.log(response);
                    throw new Error("Falha ao criar documento: ");
                }
            })
            .then((data) => {
                console.log("Documento criado com sucesso");
                setIdDoc(data.id);
                setOpenDocumento(false);
            })
            .catch((error) => console.error(error));
    }

    function handleChange(e) {
        setDados({...dados, [e.target.name]: e.target.value});
    }

    function handleFile(e) {
        arquivo = e.target.files[0];
        console.log(arquivo);
    }

    return (
        <div className={openDocumento ? "" : "hidden"}>
            <div className="fixed top-0 left-0 w-full h-full bg-zinc-800/70 z-50"></div>
            <div
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-5 z-50 max-h-[calc(100vh-20%)] rounded-md overflow-auto">
                <h1 className="text-2xl font-semibold">Anexar documento</h1>
                <form className="mt-5 grid grid-cols-2 gap-2" onSubmit={handleSubmit}>
                    <label>
                        Número de Referência:
                        <input
                            type="number"
                            name="numero_referencia"
                            min={0}
                            className="p-2 border-2 border-gray-200 rounded-md w-full"
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Descrição:
                        <input
                            type="text"
                            name="descricao"
                            className="p-2 border-2 border-gray-200 rounded-md w-full"
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Arquivo:
                        <input
                            type="file"
                            name="arquivo"
                            className="p-2 border-2 border-gray-200 rounded-md w-full"
                            onChange={handleFile}
                        />
                    </label>
                    <div className="col-span-2 flex justify-between">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                setOpenDocumento(false);
                            }}
                            className="bg-red-500 text-white p-2 rounded-md"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="bg-green-500 text-white p-2 rounded-md"
                        >
                            Salvar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModalDocumentos;
