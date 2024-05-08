import { useState } from "react";
import ModalConfPagamento from "./ModalConfPagamento";

function TablePagamentos({ pagamentos }) {
  const [open, setOpen] = useState(false);

  function handleRedirect(idPagamento) {
    fetch(`http://localhost:3001/documentos/${idPagamento}`)
      .then((response) => response.json())
      .then((data) => {
        window.open(`http://localhost:3001/documentos/uploads/${data.nome_arquivo}`, "_blank");
      })
      .catch((error) => console.error(error));
  }

  return (
    <div>
      <table className="w-full">
        <thead>
          <tr className="grid grid-cols-5">
            <th className="border-r-2 border-gray-200 p-2">ID</th>
            <th className="border-r-2 border-gray-200 p-2">
              Meio de Pagamento
            </th>
            <th className="border-r-2 border-gray-200 p-2">Valor</th>
            <th className="border-r-2 border-gray-200 p-2">Comprovante</th>
            <th className="p-2">Apagar</th>
          </tr>
        </thead>
        <tbody className="border-t-2 border-gray-300">
          {pagamentos &&
            pagamentos.map((pagamentos) => {
              return (
                <tr key={pagamentos.id} className="grid grid-cols-5">
                  <td className="border-r-2 border-gray-200 p-2 flex items-center justify-center">
                    {pagamentos.id}
                  </td>
                  <td className="border-r-2 border-gray-200 p-2 flex items-center justify-center">
                    {pagamentos.meio_pagamento}
                  </td>
                  <td className="border-r-2 border-gray-200 p-2 flex items-center justify-center">
                    {pagamentos.valor}
                  </td>
                  <td className="border-r-2 border-gray-200 p-2 flex items-center justify-center">
                    <button
                      className="p-2 rounded-md text-white bg-zinc-400 hover:bg-zinc-300"
                      onClick={() => handleRedirect(pagamentos.id_documento_comprovante)}
                    >
                      Comprovante
                    </button>
                  </td>
                  <td className="p-2 flex justify-center">
                    <ModalConfPagamento
                      open={open}
                      setOpen={setOpen}
                      idPagamento={pagamentos.id}
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

export default TablePagamentos;
