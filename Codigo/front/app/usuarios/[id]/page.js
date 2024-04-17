"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

function Page({ params }) {
  const [usuario, setUsuario] = useState({});

  useEffect(() => {
    fetch(`http://localhost:3001/usuarios/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setUsuario(data);
      });
  });

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="p-5 mb-[70px]">
        <h1 className="text-4xl font-semibold">Editar usuário</h1>
        <form>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <div className="p-2 bg-gray-200 rounded-md align-middle">
              <label className="text-align-center font-semibold text-lg">
                Nome
              </label>
              <input
                type="text"
                className="text-lg bg-gray-200 rounded-md w-full"
                name="nome"
                id="nome"
                value={usuario.nome}
                onChange={handleChange}
              />
            </div>
            <div className="p-2 bg-gray-200 rounded-md align-middle">
              <label className="text-align-center font-semibold text-lg">
                Email
              </label>
              <input
                type="email"
                className="text-lg bg-gray-200 rounded-md w-full"
                name="email"
                id="email"
                value={usuario.email}
                onChange={handleChange}
              />
            </div>
            <div className="p-2 bg-gray-200 rounded-md align-middle">
              <label className="text-align-center font-semibold text-lg">
                Senha
              </label>
              <input
                type="password"
                className="text-lg bg-gray-200 rounded-md w-full"
                name="senha"
                id="senha"
                value={usuario.senha}
                onChange={handleChange}
              />
            </div>
            <div className="p-2 bg-gray-200 rounded-md align-middle">
              <label className="text-align-center font-semibold text-lg">
                Confirmar senha
              </label>
              <input
                className="text-lg bg-gray-200 rounded-md w-full"
                type="password"
                name="confirmarSenha"
                id="confirmarSenha"
                value={usuario.confirmarSenha}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="col-span-2 flex justify-center">
              <p className="bg-green-500 p-2 rounded-md text-white font-semibold">Salvar</p>
            </button>
          </div>
        </form>
      </div>
      <div className="absolute bottom-0 w-[calc(100vw-240px)] left-[120px] bg-white p-2">
        <Link
          href="/usuarios"
          className="flex justify-center w-[80px] p-2 bg-slate-400 rounded-md text-white"
        >
          Voltar
        </Link>
      </div>
    </>
  );
}

export default Page;
