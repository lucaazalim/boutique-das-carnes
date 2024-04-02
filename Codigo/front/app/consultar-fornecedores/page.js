'use client'

import {useEffect, useState} from "react";

export default function Home() {
    const [pesquisa, setPesquisa] = useState('');
    const [fornecedores, setFornecedores] = useState([]);
    const [page, setPage] = useState(1);
    const [open, setOpen] = useState(false);
    const [idEditar, setIdEditar] = useState('');

    const [formDataPF, setFormDataPF] = useState({
        tipo: 'PF',
        cpf: '',
        nome: '',
        email: '',
        telefone: '',
        celular: '',
        cep: '',
        logradouro: '',
        bairro: '',
        numero: '',
        complemento: '',
        estado: '',
        cidade: '',
        ativo: true,
        notas: ''
    })

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormDataPF((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('http://localhost:3001/fornecedores', {
                method: 'POST',
                headers: {
                    'Content-Type': 'aplication/json',
                },
                body: JSON.stringify(formDataPF),
            })
        } catch (error) {
            console.error('Erro ao inserir dado no banco')
        }
    }

    useEffect(() => {
        fetch(`http://localhost:3001/fornecedores/${pesquisa === '' ? '' : `${pesquisa}`}`)
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
                            <td className='flex justify-end'>
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
                    <form onSubmit={handleSubmit}>
                        <div className='grid grid-cols-2 gap-2 pb-2'>
                            <select className='text-lg p-2 bg-gray-300 rounded-md'
                                    name='tipo'
                                    onChange={handleChange}>
                                <option value='PF' defaultValue>Pessoa Física</option>
                                <option value='PJ'>Pessoa Jurídica</option>
                            </select>
                            <input className='text-lg p-2 bg-gray-300 rounded-md'
                                   name='cpf'
                                   value={formDataPF.cpf}
                                   onChange={handleChange}
                                   placeholder='CPF ou CNPJ'/>
                            <input className='text-lg p-2 bg-gray-300 rounded-md'
                                   name='nome'
                                   value={formDataPF.nome}
                                   onChange={handleChange}
                                   placeholder='Razão Social ou Nome'/>
                            <input
                                className='text-lg p-2 bg-gray-300 rounded-md'
                                name='email'
                                value={formDataPF.email}
                                onChange={handleChange}
                                placeholder='E-mail'/>
                            <input
                                className='text-lg p-2 bg-gray-300 rounded-md'
                                name='telefone'
                                value={formDataPF.telefone}
                                onChange={handleChange}
                                placeholder='Telefone'/>
                            <input
                                className='text-lg p-2 bg-gray-300 rounded-md'
                                name='celular'
                                value={formDataPF.celular}
                                onChange={handleChange}
                                placeholder='Celular'/>
                            <input
                                className='text-lg p-2 bg-gray-300 rounded-md'
                                name='cep'
                                value={formDataPF.cep}
                                onChange={handleChange}
                                placeholder='CEP'/>
                            <input
                                className='text-lg p-2 bg-gray-300 rounded-md'
                                name='logradouro'
                                value={formDataPF.logradouro}
                                onChange={handleChange}
                                placeholder='Logradouro'/>
                            <input
                                className='text-lg p-2 bg-gray-300 rounded-md'
                                name='bairro'
                                value={formDataPF.bairro}
                                onChange={handleChange}
                                placeholder='Bairro'/>
                            <input
                                className='text-lg p-2 bg-gray-300 rounded-md'
                                name='numero'
                                value={formDataPF.numero}
                                onChange={handleChange}
                                placeholder='Número'/>
                            <input
                                className='text-lg p-2 bg-gray-300 rounded-md'
                                name='complemento'
                                value={formDataPF.complemento}
                                onChange={handleChange}
                                placeholder='Complemento'/>
                            <input
                                className='text-lg p-2 bg-gray-300 rounded-md'
                                name='estado'
                                value={formDataPF.estado}
                                onChange={handleChange}
                                placeholder='Estado'/>
                            <input
                                className='text-lg p-2 bg-gray-300 rounded-md'
                                name='cidade'
                                value={formDataPF.cidade}
                                onChange={handleChange}
                                placeholder='Cidade'/>
                            <textarea
                                className='text-lg p-2 bg-gray-300 rounded-md col-span-2'
                                name='notas'
                                value={formDataPF.notas}
                                onChange={handleChange}
                                placeholder='Notas'/>
                        </div>
                        <div className='flex justify-between'>
                            <button
                                className='bg-[#9e1616] p-2 rounded-md text-white font-semibold'
                                onClick={() => {
                                    setOpen(!open);
                                    setIdEditar('');
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