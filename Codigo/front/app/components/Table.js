import Link from "next/link";

export default function Table({ headers, data }) {
    return (
        <>
            <table className='w-full'>
                <thead className='border-b-2 border-b-gray-300'>
                    <tr className='grid grid-cols-8'>
                        <th key={headers[0]} className="p-2 col-span-1">{headers[0]}</th>
                        <th key={headers[0]} className="p-2 col-span-2">{headers[1]}</th>
                        <th key={headers[0]} className="p-2 col-span-2">{headers[2]}</th>
                        <th key={headers[0]} className="p-2 col-span-2">{headers[3]}</th>
                        <th key={headers[0]} className="p-2 col-span-1">{headers[4]}</th>
                    </tr>
                </thead>
                <tbody>
                    {data.fornecedores.map(fornecedor => {
                        return (
                            <tr key={fornecedor.id} className='grid grid-cols-8 border-0 border-b '>
                                <td className='p-2 col-span-1 flex justify-center'>{fornecedor.id}</td>
                                <td className='p-2 col-span-2 border-l flex justify-center'>{fornecedor.tipo}</td>
                                <td className='p-2 col-span-2 border-l flex justify-center'>{fornecedor.pessoa.cnpj || fornecedor.pessoa.cpf}</td>
                                <td className='p-2 col-span-2 border-l border-r flex justify-center'>{fornecedor.pessoa.nome || fornecedor.pessoa.nome_fantasia}</td>
                                <td className='col-span-1 flex justify-center'>
                                <Link href={`fornecedores/${fornecedor.id}`}
                                      className='bg-yellow-400 rounded-md text-white font-semibold'>Editar</Link>
                                </td>
                            </tr>
                        )
                    }) || data.compras.map((compra) => {
                        return (
                            <tr key={compra.id} className='grid grid-cols-8 border-0 border-b '>
                                <td className='p-2 col-span-1 flex justify-center'>{compra.id}</td>
                                <td className='p-2 col-span-2 border-l flex justify-center'>{compra.tipo}</td>
                                <td className='p-2 col-span-2 border-l flex justify-center'>{compra.pessoa.cnpj || compra.pessoa.cpf}</td>
                                <td className='p-2 col-span-2 border-l border-r flex justify-center'>{compra.pessoa.nome || compra.pessoa.nome_fantasia}</td>
                                <td className='p-2 col-span-1 flex justify-center'>
                                <Link href={`fornecedores/${fornecedor.id}`}
                                      className='flex justify-center bg-yellow-400 p-2 rounded-md text-white font-semibold'>Editar</Link>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    );
}