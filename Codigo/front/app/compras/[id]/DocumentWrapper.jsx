import React, { useEffect, useCallback } from "react";
import ModalDocumentos from "@/app/components/ModalDocumentos";
import { FaTrash } from "react-icons/fa6";

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

    const handleDelete = (nomeDoc) => {
        let obj = {};
        obj[nomeDoc] = null;

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
                window.location.reload();
            })
            .catch((error) => console.error(error));
    };

    const handleClick = useCallback(
        (idDoc) => {
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
                    window.location.reload();
                })
                .catch((error) => console.error(error));
        },
        [compra.id, nomeDoc]
    );

    useEffect(() => {
        if (idDoc) {
            handleClick(idDoc);
        }
    }, [idDoc, handleClick]);

    const handleButtonClick = (idDocumento, nomeDocumento) => {
        if (idDocumento) {
            handleRedirect(idDocumento);
        } else {
            setOpenDocumento(true);
            setNomeDoc(nomeDocumento);
        }
    };

    const documentos = [
        {
            id: compra.id_documento_romaneio,
            nome: "id_documento_romaneio",
            label: "Documento de Romaneio",
        },
        { id: compra.id_documento_gta, nome: "id_documento_gta", label: "GTA" },
        {
            id: compra.id_documento_nf_compra,
            nome: "id_documento_nf_compra",
            label: "Nota Fiscal de Compra",
        },
        {
            id: compra.id_documento_nf_abate,
            nome: "id_documento_nf_abate",
            label: "Nota Fiscal de Abate",
        },
        {
            id: compra.id_documento_nfs_matadouro,
            nome: "id_documento_nfs_matadouro",
            label: "Nota Fiscal do Matadouro",
        },
        {
            id: compra.id_documento_nf_retorno,
            nome: "id_documento_nf_retorno",
            label: "Nota Fiscal de Retorno",
        },
    ];

    return (
        <div className="my-3 grid gap-2 grid-cols-12">
            {documentos.map((doc) => (
                <>
                    <button
                        key={doc.id}
                        className={`${doc.id ? "bg-blue-100 border-2 border-blue-300 hover:bg-blue-200" : "bg-gray-100 border-2 border-gray-300 hover:bg-gray-200"} rounded-md p-2 w-full col-span-11`}
                        onClick={() => handleButtonClick(doc.id, doc.nome)}
                    >
                        {doc.id
                            ? `Visualizar ${doc.label}`
                            : `Adicionar ${doc.label}`}
                    </button>
                    <button
                        key={doc.nome}
                        className="bg-red-500 hover:bg-red-600 rounded-md p-2 w-full col-span-1 text-white flex justify-center items-center"
                        onClick={() => handleDelete(doc.nome)}
                    >
                        <FaTrash />
                    </button>
                </>
            ))}
            <ModalDocumentos
                openDocumento={openDocumento}
                setOpenDocumento={setOpenDocumento}
                setIdDoc={setIdDoc}
            />
            {/* <div
                className={`${
                    success ? "" : "hidden"
                } absolute z-50 bg-zinc-800/80 h-full w-full top-0 left-0`}
            >
                <div className="flex items-center justify-center h-full">
                    <div className="bg-white p-5 rounded-md">
                        <p className=" animate-none text-lg">
                            Documento adicionado com sucesso!
                        </p>
                    </div>
                </div>
            </div> */}
        </div>
    );
}

export default DocumentWrapper;
