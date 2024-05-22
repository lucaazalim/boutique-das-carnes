import Link from "next/link";
import React from "react";

function TableResumo({ estoque }) {
  return (
    <table className="w-full">
      <thead>
        <tr className="grid grid-cols-3">
          {/* <th className="p-2 border-r-2 border-gray-300">ID</th>
          <th className="p-2 border-r-2 border-gray-300">ID da Compra</th> */}
          <th className="p-2 border-r-2 border-gray-300">Letra</th>
          <th className="p-2 border-r-2 border-gray-300">Tipo</th>
          <th className="p-2">Link para compra</th>
        </tr>
      </thead>
      <tbody className="border-t-2 border-gray-300">
        {estoque &&
          estoque.map((item) => (
            <tr key={item.id} className="grid grid-cols-3">
              <td className="p-2 border-r-2 border-gray-300 flex items-center justify-center">
                {item.id_compra_carcaca}
              </td>
              <td className="p-2 border-r-2 border-gray-300 flex items-center justify-center">
                {item.tipo}
              </td>
              <td className="p-2 flex items-center justify-center">
                <Link
                  className="text-blue-500"
                  href={`/compras/${item.id_compra_carcaca}`}
                >
                  Link
                </Link>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default TableResumo;
