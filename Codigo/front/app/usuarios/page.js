"use client";

import React, { useEffect, useState } from "react";
import ModalCriarUser from "../components/ModalCriarUser";
import TableUsuarios from "../components/TableUsuarios";
import Link from "next/link";

function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/usuarios")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  return (
    <>
      <div className="p-5">
        <h1 className="text-4xl font-semibold">Consultar fornecedores</h1>
        <div className="py-4 grid grid-cols-4 mt-3 gap-4">
          <input
            onChange={(e) => setPesquisa(e.target.value)}
            className="col-span-3 bg-[#d9d9d9] rounded-md p-2 border-0"
            placeholder="Pesquise o nome do Usuário"
          />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="col-span-1 flex justify-center bg-[#06BD18] hover:bg-[#2edb3f] p-2 rounded-md
                               text-white font-semibold"
          >
            Criar novo usuário
          </button>
        </div>
      </div>

      <div className="mb-[120]">
        <TableUsuarios data={data} />
      </div>

      <Link
        href="/dashboard"
        className="flex justify-center w-[80px] p-2 bg-slate-400 rounded-md absolute bottom-5 left-[140px] text-white"
      >
        Voltar
      </Link>

      <ModalCriarUser isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}

export default Page;
