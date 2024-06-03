import ModalDocumentos from "@/app/components/ModalDocumentos";
import React, { useEffect } from "react";

function DocumentWrapper({ compra }) {
    const [openDocumento, setOpenDocumento] = React.useState(false);
    const [idDoc, setIdDoc] = React.useState(null);
    const [nomeDoc, setNomeDoc] = React.useState("");
    const [success, setSuccess] = React.useState(false);

    function handleRedirect(idPagamento) {
        fetch(`http://localhost:3001/documentos/${idPagamento}`)
            .then((response) => response.json())
            .then((data) => {
                window.open(
                    `http://localhost:3001/documentos/uploads/${data.nome_arquivo}`,
                    "_blank"
                );
            })
            .catch((error) => console.error(error));
    }

    const handleClick = React.useCallback((idDoc) => {
        let obj = {};
        obj[nomeDoc] = idDoc;

        fetch(`http://localhost:3001/compras/${compra.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow",
            body: JSON.stringify(obj),
        })
            .then((response) => response.ok)
            .then(() => {
                setSuccess(true);
            })
            .catch((error) => console.error(error));
    }, [compra.id, nomeDoc]);

    useEffect(() => {
        handleClick(idDoc);
    }, [nomeDoc, idDoc, handleClick]);

    return (
        <div className="my-3 grid gap-2">
            <button
                className="bg-gray-100 border-2 border-gray-300 hover:bg-gray-200 rounded-md p-2 w-full"
                onClick={() => {
                    if (compra.id_documento_romaneio) {
                        handleRedirect(compra.id_documento_romaneio);
                    } else {
                        setOpenDocumento(true);
                        setNomeDoc("id_documento_romaneio");
                    }
                }}
            >
                {compra.id_documento_romaneio
                    ? "Visualizar Documento de Romaneio"
                    : "Adicionar Documento de Romaneio"}
            </button>
            <button
                className="bg-gray-100 border-2 border-gray-300 hover:bg-gray-200 rounded-md p-2 w-full"
                onClick={() => {
                    if (compra.id_documento_gta) {
                        handleRedirect(compra.id_documento_gta);
                    } else {
                        setOpenDocumento(true);
                        setNomeDoc("id_documento_gta");
                    }
                }}
            >
                {compra.id_documento_gta ? "Visualizar GTA" : "Adicionar GTA"}
            </button>
            <button
                className="bg-gray-100 border-2 border-gray-300 hover:bg-gray-200 rounded-md p-2 w-full"
                onClick={() => {
                    if (compra.id_documento_nf_compra) {
                        handleRedirect(compra.id_documento_nf_compra);
                    } else {
                        setOpenDocumento(true);
                        setNomeDoc("id_documento_nf_compra");
                    }
                }}
            >
                {compra.id_documento_nf_compra
                    ? "Visualizar Nota Fiscal de Compra"
                    : "Adicionar Nota Fiscal de Compra"}
            </button>
            <button
                className="bg-gray-100 border-2 border-gray-300 hover:bg-gray-200 rounded-md p-2 w-full"
                onClick={() => {
                    if (compra.id_documento_nf_abate) {
                        handleRedirect(compra.id_documento_nf_abate);
                    } else {
                        setOpenDocumento(true);
                        setNomeDoc("id_documento_nf_abate");
                    }
                }}
            >
                {compra.id_documento_nf_abate
                    ? "Visualizar Nota Fiscal de Abate"
                    : "Adicionar Nota Fiscal de Abate"}
            </button>
            <button
                className="bg-gray-100 border-2 border-gray-300 hover:bg-gray-200 rounded-md p-2 w-full"
                onClick={() => {
                    if (compra.id_documento_nfs_matadouro) {
                        handleRedirect(compra.id_documento_nfs_matadouro);
                    } else {
                        setOpenDocumento(true);
                        setNomeDoc("id_documento_nfs_matadouro");
                    }
                }}
            >
                {compra.id_documento_nfs_matadouro
                    ? "Visualizar Nota Fiscal do Matadouro"
                    : "Adicionar Nota Fiscal do Matadouro"}
            </button>
            <button
                className="bg-gray-100 border-2 border-gray-300 hover:bg-gray-200 rounded-md p-2 w-full"
                onClick={() => {
                    if (compra.id_documento_nf_retorno) {
                        handleRedirect(compra.id_documento_nf_retorno);
                    } else {
                        setOpenDocumento(true);
                        setNomeDoc("id_documento_nf_retorno");
                    }
                }}
            >
                {compra.id_documento_nf_retorno
                    ? "Visualizar Nota Fiscal de Retorno"
                    : "Adicionar Nota Fiscal de Retorno"}
            </button>
            <ModalDocumentos
                openDocumento={openDocumento}
                setOpenDocumento={setOpenDocumento}
                setIdDoc={setIdDoc}
            />
            <div className={`${success ? '' : 'hidden'} absolute z-50 bg-zinc-800/80 h-full w-full top-0 left-0`}>
                
            </div>
        </div>
    );
}

export default DocumentWrapper;
