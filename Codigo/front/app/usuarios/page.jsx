"use client";

import React, { useEffect, useState } from "react";
import BtnBack from "../components/BtnBack";
import Pagination from "../components/Pagination";
import Table from "./Table";
import ModalCriar from "./ModalCriar";

function Page() {
  const [search, setsearch] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [page, setPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3001/usuarios`)
      .then((response) => response.json())
      .then((data) => {
        setUsuarios(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-4xl font-semibold">Consultar Usuários</h1>
      <div className="mt-5 grid grid-cols-9 gap-2">
        <input
          type="text"
          placeholder="Digite o ID do usuário"
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
          Criar Usuário
        </button>
      </div>

      <div className="mt-5 border-2 border-gray-200 rounded-md">
        <Table usuarios={usuarios} />
      </div>
      <BtnBack />
      <Pagination page={page} setPage={setPage} />
      <ModalCriar openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  );
}

export default Page;
