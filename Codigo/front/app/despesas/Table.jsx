import Link from "next/link";
import React, { useEffect, useState } from "react";
import ModalConf from "./ModalConf";

export default function Table({ despesas }) {
  const [open, setOpen] = useState(false);
  const [catDesp, setCatDesp] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/despesas-categorias`)
      .then((response) => response.json())
      .then((data) => {
        setCatDesp(data);
      })
      .catch((error) => console.error(error));
  });

  return (
    <div>
      <table className="w-full">
        <thead>
          <tr className="grid grid-cols-6">
            <th className="border-r-2 border-gray-200 p-2">ID</th>
            <th className="border-r-2 border-gray-200 p-2">Nome</th>
            <th className="border-r-2 border-gray-200 p-2">Valor</th>
            <th className="border-r-2 border-gray-200 p-2">Data</th>
            <th className="border-r-2 border-gray-200 p-2">Categoria</th>
            <th className="p-2">Editar/Apagar</th>
          </tr>
        </thead>
        <tbody className="border-t-2 border-gray-300">
          {despesas &&
            despesas.map((despesa) => {
              return (
                <tr key={despesa.id} className="grid grid-cols-6">
                  <td className="border-r-2 border-gray-200 p-2 flex items-center justify-center">
                    {despesa.id}
                  </td>
                  <td className="border-r-2 border-gray-200 p-2 flex items-center justify-center">
                    {despesa.nome}
                  </td>
                  <td className="border-r-2 border-gray-200 p-2 flex items-center justify-center">
                    {despesa.valor}
                  </td>
                  <td className="border-r-2 border-gray-200 p-2 flex items-center justify-center">
                    {despesa.data}
                  </td>
                  <td className="border-r-2 border-gray-200 p-2 flex items-center justify-center">
                    {despesa.id_categoria &&
                    catDesp.find((cat) => cat.id === despesa.id_categoria).nome
                      ? catDesp.find((cat) => cat.id === despesa.id_categoria)
                          .nome
                      : "Sem categoria"}
                  </td>
                  <td className="flex justify-evenly p-2">
                    <Link href={`despesas/${despesa.id}`}>
                      <button className="p-2 rounded-md text-white bg-blue-500 hover:bg-blue-600">
                        Editar
                      </button>
                    </Link>
                    <ModalConf
                      open={open}
                      setOpen={setOpen}
                      idDespesa={despesa.id}
                    />
                    <button
                      className="p-2 rounded-md text-white bg-red-500 hover:bg-red-600"
                      onClick={() => setOpen(!open)}
                    >
                      Apagar
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
