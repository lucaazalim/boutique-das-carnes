"use client";

import { useEffect, useState } from "react";
import Table from "./Table";
import BtnBack from "@/app/components/BtnBack";
import Pagination from "../components/Pagination";
import ModalCriar from "./ModalCriar";

function Page() {
  const [fornecedores, setFornecedores] = useState([]);
  const [search, setsearch] = useState("");
  const [page, setPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetch(
      `http://localhost:3001/fornecedores${
        search ? `?search=${encodeURI(search)}` : ""
      }${page ? `?page=${page}&page_size=15` : ""}`
    )
      .then((response) => response.json())
      .then((data) => setFornecedores(data))
      .catch((error) => console.error(error));
  }, [search, page]);

  return (
    <div className="p-5">
      <h1 className="text-4xl font-semibold">Consultar Fornecedores</h1>
      <div className="mt-5 grid grid-cols-9 gap-2">
        <input
          type="text"
          placeholder="Digite o nome do fornecedor ou CPF/CNPJ"
          className="p-2 border-2 border-gray-200 rounded-md col-span-7"
          value={search}
          onChange={(e) => setsearch(e.target.value)}
        />
        <button
          onClick={() => {
            setOpenModal(true);
          }}
          className="bg-green-500 text-white p-2 rounded-md col-span-2"
        >
          Criar Fornecedor
        </button>
      </div>

      <div className="mt-5 border-2 border-gray-200 rounded-md">
        <Table fornecedores={fornecedores} />
      </div>
      <BtnBack />
      <Pagination page={page} setPage={setPage} />
      <ModalCriar openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  );
}

export default Page;
