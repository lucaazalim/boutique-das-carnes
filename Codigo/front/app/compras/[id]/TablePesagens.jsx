import { useState } from "react";
import ModalConfPesagem from "./ModalConfPesagem";

function TablePesagens({ pesagens }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <table className="w-full">
        <thead>
          <tr className="grid grid-cols-4">
            <th className="border-r-2 border-gray-200 p-2">ID</th>
            <th className="border-r-2 border-gray-200 p-2">Unidades</th>
            <th className="border-r-2 border-gray-200 p-2">Peso</th>
            <th className="p-2">Apagar</th>
          </tr>
        </thead>
        <tbody className="border-t-2 border-gray-300">
          {pesagens &&
            pesagens.map((pesagem) => {
              return (
                <tr key={pesagem.id} className="grid grid-cols-4">
                  <td className="border-r-2 border-gray-200 p-2 flex items-center justify-center">
                    {pesagem.id}
                  </td>
                  <td className="border-r-2 border-gray-200 p-2 flex items-center justify-center">
                    {pesagem.unidades}
                  </td>
                  <td className="border-r-2 border-gray-200 p-2 flex items-center justify-center">
                    {pesagem.peso}
                  </td>
                  <td className="flex justify-center">
                    <button
                      className="p-2 rounded-md text-white bg-red-500 hover:bg-red-600"
                      onClick={() => setOpen(!open)}
                    >
                      Apagar
                    </button>
                    <ModalConfPesagem
                      open={open}
                      setOpen={setOpen}
                      idPesagem={pesagem.id}
                    />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default TablePesagens;
