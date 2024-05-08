import Link from "next/link";
import React, { useEffect, useState } from "react";
import ModalConf from "./ModalConf";

export default function Table({ compras }) {
  const [open, setOpen] = useState(false);
  const [fornecedores, setFornecedores] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/fornecedores`)
      .then((response) => response.json())
      .then((data) => {
        setFornecedores(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <table className="w-full">
        <thead>
          <tr className="grid grid-cols-5">
            <th className="border-r-2 border-gray-200 p-2">ID</th>
            <th className="border-r-2 border-gray-200 p-2">Fornecedor</th>
            <th className="border-r-2 border-gray-200 p-2">
              Numero de Animais
            </th>
            <th className="border-r-2 border-gray-200 p-2">Preço Total</th>
            <th className="p-2">Editar/Apagar</th>
          </tr>
        </thead>
        <tbody className="border-t-2 border-gray-300">
          {compras &&
            fornecedores &&
            compras.map((compra) => {
              let fornecedor = fornecedores.find(
                (fornecedor) => fornecedor.id === compra.id_fornecedor
              );
              return (
                <tr key={compra.id} className="grid grid-cols-5">
                  <td className="border-r-2 border-gray-200 p-2 flex items-center justify-center">
                    {compra.id}
                  </td>
                  <td className="border-r-2 border-gray-200 p-2 flex items-center justify-center">
                    {fornecedor && (fornecedor.pessoa.nome || fornecedor.pessoa.razao_social)}
                  </td>
                  <td className="border-r-2 border-gray-200 p-2 flex items-center justify-center">
                    {compra.unidades_macho + compra.unidades_femea}
                  </td>
                  <td className="border-r-2 border-gray-200 p-2 flex items-center justify-center">
                    {(compra.preco_arroba * compra.peso_total_abate) -
                      (compra.desconto === null ? (0) : (compra.desconto))}
                  </td>
                  <td className="flex justify-evenly p-2">
                    <Link href={`compras/${compra.id}`}>
                      <button className="p-2 rounded-md text-white bg-blue-500 hover:bg-blue-600">
                        Editar
                      </button>
                    </Link>
                    <ModalConf
                      open={open}
                      setOpen={setOpen}
                      idCompra={compra.id}
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
