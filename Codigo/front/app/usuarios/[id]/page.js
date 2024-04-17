"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function Page({ params }) {
  const [usuario, setUsuario] = useState({});
  const router = useRouter();

  useEffect(() => {
    fetch(`http://localhost:3001/usuarios/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setUsuario(data);
      });
  }, [params.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (usuario.senha === usuario.confirmarSenha) {
      try {
        const res = await fetch(`http://localhost:3001/usuarios/${params.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(usuario),
        });
        alert("Usuário alterado com sucesso!");
      } catch (error) {
        console.error("Erro ao editar fornecedor");
      }
    } else {
      alert("As senhas não conferem");
    }
  };

  return (
    <>
      <div className="p-5 mb-[70px]">
        <h1 className="text-4xl font-semibold">Editar usuário</h1>
        <form onSubmit={handleSubmit}>
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
                onChange={handleChange}
                value={usuario.email}
              />
            </div>
            <div className="p-2 bg-gray-200 rounded-md align-middle">
              <label className="text-align-center font-semibold text-lg">
                Usuário
              </label>
              <input
                type="text"
                className="text-lg bg-gray-200 rounded-md w-full"
                name="usuario"
                id="usuario"
                value={usuario.usuario}
                onChange={handleChange}
              />
            </div>
            <div className="p-2 bg-gray-200 rounded-md align-middle">
              <label className="text-align-center font-semibold text-lg">
                Cargo
              </label>
              <input
                type="text"
                className="text-lg bg-gray-200 rounded-md w-full"
                name="cargo"
                id="cargo"
                value={usuario.cargo}
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
            <div className="col-span-2 flex justify-center">
              <button
                className="bg-green-500 p-2 rounded-md text-white font-semibold"
                type="submit"
              >
                Salvar
              </button>
            </div>
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
