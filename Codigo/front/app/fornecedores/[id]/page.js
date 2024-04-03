'use client'

import Link from "next/link";
import {useEffect, useState} from "react";

export default function Page({params}) {

    const [fornecedor, setFornecedor] = useState({});
    const [contatos, setContatos] = useState({

    })

    useEffect(() => {
        fetch(`http://localhost:3001/fornecedores/${params.id}`)
            .then(res => res.json())
            .then(data => setFornecedor(data[0]))
            .catch(e => console.error('Erro ao solicitar os dados: ' + e))
    }, [params.id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:3001/fornecedor/${params.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(fornecedor),
                redirect: 'follow'
            })
        } catch (error) {
            console.error('Erro ao editar fornecedor')
        }
    }

    console.log(fornecedor)

    return (
        <>
            <div className="p-5">
                <h1 className="text-4xl font-semibold">Editar fornecedor</h1>
                <form>
                    <div className='mt-2 grid grid-cols-2 gap-2'>
                        <input className='text-lg p-2 bg-gray-300 rounded-md' value={fornecedor.email}/>
                        <input className='text-lg p-2 bg-gray-300 rounded-md' value={fornecedor.telefone}/>
                        <input className='text-lg p-2 bg-gray-300 rounded-md' value={fornecedor.celular}/>
                        <input className='text-lg p-2 bg-gray-300 rounded-md' value={fornecedor.cep}/>
                        <input className='text-lg p-2 bg-gray-300 rounded-md' value={fornecedor.logradouro}/>
                        <input className='text-lg p-2 bg-gray-300 rounded-md' value={fornecedor.bairro}/>
                        <input className='text-lg p-2 bg-gray-300 rounded-md' value={fornecedor.numero}/>
                        <input className='text-lg p-2 bg-gray-300 rounded-md' value={fornecedor.complemento}/>
                        <input className='text-lg p-2 bg-gray-300 rounded-md' value={fornecedor.estado}/>
                        <input className='text-lg p-2 bg-gray-300 rounded-md' value={fornecedor.cidade}/>
                        <textarea className='text-lg p-2 bg-gray-300 rounded-md col-span-2' value={fornecedor.notas}/>
                    </div>
                    <label>Status: </label>
                        <input type='checkbox' className='text-lg p-2 bg-gray-300 rounded-md' checked={fornecedor.ativo}/>
                </form>
                <Link href="/fornecedores"
                      className="flex justify-center w-[80px] p-2 bg-slate-400 rounded-md absolute bottom-5 left-[140px] text-white"
                >Voltar</Link>
            </div>
        </>
    )
}