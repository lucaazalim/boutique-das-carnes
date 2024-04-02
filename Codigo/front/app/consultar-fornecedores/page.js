'use client'

import {useEffect, useState} from "react";

export default function Home() {
    const [pesquisa, setPesquisa] = useState('');
    const [fornecedores, setFornecedores] = useState([]);
    const [page, setPage] = useState(1);
    const [open, setOpen] = useState(false);
    const [idEditar, setIdEditar] = useState('');
    const [tipo, setTipo] = useState('PF');

    useEffect(() => {
        fetch(`.../fornecedores${pesquisa === '' ? '' : `/${pesquisa}`}`)
            .then(res => res.json())
            .then(data => setFornecedores(data))
            .catch(e => console.error('Erro ao solicitar os dados: ' + e))
    }, []);

    return (
        <>
            <div className="p-5">
                <h1 className="text-4xl font-semibold">Consultar fornecedores</h1>
                <div className="py-4 grid grid-cols-4 mt-3 gap-4">
                    <input onChange={e => setPesquisa(e.target.value)}
                           className="col-span-2 bg-[#d9d9d9] rounded-md p-2 border-0"
                           placeholder='CNPJ, CPF, nome, razão socia ou nome fantasia'/>
                    <button
                        className='col-span-1 flex justify-center bg-[#7D1111] hover:bg-[#a12222] p-2 rounded-md text-white font-semibold'>
                        Buscar
                    </button>
                    <button
                        onClick={() => setOpen(!open)}
                        className='col-span-1 flex justify-center bg-[#06BD18] hover:bg-[#2edb3f] p-2 rounded-md
                               text-white font-semibold'>
                        Criar novo fornecedor
                    </button>
                </div>
                <table className='w-full'>
                    <thead className='border-b-2 border-b-gray-300'>
                    <tr className='grid grid-cols-5'>
                        <th>ID</th>
                        <th>Tipo</th>
                        <th>CPF ou CNPJ</th>
                        <th>Razão Social ou Nome</th>
                    </tr>
                    </thead>
                    <tbody>
                    {fornecedores.map(fornecedor => (
                        <tr key={fornecedor.id} className='grid grid-cols-5 border-b-2 border-b-gray-100'>
                            <td>{fornecedor.id}</td>
                            <td>{fornecedor.tipo}</td>
                            <td>{fornecedor.pessoa.cnpj || fornecedor.pessoa.cpf}</td>
                            <td>{fornecedor.pessoa.razao_social || fornecedor.pessoa.nome}</td>
                            <td>
                                <button className='w-[40px] h-[40px] rounded-xl bg-amber-300'
                                        onClick={() => {
                                            setOpen(!open);
                                            setIdEditar(fornecedor.id);
                                        }}>i
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div
                className={(open ? `` : `hidden`) + ` fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50`}>
                <div className='h-[calc(100vh-25%)] w-[calc(100vw-25%)] bg-white p-2 rounded-md'>
                    <form>
                        <div className='grid grid-cols-2 gap-2'>
                            <select className='text-lg p-2 bg-gray-300 rounded-md'
                                    onChange={e => setTipo(e.target.value)}>
                                <option value='PF' selected>Pessoa Física</option>
                                <option value='PJ'>Pessoa Jurídica</option>
                            </select>
                            <input className='text-lg p-2 bg-gray-300 rounded-md' placeholder='CPF ou CNPJ'/>
                            <input className='text-lg p-2 bg-gray-300 rounded-md' placeholder='Razão Social ou Nome'/>
                            <input className='text-lg p-2 bg-gray-300 rounded-md' placeholder='E-mail'/>
                        </div>

                    </form>
                    <button
                        className='bg-[#9e1616] p-2 rounded-md text-white font-semibold'
                        onClick={() => {
                            setOpen(!open);
                            setIdEditar('');
                        }}>Cancelar
                    </button>
                </div>
            </div>
        </>
    )
}