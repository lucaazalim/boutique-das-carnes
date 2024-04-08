'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
    const [formData, setFormData] = useState({
        id_fornecedor: 0,
        status: '',
        unidades_macho: 0,
        unidades_femea: 0,
        preco_arroba: 0,
        desconto: 0,
        animais_abatidos: 0,
        peso_total_abate: 0,
        id_documento_romaneio: null,
        id_documento_gta: null,
        id_documento_nf_compra: null,
        id_documento_nf_abate: null,
        id_documento_nfs_matadouro: null,
        id_documento_nf_retorno: null,
        pagamentos: {},
        pesagens: {}
    });

    const [compras, setCompras] = useState([]);
    const [open, setOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        fetch(`http://localhost:3001/compras`)
            .then(res => res.json())
            .then(data => setCompras(data))
            .then(() => console.log('Dados solicitados com sucesso'))
            .catch(e => console.error('Erro ao solicitar os dados: ' + e))
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(JSON.stringify.formData)
        try {
            const res = await fetch('http://localhost:3001/compras', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                redirect: 'follow'
            })
            router.push("/compras");
        } catch (error) {
            console.error('Erro ao inserir dado no banco')
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    return (
        <>
            <div className="p-5">
                <h1 className="text-4xl font-semibold">Consultar compras</h1>
                <div className="py-4 grid grid-cols-4 mt-3 gap-4">
                    <input onChange={e => setPesquisa(e.target.value)}
                        className="col-span-2 bg-[#d9d9d9] rounded-md p-2 border-0"
                        placeholder='CNPJ, CPF, nome, razão socia ou nome fantasia' />
                    <button
                        className='col-span-1 flex justify-center bg-[#7D1111] hover:bg-[#a12222] p-2 rounded-md text-white font-semibold'>
                        Buscar
                    </button>
                    <button
                        onClick={() => setOpen(!open)}
                        className='col-span-1 flex justify-center bg-[#06BD18] hover:bg-[#2edb3f] p-2 rounded-md
                               text-white font-semibold'>
                        Criar nova compra
                    </button>
                </div>
                <table className="w-full">
                    <thead className='border-b-2 border-b-gray-300'>
                        <tr className='grid grid-cols-5'>
                            <th>ID</th>
                            <th>Fornecedor</th>
                            <th>Número de animais</th>
                            <th>Preço total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {compras.map(compra => {
                            <tr key={compra.id} className='grid grid-cols-4 border-b-2 border-b-gray-100 items-center'>
                                <td>{compra.id}</td>
                                <td>{compra.id_fornecedor}</td>
                                <td>{compra.unidades_femea + compra.unidades_macho}</td>
                                <td>{compra.peso_total_abate * compra.preco_arroba}</td>
                                <td className='flex justify-end'>
                                    <Link href={`compras/${compra.id}`}
                                        className='flex justify-center bg-yellow-400 p-2 rounded-md text-white font-semibold'>Editar</Link>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
            <div
                className={(open ? `` : `hidden`) + ` fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50`}>
                <div className='h-[calc(100vh-25%)] w-[calc(100vw-25%)] bg-white p-2 rounded-md'>
                    <form onSubmit={handleSubmit}>
                        <div className='grid grid-cols-2 gap-2 pb-2'>
                            <input
                                className='text-lg p-2 bg-gray-300 rounded-md'
                                name='id_fornecedor'
                                value={formData.id_fornecedor}
                                onChange={handleChange}
                                placeholder='Id fornecedor' />
                            <input
                                className='text-lg p-2 bg-gray-300 rounded-md'
                                name='status'
                                value={formData.status}
                                onChange={handleChange}
                                placeholder='Status' />
                            <input
                                className='text-lg p-2 bg-gray-300 rounded-md'
                                name='unidades_macho'
                                value={formData.unidades_macho}
                                onChange={handleChange}
                                placeholder='Unidades macho' />
                            <input
                                className='text-lg p-2 bg-gray-300 rounded-md'
                                name='unidades_femea'
                                value={formData.unidades_femea}
                                onChange={handleChange}
                                placeholder='Unidades fêmea' />
                            <input
                                className='text-lg p-2 bg-gray-300 rounded-md'
                                name='preco_arroba'
                                value={formData.preco_arroba}
                                onChange={handleChange}
                                placeholder='Preço da arroba' />
                            <input
                                className='text-lg p-2 bg-gray-300 rounded-md'
                                name='desconto'
                                value={formData.desconto}
                                onChange={handleChange}
                                placeholder='Desconto' />
                            <input
                                className='text-lg p-2 bg-gray-300 rounded-md'
                                name='animais_abatidos'
                                value={formData.animais_abatidos}
                                onChange={handleChange}
                                placeholder='Animais abatidos' />
                            <input
                                className='text-lg p-2 bg-gray-300 rounded-md'
                                name='peso_total_abate'
                                value={formData.peso_total_abate}
                                onChange={handleChange}
                                placeholder='Peso total do abate' />
                        </div>
                        <div className='flex justify-between'>
                            <button
                                className='bg-[#9e1616] p-2 rounded-md text-white font-semibold'
                                onClick={(e) => {
                                    e.preventDefault();
                                    setOpen(!open);
                                }}>Cancelar
                            </button>
                            <button
                                className='bg-[#06BD18] p-2 rounded-md text-white font-semibold'
                                type='submit'>
                                Enviar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}