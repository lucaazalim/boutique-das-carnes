'use client'

import {useEffect, useState} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
    const [pesquisa, setPesquisa] = useState('');
    const [fornecedores, setFornecedores] = useState([]);
    const [page, setPage] = useState(1);
    const [open, setOpen] = useState(false);
    const [idEditar, setIdEditar] = useState('');
    const [pessoa, setPessoa] = useState({})
    const router = useRouter();

    const [formData, setFormData] = useState({
        tipo: 'PF',
        pessoa: {},
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
        setFormData((prevFormData) => {
            const newFormData = {...prevFormData}
            if (name === "tipo") {
                if (value === 'PJ') {
                    delete newFormData.pessoa.cpf;
                    delete newFormData.pessoa.nome;
                } else if (value === 'PF') {
                    delete newFormData.pessoa.cnpj;
                    delete newFormData.pessoa.razao_social;
                    delete newFormData.pessoa.nome_fantasia;
                }
            }
            if (name === "nome"
                || name === "cpf"
                || name === "cnpj"
                || name === "razao_social"
                || name === "nome_fantasia") {
                newFormData.pessoa[name] = value;
            } else {
                newFormData[name] = value;
            }
            return newFormData;
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(JSON.stringify.formData)
        try {
            const res = await fetch('http://localhost:3001/fornecedores', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                redirect: 'follow'
            })
            alert("Fornecedor criado com sucesso!");
            router.push("/fornecedores");
        } catch (error) {
            console.error('Erro ao inserir dado no banco')
        }
    }

    useEffect(() => {
        fetch(`http://localhost:3001/fornecedores/${pesquisa === '' ? '' : `${pesquisa}`}`)
            .then(res => res.json())
            .then(data => setFornecedores(data))
            .then(console.log(fornecedores))
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
                        <tr key={fornecedor.id} className='grid grid-cols-5 border-b-2 border-b-gray-100 items-center'>
                            <td>{fornecedor.id}</td>
                            <td>{fornecedor.tipo}</td>
                            <td>{fornecedor.pessoa.cnpj || fornecedor.pessoa.cpf}</td>
                            <td>{fornecedor.pessoa.razao_social || fornecedor.pessoa.nome}</td>
                            <td className='flex justify-end'>
                                <Link href={`fornecedores/${fornecedor.id}`}
                                      className='flex justify-center bg-yellow-400 p-2 rounded-md text-white font-semibold'>Editar</Link>
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
                            {formData.tipo === 'PF' ? (
                                <>
                                    <input className='text-lg p-2 bg-gray-300 rounded-md'
                                           name='cpf'
                                           value={formData.pessoa.cpf}
                                           onChange={handleChange}
                                           placeholder='CPF'/>
                                    <input className='text-lg p-2 bg-gray-300 rounded-md'
                                           name='nome'
                                           value={formData.pessoa.nome}
                                           onChange={handleChange}
                                           placeholder='Nome'/>
                                </>
                            ) : (
                                <>
                                    <input className='text-lg p-2 bg-gray-300 rounded-md'
                                           name='cnpj'
                                           value={formData.pessoa.cnpj}
                                           onChange={handleChange}
                                           placeholder='CNPJ'/>
                                    <input className='text-lg p-2 bg-gray-300 rounded-md'
                                           name='razao_social'
                                           value={formData.pessoa.razao_social}
                                           onChange={handleChange}
                                           placeholder='Razão Social'/>
                                    <input className='text-lg p-2 bg-gray-300 rounded-md'
                                           name='nome_fantasia'
                                           value={formData.pessoa.nome_fantasia}
                                           onChange={handleChange}
                                           placeholder='Nome Fantasia'/>
                                </>
                            )}
                            <input
                                className='text-lg p-2 bg-gray-300 rounded-md'
                                name='email'
                                value={formData.email}
                                onChange={handleChange}
                                placeholder='E-mail'/>
                            <input
                                className='text-lg p-2 bg-gray-300 rounded-md'
                                name='telefone'
                                value={formData.telefone}
                                onChange={handleChange}
                                placeholder='Telefone'/>
                            <input
                                className='text-lg p-2 bg-gray-300 rounded-md'
                                name='celular'
                                value={formData.celular}
                                onChange={handleChange}
                                placeholder='Celular'/>
                            <input
                                className='text-lg p-2 bg-gray-300 rounded-md'
                                name='cep'
                                value={formData.cep}
                                onChange={handleChange}
                                placeholder='CEP'/>
                            <input
                                className='text-lg p-2 bg-gray-300 rounded-md'
                                name='logradouro'
                                value={formData.logradouro}
                                onChange={handleChange}
                                placeholder='Logradouro'/>
                            <input
                                className='text-lg p-2 bg-gray-300 rounded-md'
                                name='bairro'
                                value={formData.bairro}
                                onChange={handleChange}
                                placeholder='Bairro'/>
                            <input
                                className='text-lg p-2 bg-gray-300 rounded-md'
                                name='numero'
                                value={formData.numero}
                                onChange={handleChange}
                                placeholder='Número'/>
                            <input
                                className='text-lg p-2 bg-gray-300 rounded-md'
                                name='complemento'
                                value={formData.complemento}
                                onChange={handleChange}
                                placeholder='Complemento'/>
                            <input
                                className='text-lg p-2 bg-gray-300 rounded-md'
                                name='estado'
                                value={formData.estado}
                                onChange={handleChange}
                                placeholder='Estado'/>
                            <input
                                className='text-lg p-2 bg-gray-300 rounded-md'
                                name='cidade'
                                value={formData.cidade}
                                onChange={handleChange}
                                placeholder='Cidade'/>
                            <textarea
                                className='text-lg p-2 bg-gray-300 rounded-md col-span-2'
                                name='notas'
                                value={formData.notas}
                                onChange={handleChange}
                                placeholder='Notas'/>
                        </div>
                        <div className='flex justify-between'>
                            <button
                                className='bg-[#9e1616] p-2 rounded-md text-white font-semibold'
                                onClick={(e) => {
                                    e.preventDefault();
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