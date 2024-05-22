import { useState } from "react";
import ModalConfContato from "./ModalConfContato";
import ModalEditContato from "./ModalEditContato";

function TableContatos({ contatos }) {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  return (
    <div>
      <table className="w-full">
        <thead>
          <tr className="grid grid-cols-5">
            <th className="border-r-2 border-gray-200 p-2">ID</th>
            <th className="border-r-2 border-gray-200 p-2">Nome</th>
            <th className="border-r-2 border-gray-200 p-2">Celular</th>
            <th className="border-r-2 border-gray-200 p-2">Cargo</th>
            <th className="p-2">Apagar</th>
          </tr>
        </thead>
        <tbody className="border-t-2 border-gray-300">
          {contatos &&
            contatos.map((contato) => {
              return (
                <tr key={contato.id} className="grid grid-cols-5">
                  <td className="border-r-2 border-gray-200 p-2 flex items-center justify-center">
                    {contato.id}
                  </td>
                  <td className="border-r-2 border-gray-200 p-2 flex items-center justify-center">
                    {contato.nome}
                  </td>
                  <td className="border-r-2 border-gray-200 p-2 flex items-center justify-center">
                    {contato.celular}
                  </td>
                  <td className="border-r-2 border-gray-200 p-2 flex items-center justify-center">
                    {contato.cargo}
                  </td>
                  <td className="flex justify-around mx-4">
                    <button
                      className="p-2 rounded-md text-white bg-yellow-400 hover:bg-yellow-500"
                      onClick={() => setOpenEdit(!openEdit)}
                    >
                      Editar
                    </button>
                    <ModalEditContato
                      contato={contato}
                      setEditContato={setOpenEdit}
                      editContato={openEdit}
                    />
                    <ModalConfContato
                      open={open}
                      setOpen={setOpen}
                      idContato={contato.id}
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

export default TableContatos;
