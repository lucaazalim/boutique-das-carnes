import Link from "next/link";
import React, { useState } from "react";
import ModalConf from "./ModalConf";

export default function Table({ usuarios }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <table className="w-full">
        <thead>
          <tr className="grid grid-cols-5">
            <th className="border-r-2 border-gray-200 p-2">ID</th>
            <th className="border-r-2 border-gray-200 p-2">Usuario</th>
            <th className="border-r-2 border-gray-200 p-2">Nome</th>
            <th className="border-r-2 border-gray-200 p-2">Cargo</th>
            <th className="p-2">Editar/Apagar</th>
          </tr>
        </thead>
        <tbody className="border-t-2 border-gray-300">
          {usuarios &&
            usuarios.map((usuario) => {
              return (
                <tr key={usuario.id} className="grid grid-cols-5">
                  <td className="border-r-2 border-gray-200 p-2 flex items-center justify-center">
                    {usuario.id}
                  </td>
                  <td className="border-r-2 border-gray-200 p-2 flex items-center justify-center">
                    {usuario.usuario}
                  </td>
                  <td className="border-r-2 border-gray-200 p-2 flex items-center justify-center">
                    {usuario.nome}
                  </td>
                  <td className="border-r-2 border-gray-200 p-2 flex items-center justify-center">
                    {usuario.cargo}
                  </td>
                  <td className="flex justify-evenly p-2">
                    <Link href={`usuarios/${usuario.id}`}>
                      <button className="p-2 rounded-md text-white bg-blue-500 hover:bg-blue-600">
                        Editar
                      </button>
                    </Link>
                    <ModalConf
                      open={open}
                      setOpen={setOpen}
                      idUsuario={usuario.id}
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
