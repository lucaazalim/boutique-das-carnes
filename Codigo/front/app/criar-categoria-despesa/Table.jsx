import Link from "next/link";
import React, { useState } from "react";
import ModalConf from "./ModalConf";

export default function Table({ catDespesas }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <table className="w-full">
        <thead>
          <tr className="grid grid-cols-4">
            <th className="border-r-2 border-gray-200 p-2">Nome</th>
            <th className="border-r-2 border-gray-200 p-2">Descrição</th>
            <th className="border-r-2 border-gray-200 p-2">Cor</th>
            <th className="p-2">Editar/Apagar</th>
          </tr>
        </thead>
        <tbody className="border-t-2 border-gray-300">
          {catDespesas &&
            catDespesas.map((catDesp) => {
              return (
                <tr key={catDesp.id} className="grid grid-cols-4">
                  <td className="border-r-2 border-gray-200 p-2 flex items-center justify-center">
                    {catDesp.nome}
                  </td>
                  <td className="border-r-2 border-gray-200 p-2 flex items-center justify-center">
                    {catDesp.descricao}
                  </td>
                  <td className={`text-[#${catDesp.cor}] border-r-2 border-gray-200 p-2 flex items-center justify-center`}>
                    {catDesp.cor}
                  </td>
                  <td className="flex justify-evenly p-2">
                    <Link href={`criar-categoria-despesa/${catDesp.id}`}>
                      <button className="p-2 rounded-md text-white bg-blue-500 hover:bg-blue-600">
                        Editar
                      </button>
                    </Link>
                    <ModalConf
                      open={open}
                      setOpen={setOpen}
                      idCatDesp={catDesp.id}
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
