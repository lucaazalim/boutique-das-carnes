import React from "react";

function TableResumo({ resumo }) {
  return (
    <table className="w-full">
      <thead>
        <tr className="grid grid-cols-2">
          <th className="p-2 border-r-2 border-gray-300">Tipo</th>
          <th className="p-2">Quantidade</th>
        </tr>
      </thead>
      <tbody className="border-t-2 border-gray-300">
        {resumo && resumo.map(item => (
          <tr key={item.tipo} className="grid grid-cols-2">
            <td className="p-2 border-r-2 border-gray-300 flex items-center justify-center">{item.tipo}</td>
            <td className="p-2 flex items-center justify-center">{item.quantidade}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableResumo;
