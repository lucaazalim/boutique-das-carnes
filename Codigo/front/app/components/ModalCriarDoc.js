"use client";

import React, { useState } from "react";

function ModalCriarDoc({ isOpen, setIsOpen }) {
  const form = new FormData();
  const [dados, setDados] = useState({
    numero_referencia: null,
    descricao: "",
  });
  var documento = null;

  const handleSubmit = (e) => {
    e.preventDefault();
    form.append("numero_referencia", dados.numero_referencia);
    form.append("descricao", dados.descricao);
    form.append("file", documento);
    try {
      fetch("http://localhost:3001/documentos", {

        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data; boundary=???",
        },
        body: form,
      });
      setIsOpen(false);
      alert("Documento criado com sucesso!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={
        (isOpen ? "" : "hidden") +
        ` fixed inset-0 bg-zinc-800/80 backdrop-blur bg-opacity-75 flex items-center justify-center z-50`
      }
    >
      <form
        className="bg-white p-8 rounded-lg w-[calc(100vw-240px-30%)] grid grid-cols-1 gap-2"
        onSubmit={handleSubmit}
      >
        <h1 className="text-4xl font-semibold mb-2 col-span-1">
          Criar Documento
        </h1>
        <div className="bg-gray-300 p-2 rounded-md">
          <label>Numero de referência: </label>
          <input
            type="number"
            min={0}
            id="nome"
            className="w-full bg-gray-200 p-2 rounded-md"
            onChange={(e) => {
              dados.numero_referencia = e.target.value;
            }}
          />
        </div>
        <div className="bg-gray-300 p-2 rounded-md">
          <label>Descrição: </label>
          <textarea
            id="descricao"
            className="w-full h-[150px] bg-gray-200 p-2 rounded-md"
            onChange={(e) => {
              dados.descricao = e.target.value;
            }}
          />
        </div>
        <div className="bg-gray-300 p-2 rounded-md">
          <label>File input: </label>
          <input
            type="file"
            id="documento"
            className="w-full p-2"
            onChange={(e) => {
              documento = e.target.files[0];
            }}
          />
        </div>
        <div className="flex justify-between">
          <button
            className="bg-red-500 text-white p-2 rounded-md"
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(false);
            }}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-green-500 text-white p-2 rounded-md"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}

export default ModalCriarDoc;
