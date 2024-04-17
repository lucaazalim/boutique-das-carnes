"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ModalCriarFornecedor from "../components/ModalCriarFornecedor";
import TableFornecedores from "../components/TableFornecedores";
import Paginacao from "../components/Paginacao";

export default function Home() {
  const [pesquisa, setPesquisa] = useState(null);
  const [fornecedores, setFornecedores] = useState([]);
  const [page, setPage] = useState(1);
  const [openCriar, setOpenCriar] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch(
      `http://localhost:3001/fornecedores${
        page ? `?page=${page}&page_size=15` : ""
      }${pesquisa ? `&search=${encodeURI(pesquisa)}` : ""}`
    )
      .then((res) => res.json())
      .then((data) => setFornecedores(data))
      .catch((e) => console.error("Erro ao solicitar os dados: " + e));
  }, [page, pesquisa]);

  return (
    <>
      <div className="p-5">
        <h1 className="text-4xl font-semibold">Consultar fornecedores</h1>
        <div className="py-4 grid grid-cols-4 mt-3 gap-4">
          <input
            onChange={(e) => setPesquisa(e.target.value)}
            className="col-span-3 bg-[#d9d9d9] rounded-md p-2 border-0"
            placeholder="Pesquise o nome do fornecedor"
          />
          <button
            onClick={() => setOpenCriar(!openCriar)}
            className="col-span-1 flex justify-center bg-[#06BD18] hover:bg-[#2edb3f] p-2 rounded-md
                               text-white font-semibold"
          >
            Criar novo fornecedor
          </button>
        </div>

        <TableFornecedores fornecedores={fornecedores} />
      </div>

      <ModalCriarFornecedor isOpen={openCriar} setIsOpen={setOpenCriar} />

      <Paginacao page={page} setPage={setPage} />

      <Link
        href="/dashboard"
        className="flex justify-center w-[80px] p-2 bg-slate-400 rounded-md absolute bottom-5 left-[140px] text-white"
      >
        Voltar
      </Link>
    </>
  );
}
