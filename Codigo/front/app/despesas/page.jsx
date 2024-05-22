"use client";

import React from "react";
import Table from "./Table";
import BtnBack from "../components/BtnBack";
import ModalCriar from "./ModalCriar";
import Pagination from "../components/Pagination";

function Page() {
  const [search, setsearch] = React.useState("");
  const [despesas, setDespesas] = React.useState([]);
  const [openModal, setOpenModal] = React.useState(false);
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    fetch(`http://localhost:3001/despesas`)
      .then((response) => response.json())
      .then((data) => {
        setDespesas(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-4xl font-semibold">Consultar Despesas</h1>
      <div className="mt-5 grid grid-cols-9 gap-2">
        <input
          type="text"
          placeholder=""
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
          Criar Despesa
        </button>
      </div>
      <div className="mt-5 border-2 border-gray-200 rounded-md w-full">
        <Table despesas={despesas} />
      </div>
      <BtnBack />
      <ModalCriar openModal={openModal} setOpenModal={setOpenModal} />
      <Pagination page={page} setPage={setPage} />
    </div>
  );
}

export default Page;
