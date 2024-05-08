"use client";

import React, { useEffect, useState } from "react";
import TableResumo from "./TableResumo";
import TableEstoque from "./TableEstoque";
import BtnBack from "../components/BtnBack";

function Page() {
  const [estoque, setEstoque] = useState([]);
  const [resumoEstoque, setResumoEstoque] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/estoque`)
      .then((response) => response.json())
      .then((data) => {
        setEstoque(data);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3001/estoque/summary`)
      .then((response) => response.json())
      .then((data) => {
        setResumoEstoque(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="p-5 overflow-auto">
      <h1 className="text-4xl font-semibold">Resumo do Estoque</h1>
      <div className="mt-5 border-2 border-gray-300 rounded-md">
        <TableResumo resumo={resumoEstoque} />
      </div>
      <h1 className="text-4xl font-semibold mt-5">Consultar Itens em Estoque</h1>
      <div className="mt-5 border-2 border-gray-300 rounded-md overflow-auto h-[330px]">
        <TableEstoque estoque={estoque} />
      </div>
      <BtnBack />
    </div>
  );
}

export default Page;
