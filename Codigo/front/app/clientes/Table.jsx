import Link from "next/link";
import React, { useState } from "react";
import ModalConf from "./ModalConf";

function Table({ clientes }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <table className="w-full">
        <thead>
          <tr className="grid grid-cols-5">
            <th className="border-r-2 border-gray-200 p-2">ID</th>
            <th className="border-r-2 border-gray-200 p-2">Tipo</th>
            <th className="border-r-2 border-gray-200 p-2">
              Nome/Razão Social
            </th>
            <th className="border-r-2 border-gray-200 p-2">CPF/CNPJ</th>
            <th className="p-2">Editar/Apagar</th>
          </tr>
        </thead>
        <tbody className="border-t-2 border-gray-300">
          {clientes &&
            clientes.map((cliente) => {
              return (
                <tr key={cliente.id} className="grid grid-cols-5">
                  <td className="border-r-2 border-gray-200 p-2 flex items-center justify-center">
                    {cliente.id}
                  </td>
                  <td className="border-r-2 border-gray-200 p-2 flex items-center justify-center">
                    {cliente.tipo}
                  </td>
                  <td className="border-r-2 border-gray-200 p-2 flex items-center justify-center">
                    {cliente.pessoa.nome || cliente.pessoa.razao_social}
                  </td>
                  <td className="border-r-2 border-gray-200 p-2 flex items-center justify-center">
                    {cliente.pessoa.cpf || cliente.pessoa.cnpj}
                  </td>
                  <td className="flex justify-evenly p-2">
                    <Link href={`clientes/${cliente.id}`}>
                      <button className="p-2 rounded-md text-white bg-blue-500 hover:bg-blue-600">
                        Editar
                      </button>
                    </Link>
                    <ModalConf
                      open={open}
                      setOpen={setOpen}
                      idCliente={cliente.id}
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

export default Table;
