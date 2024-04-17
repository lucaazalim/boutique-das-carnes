import Link from "next/link";
import React from "react";

function TableUsuarios({ data }) {
  return (
    <>
      <table className="w-full">
        <thead className="border-b-2 border-b-gray-300">
          <tr className="grid grid-cols-8">
            <th className="p-2 col-span-1">ID</th>
            <th className="p-2 col-span-2">Usuário</th>
            <th className="p-2 col-span-2">Nome</th>
            <th className="p-2 col-span-2">Cargo</th>
            <th className="p-2 col-span-1">Editar</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((usuario) => {
              return (
                <tr
                  key={usuario.id}
                  className="grid grid-cols-8 border-0 border-b "
                >
                  <td className="p-2 col-span-1 flex justify-center">
                    {usuario.id}
                  </td>
                  <td className="p-2 col-span-2 border-l flex justify-center">
                    {usuario.usuario}
                  </td>
                  <td className="p-2 col-span-2 border-l flex justify-center">
                    {usuario.nome}
                  </td>
                  <td className="p-2 col-span-2 border-l border-r flex justify-center">
                    {usuario.cargo}
                  </td>
                  <td className="col-span-1 flex justify-center">
                    <Link href={`usuarios/${usuario.id}`} legacyBehavior>
                      <a className="text-center p-2 col-span-1 bg-yellow-400 w-[80%] rounded-lg">
                        Editar
                      </a>
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
}

export default TableUsuarios;
