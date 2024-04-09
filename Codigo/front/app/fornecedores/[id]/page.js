'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page({ params }) {

    let [fornecedor, setFornecedor] = useState({});
    let [contatos, setContatos] = useState([]);
    let [open, setOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        fetch(`http://localhost:3001/fornecedores/${params.id}`)
            .then(res => res.json())
            .then(data => {
                setFornecedor(data)
                setContatos(data.contatos)
            })
            .catch(e => console.error('Erro ao solicitar os dados: ' + e))
    }, [params.id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFornecedor(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFornecedor(prevState => ({
            ...prevState,
            [name]: checked
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:3001/fornecedores/${params.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(fornecedor),
                redirect: 'follow'
            })
            alert("Fornecedor alterado com sucesso!");
            router.push("/fornecedores")
        } catch (error) {
            console.error('Erro ao editar fornecedor')
        }
    }

    return (
        <>
            <div className="p-5">
                <h1 className="text-4xl font-semibold">Editar fornecedor</h1>
                <form
                    onSubmit={handleSubmit}>
                    <div className='mt-2 grid grid-cols-2 gap-2'>
                        <input className='text-lg p-2 bg-gray-300 rounded-md' name="email" value={fornecedor.email || ''} onChange={handleInputChange} />
                        <input className='text-lg p-2 bg-gray-300 rounded-md' name="telefone" value={fornecedor.telefone || ''} onChange={handleInputChange} />
                        <input className='text-lg p-2 bg-gray-300 rounded-md' name="celular" value={fornecedor.celular || ''} onChange={handleInputChange} />
                        <input className='text-lg p-2 bg-gray-300 rounded-md' name="cep" value={fornecedor.cep || ''} onChange={handleInputChange} />
                        <input className='text-lg p-2 bg-gray-300 rounded-md' name="logradouro" value={fornecedor.logradouro || ''} onChange={handleInputChange} />
                        <input className='text-lg p-2 bg-gray-300 rounded-md' name="bairro" value={fornecedor.bairro || ''} onChange={handleInputChange} />
                        <input className='text-lg p-2 bg-gray-300 rounded-md' name="numero" value={fornecedor.numero || ''} onChange={handleInputChange} />
                        <input className='text-lg p-2 bg-gray-300 rounded-md' name="complemento" value={fornecedor.complemento || ''} onChange={handleInputChange} />
                        <input className='text-lg p-2 bg-gray-300 rounded-md' name="estado" value={fornecedor.estado || ''} onChange={handleInputChange} />
                        <input className='text-lg p-2 bg-gray-300 rounded-md' name="cidade" value={fornecedor.cidade || ''} onChange={handleInputChange} />
                        <textarea className='text-lg p-2 bg-gray-300 rounded-md col-span-2' name="notas" value={fornecedor.notas || ''} onChange={handleInputChange} />
                    </div>
                    <div className="flex justify-between mt-2">
                        <div className="text-lg p-2 bg-gray-300 rounded-md">
                            <label>Status: </label>
                            <select name="ativo"
                                className="bg-gray-300 rounded-md"
                                value={fornecedor.ativo}
                                onChange={handleInputChange}>
                                <option value='true'>Ativo</option>
                                <option value='false'>Inativo</option>
                            </select>
                        </div>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Salvar</button>
                    </div>
                </form>
                <div className="mt-2">
                    <h1 className="text-4xl font-semibold">Contatos</h1>
                    {contatos && contatos.map((contato) => {
                        return (
                            <div className="mt-2 grid grid-cols-10 gap-2">
                                <input className='text-lg p-2 bg-gray-300 rounded-md col-span-3' name="nome" value={contato.nome || ''} onChange={handleInputChange} />
                                <input className='text-lg p-2 bg-gray-300 rounded-md col-span-3' name="celular" value={contato.celular || ''} onChange={handleInputChange} />
                                <input className='text-lg p-2 bg-gray-300 rounded-md col-span-3' name="cargo" value={contato.cargo || ''} onChange={handleInputChange} />
                                <button className="col-span-1 bg-yellow-300 rounded-md" onClick={setOpen(!open)}>Editar</button>
                            </div>
                        )
                    })}
                </div>

                {/* <div className="mt-2">
                    <Link href={`/fornecedores/${params.id}/contatos`}
                        className="flex justify-center py-2 px-4 bg-slate-400 rounded-md text-white font-semibold">Consultar contatos</Link>
                </div> */}
                <Link href="/fornecedores"
                    className="flex justify-center w-[80px] p-2 bg-slate-400 rounded-md absolute bottom-5 left-[140px] text-white"
                >Voltar</Link>
            </div >
        </>
    )
}