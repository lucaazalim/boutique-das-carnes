"use client";

import React, { useState } from "react";
import ModalEditarContato from "./ModalEditarContato";
import { useRouter } from "next/navigation";

function ListaContatos({ contatos, setContatos }) {
  const [open, setOpen] = useState(false);
  const [contatoEditar, setContatoEditar] = useState([]);
  const router = useRouter();

  function handleDeleteContato(id) {
    fetch(`http://localhost:3001/fornecedores/contatos/${id}`, {
      method: "DELETE",
    });
    setContatos(contatos.filter((contato) => contato.id !== id));
    alert("Contato deletado com sucesso!");
    router.push(`/fornecedores/${params.id}`);
  }

  return (
    <div className="mt-2">
      {contatos.map((contato) => {
        return (
          <>
            <div key={contato.id} className="mt-2 grid grid-cols-11 gap-2">
              <label className="bg-gray-300 p-2 rounded-md font-semibold text-lg col-span-3">
                Nome:
                <input
                  className="p-1 bg-gray-200 rounded-md w-full font-normal"
                  name="nome"
                  value={contato.nome || ""}
                  disabled
                  placeholder="Nome"
                />
              </label>
              <label className="bg-gray-300 p-2 rounded-md font-semibold text-lg col-span-3">
                Celular:
                <input
                  className="p-1 bg-gray-200 rounded-md w-full font-normal"
                  name="celular"
                  value={contato.celular || ""}
                  disabled
                  placeholder="Celular"
                />
              </label>
              <label className="bg-gray-300 p-2 rounded-md font-semibold text-lg col-span-3">
                Cargo:
                <input
                  className="p-1 bg-gray-200 rounded-md w-full font-normal"
                  name="cargo"
                  value={contato.cargo || ""}
                  disabled
                  placeholder="Cargo"
                />
              </label>
              <button
                className="col-span-1 bg-red-600 hover:bg-red-500 rounded-md font-semibold text-white"
                onClick={() => {
                  handleDeleteContato(contato.id);
                }}
              >
                Deletar
              </button>
              <button
                className="col-span-1 bg-yellow-400 hover:bg-yellow-300 rounded-md"
                onClick={() => {
                  setOpen(!open);
                  setContatoEditar(contatos[contato.id - 1]);
                }}
              >
                Editar
              </button>
            </div>
          </>
        );
      })}
      <ModalEditarContato
        open={open}
        setOpen={setOpen}
        contatoEditar={contatoEditar}
        setContatoEditar={setContatoEditar}
      />
    </div>
  );
}

export default ListaContatos;
