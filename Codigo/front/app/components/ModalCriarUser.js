"use client";

import React, { useState } from "react";

function ModalCriarUser({ isOpen, setIsOpen }) {
  const [user, setUser] = useState({
    usuario: "",
    nome: "",
    email: "",
    cargo: "",
    senha: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify.formData);
    try {
      const res = await fetch("http://localhost:3001/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
        redirect: "follow",
      });
      alert("Usuario criado com sucesso!");
      setIsOpen(!isOpen);
    } catch (error) {
      console.error("Erro ao inserir dado no banco");
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
        className="bg-white p-8 rounded-lg w-[calc(100vw-35%)] grid grid-cols-2 gap-2"
        onSubmit={handleSubmit}
      >
        <h1 className="text-4xl font-semibold mb-2 col-span-2">
          Criar Usuário
        </h1>
        <div className="bg-gray-300 p-2 rounded-md col-span-1">
          <label>Usuário: </label>
          <input
            type="text"
            id="usuario"
            name="usuario"
            placeholder="Usuário"
            className="w-full bg-gray-200 p-2 rounded-md col-span-1"
            onChange={handleChange}
          />
        </div>
        <div className="bg-gray-300 p-2 rounded-md">
          <label>Nome: </label>
          <input
            type="text"
            id="nome"
            name="nome"
            placeholder="Nome"
            className="w-full bg-gray-200 p-2 rounded-md col-span-1"
            onChange={handleChange}
          />
        </div>
        <div className="bg-gray-300 p-2 rounded-md">
          <label>Email: </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            className="w-full bg-gray-200 p-2 rounded-md col-span-1"
            onChange={handleChange}
          />
        </div>
        <div className="bg-gray-300 p-2 rounded-md">
          <label>Cargo: </label>
          <select className="w-full h-[40px] rounded-md bg-gray-200" name="cargo" onChange={handleChange}>
            <option value="ADMINISTRADOR">Administrador</option>
            <option value="GERENTE">Gerente</option>
          </select>
        </div>
        <div className="bg-gray-300 p-2 rounded-md">
          <label>Senha: </label>
          <input
            type="password"
            id="senha"
            name="senha"
            placeholder="Senha"
            className="w-full bg-gray-200 p-2 rounded-md col-span-1"
            onChange={handleChange}
          />
        </div>
        <div className="col-span-2 flex justify-between">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(false);
            }}
            className="bg-red-500 text-white p-2 rounded-md"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-green-500 text-white p-2 rounded-md"
          >
            Criar
          </button>
        </div>
      </form>
    </div>
  );
}

export default ModalCriarUser;
