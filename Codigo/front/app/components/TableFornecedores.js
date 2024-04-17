import Link from "next/link";
import React from "react";

function TableFornecedores({ fornecedores }) {
  return (
    <>
      <table className="w-full">
        <thead className="border-b-2 border-b-gray-300">
          <tr className="grid grid-cols-8">
            <th className="p-2 col-span-1">ID</th>
            <th className="p-2 col-span-2">Tipo</th>
            <th className="p-2 col-span-2">CPF ou CNPJ</th>
            <th className="p-2 col-span-2">Razão Social ou Nome</th>
            <th className="p-2 col-span-1">Editar</th>
          </tr>
        </thead>
        <tbody>
          {fornecedores &&
            fornecedores.length > 0 &&
            fornecedores.map((fornecedor) => (
              <tr
                key={fornecedor.id}
                className="grid grid-cols-8 border-0 border-b "
              >
                <td className="p-2 col-span-1 flex justify-center">
                  {fornecedor.id}
                </td>
                <td className="p-2 col-span-2 border-l flex justify-center">
                  {fornecedor.tipo}
                </td>
                <td className="p-2 col-span-2 border-l flex justify-center">
                  {fornecedor.pessoa.cnpj || fornecedor.pessoa.cpf}
                </td>
                <td className="p-2 col-span-2 border-l border-r flex justify-center">
                  {fornecedor.pessoa.nome || fornecedor.pessoa.nome_fantasia}
                </td>
                <td className="col-span-1 flex justify-center">
                  <Link href={`fornecedores/${fornecedor.id}`} legacyBehavior>
                    <a className="text-center p-2 col-span-1 bg-yellow-400 w-[80%] rounded-lg">
                      Editar
                    </a>
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

export default TableFornecedores;
