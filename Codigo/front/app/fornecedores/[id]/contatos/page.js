"use client"

import { useEffect, useState } from "react";

export default function Page({ params }) {
    const [contatos, setContatos] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3001/fornecedores/contatos/${params.id}`)
            .then(res => res.json())
            .then(data => {
                setContatos(data);
                console.log(data);
            })
            .catch(e => console.error('Erro ao solicitar os dados: ' + e))
    }, [])

    return (
        <>
            {contatos && contatos.map((contato => {
                return (
                    <div key={contato.id}>
                        <p>{contato.nome}</p>
                        <p>{contato.email}</p>
                        <p>{contato.telefone}</p>
                    </div>
                )
            }))}
        </>
    );
}
