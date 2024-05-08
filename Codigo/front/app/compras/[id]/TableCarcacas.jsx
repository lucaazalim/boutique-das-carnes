import { useState } from "react";
import ModalConfCarcaca from "./ModalConfCarcaca";

function TableCarcacas({ carcacas }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <table className="w-full">
        <thead>
          <tr className="grid grid-cols-6">
            <th className="border-r-2 border-gray-200 p-2">ID</th>
            <th className="border-r-2 border-gray-200 p-2">Sequencial</th>
            <th className="border-r-2 border-gray-200 p-2">Letra</th>
            <th className="border-r-2 border-gray-200 p-2">Carregado</th>
            <th className="border-r-2 border-gray-200 p-2">Peso Total</th>
            <th className="p-2">Apagar</th>
          </tr>
        </thead>
        <tbody className="border-t-2 border-gray-300">
          {carcacas &&
            carcacas.map((carcaca) => (
              <tr key={carcaca.id} className="grid grid-cols-6">
                <td className="border-r-2 border-gray-200 p-2 flex items-center justify-center">
                  {carcaca.id}
                </td>
                <td className="border-r-2 border-gray-200 p-2 flex items-center justify-center">
                  {carcaca.sequencial}
                </td>
                <td className="border-r-2 border-gray-200 p-2 flex items-center justify-center">
                  {String.fromCharCode(64 + carcaca.sequencial)}
                </td>
                <td className="border-r-2 border-gray-200 p-2 flex items-center justify-center">
                  {carcaca.carregado == true ? "SIM" : "NÃO"}
                </td>
                <td className="border-r-2 border-gray-200 p-2 flex items-center justify-center">
                  {carcaca.peso_total}
                </td>
                <td className="flex justify-center">
                  <button
                    className="p-2 rounded-md text-white bg-red-500 hover:bg-red-600"
                    onClick={() => setOpen(!open)}
                  >
                    Apagar
                  </button>
                  <ModalConfCarcaca
                    open={open}
                    setOpen={setOpen}
                    idCarcaca={carcaca.id}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableCarcacas;
