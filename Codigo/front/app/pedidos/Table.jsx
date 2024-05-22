import Link from "next/link";
import React, { useEffect, useState } from "react";
import ModalConf from "./ModalConf";

const Table = ({ pedidos }) => {
  const [open, setOpen] = useState(false);
  const [clientes, setClientes] = useState([]);
  const [itens, setItens] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/clientes")
      .then((response) => response.json())
      .then((data) => setClientes(data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    console.log(itens);
  }, [itens]);

  return (
    <div>
      <table className="w-full">
        <thead>
          <tr className="grid grid-cols-5">
            <th className="border-r-2 border-gray-200 p-2">ID</th>
            <th className="border-r-2 border-gray-200 p-2">Data</th>
            <th className="border-r-2 border-gray-200 p-2">Cliente</th>
            <th className="border-r-2 border-gray-200 p-2">Valor total</th>
            <th className="p-2">Editar/Apagar</th>
          </tr>
        </thead>
        <tbody className="border-t-2 border-gray-300">
          {pedidos &&
            pedidos.map((pedido) => {
              return (
                <tr key={pedido.id} className="grid grid-cols-5">
                  <td className="border-r-2 border-gray-200 p-2 flex items-center justify-center">
                    {pedido.id}
                  </td>
                  <td className="border-r-2 border-gray-200 p-2 flex items-center justify-center">
                    {pedido.data}
                  </td>
                  <td className="border-r-2 border-gray-200 p-2 flex items-center justify-center">
                    {clientes &&
                      (clientes.find(
                        (cliente) => cliente.id == pedido.id_cliente
                      ).pessoa.nome ||
                        clientes.find(
                          (cliente) => cliente.id == pedido.id_cliente
                        ).pessoa.razao_social)}
                  </td>
                  <td className="border-r-2 border-gray-200 p-2 flex items-center justify-center">
                    {""}
                  </td>
                  <td className="flex justify-evenly p-2">
                    <Link href={`pedidos/${pedido.id}`}>
                      <button className="p-2 rounded-md text-white bg-blue-500 hover:bg-blue-600">
                        Editar
                      </button>
                    </Link>
                    <ModalConf
                      open={open}
                      setOpen={setOpen}
                      idPedido={pedido.id}
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
};

export default Table;
