import Link from "next/link";

export default function Table({ headers, data }) {
  return (
    <>
      <table className="w-full">
        <thead className="border-b-2 border-b-gray-300">
          <tr className="grid grid-cols-8">
            <th className="p-2 col-span-1">{headers[0]}</th>
            <th className="p-2 col-span-2">{headers[1]}</th>
            <th className="p-2 col-span-2">{headers[2]}</th>
            <th className="p-2 col-span-2">{headers[3]}</th>
            <th className="p-2 col-span-1">{headers[4]}</th>
          </tr>
        </thead>
        <tbody>
          {data.fornecedores &&
            data.fornecedores.length > 0 &&
            data.fornecedores.map((fornecedor) => (
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
          {data.compras &&
            data.compras.length > 0 &&
            data.compras.map((compra) => (
              <tr
                key={compra.id}
                className="grid grid-cols-8 border-0 border-b "
              >
                <td className="p-2 col-span-1 flex justify-center">
                  {compra.id}
                </td>
                <td className="p-2 col-span-2 border-l flex justify-center">
                  {compra.id_fornecedor}
                </td>
                <td className="p-2 col-span-2 border-l flex justify-center">
                  {compra.animais_abatidos}
                </td>
                <td className="p-2 col-span-2 border-l border-r flex justify-center">
                  {(compra.peso_total_abate * compra.preco_arroba)}
                </td>
                <td className="col-span-1 flex justify-center">
                  <Link href={`compras/${compra.id}`} legacyBehavior>
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
