import ModalDocumentos from "@/app/components/ModalDocumentos";
import {useEffect, useState} from "react";

function CriarPagamento({openPagamento, setOpenPagamento, idPagamento}) {
    const [pagamento, setPagamento] = useState({
        id_compra: idPagamento,
        meio_pagamento: "",
        valor: null,
        id_documento_comprovante: null,
    });

    const [openDocumento, setOpenDocumento] = useState(false);
    const [idDoc, setIdDoc] = useState(null);

    function handleSubmit(e) {
        e.preventDefault();
        fetch(`http://localhost:3001/compras/${idPagamento}/pagamentos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(pagamento),
        })
            .then((response) => {
                if (response.ok) {
                    console.log("Pagamento criado com sucesso");
                    setOpenPagamento(false);
                    window.location.reload();
                } else {
                    console.error("Falha ao criar pagamento");
                }
            })
            .catch((error) => console.error(error));
    }

    useEffect(() => {
        setPagamento({...pagamento, id_documento_comprovante: idDoc});
    }, [idDoc]);

    function handleChange(e) {
        setPagamento({...pagamento, [e.target.name]: e.target.value});
    }

    return (
        <div className={`${openPagamento ? "" : "hidden"}`}>
            <div className="fixed top-0 left-0 w-full h-full bg-zinc-800/70 z-50"></div>
            <div
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-5 z-50 max-h-[calc(100vh-20%)] rounded-md overflow-auto">
                <h1 className="text-2xl font-semibold">Criar Pagamento</h1>
                <form className="mt-5 grid grid-cols-2 gap-2" onSubmit={handleSubmit}>
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
                        Meio de Pagamento:
                        <select
                            name="meio_pagamento"
                            className="p-2 border-2 border-gray-200 rounded-md w-full h-[46px]"
                            onChange={handleChange}
                        >
                            <option value="">Selecione uma forma de pagamento</option>
                            <option value="PIX">PIX</option>
                        </select>
                    </label>
                    <label>
                        Valor:
                        <input
                            type="number"
                            name="valor"
                            step={0.01}
                            className="p-2 border-2 border-gray-200 rounded-md w-full"
                            onChange={handleChange}
                        />
                    </label>
                    <button
                        className="bg-blue-500 h-[44px] text-white p-2 rounded-md col-span-2"
                        onClick={(e) => {
                            e.preventDefault();
                            setOpenDocumento(!openDocumento);
                        }}
                    >
                        Adicionar Comprovante
                    </button>
                    <div className="col-span-2 flex justify-between">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                setOpenPagamento(!openPagamento);
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
            <ModalDocumentos
                openDocumento={openDocumento}
                setOpenDocumento={setOpenDocumento}
                setIdDoc={setIdDoc}
            />
        </div>
    );
}

export default CriarPagamento;
