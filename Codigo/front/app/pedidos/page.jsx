"use client";

import React, { useEffect, useState } from "react";
import BtnBack from "../components/BtnBack";
import Pagination from "../components/Pagination";
import ModalCriar from "./ModalCriar";
import Table from "./Table";

function Page() {
  const [openModal, setOpenModal] = useState(false);
  const [pedidos, setPedidos] = useState([]);
  const [search, setsearch] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3001/pedidos`)
      .then((response) => response.json())
      .then((data) => setPedidos(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-4xl font-semibold">Pedidos</h1>
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
          Criar Pedido
        </button>
      </div>

      <div className="mt-5 border-2 border-gray-200 rounded-md">
        <Table pedidos={pedidos} />
      </div>
      <ModalCriar open={openModal} setOpen={setOpenModal} />
      <Pagination />
      <BtnBack />
    </div>
  );
}

export default Page;
