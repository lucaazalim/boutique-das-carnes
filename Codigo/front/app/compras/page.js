"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Table from "../components/Table";
import ModalCriarCompra from "../components/ModalCriarCompra";

export default function Home() {
  const [compras, setCompras] = useState([]);
  const [open, setOpen] = useState(false);
  const [pesquisa, setPesquisa] = useState("");
  const router = useRouter();

  const headers = [
    "ID",
    "Fornecedor",
    "Número de animais",
    "Preço total",
    "Editar",
  ];

  useEffect(() => {
    fetch(`http://localhost:3001/compras`)
      .then((res) => res.json())
      .then((data) => {
        setCompras(data);
      })
      .catch((e) => console.error("Erro ao solicitar os dados: " + e));
  }, []);

  return (
    <>
      <div className="p-5">
        <h1 className="text-4xl font-semibold">Consultar compras</h1>
        <div className="py-4 grid grid-cols-4 mt-3 gap-4">
          <input
            onChange={(e) => setPesquisa(e.target.value)}
            className="col-span-3 bg-[#d9d9d9] rounded-md p-2 border-0"
            placeholder="ID da compra"
          />
          <button
            onClick={() => setOpen(!open)}
            className="col-span-1 flex justify-center bg-[#06BD18] hover:bg-[#2edb3f] p-2 rounded-md
                               text-white font-semibold"
          >
            Criar nova compra
          </button>
        </div>
        <Table headers={headers} data={{ compras }} />
      </div>

      <ModalCriarCompra open={open} setOpen={setOpen} />

      <Link
        href="/dashboard"
        className="flex justify-center w-[80px] p-2 bg-slate-400 rounded-md absolute bottom-5 left-[140px] text-white"
      >
        Voltar
      </Link>
    </>
  );
}
