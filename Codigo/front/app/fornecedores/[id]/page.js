'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page({ params }) {

    const [fornecedor, setFornecedor] = useState({});
    const [contatos, setContatos] = useState([{ nome: '', celular: '', cargo: '' }])
    const router = useRouter();

    useEffect(() => {
        fetch(`http://localhost:3001/fornecedores/${params.id}`)
            .then(res => res.json())
            .then(data => setFornecedor(data[0]))
            .catch(e => console.error('Erro ao solicitar os dados: ' + e))
    }, [params.id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFornecedor(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleContatoChange = (index, e) => {
        const { name, value } = e.target;
        const newContatos = [...contatos];
        newContatos[index][name] = value;
        setContatos(newContatos);
    };

    const handleAddContact = () => {
        setContatos([...contatos, { nome: '', celular: '', cargo: '' }]);
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFornecedor(prevState => ({
            ...prevState,
            [name]: checked
        }));
    }

    const handleSubmitContato = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:3001/fornecedores/${params.id}/contatos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(contatos)
            })
        } catch (error) {

        }
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
                <form onSubmit={handleSubmit}>
                    <div className='mt-2 grid grid-cols-2 gap-2'>
                        <input className='text-lg p-2 bg-gray-300 rounded-md' name="email" value={fornecedor.email} onChange={handleInputChange} />
                        <input className='text-lg p-2 bg-gray-300 rounded-md' name="telefone" value={fornecedor.telefone} onChange={handleInputChange} />
                        <input className='text-lg p-2 bg-gray-300 rounded-md' name="celular" value={fornecedor.celular} onChange={handleInputChange} />
                        <input className='text-lg p-2 bg-gray-300 rounded-md' name="cep" value={fornecedor.cep} onChange={handleInputChange} />
                        <input className='text-lg p-2 bg-gray-300 rounded-md' name="logradouro" value={fornecedor.logradouro} onChange={handleInputChange} />
                        <input className='text-lg p-2 bg-gray-300 rounded-md' name="bairro" value={fornecedor.bairro} onChange={handleInputChange} />
                        <input className='text-lg p-2 bg-gray-300 rounded-md' name="numero" value={fornecedor.numero} onChange={handleInputChange} />
                        <input className='text-lg p-2 bg-gray-300 rounded-md' name="complemento" value={fornecedor.complemento} onChange={handleInputChange} />
                        <input className='text-lg p-2 bg-gray-300 rounded-md' name="estado" value={fornecedor.estado} onChange={handleInputChange} />
                        <input className='text-lg p-2 bg-gray-300 rounded-md' name="cidade" value={fornecedor.cidade} onChange={handleInputChange} />
                        <textarea className='text-lg p-2 bg-gray-300 rounded-md col-span-2' name="notas" value={fornecedor.notas} onChange={handleInputChange} />
                    </div>
                    <div className="flex justify-between">
                        <div className="text-lg p-2">
                            <label>Status: </label>
                            <input type='checkbox' className='w-4 h-4' name="ativo" checked={fornecedor.ativo} onChange={handleCheckboxChange} />
                        </div>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Salvar</button>
                    </div>
                </form>
                <div className="mt-2">
                    <h1 className="text-4xl font-semibold">Contatos</h1>
                    <form className="grid grid-cols-11 gap-2 mt-2" onSubmit={handleSubmitContato}>
                        {contatos.map((contact, index) => (
                            <div key={index} className="grid grid-cols-3 col-span-9 gap-2">
                                <input
                                    className="bg-gray-300 rounded-md p-2 text-lg"
                                    placeholder="Nome"
                                    name="nome"
                                    value={contact.nome}
                                    onChange={(e) => handleContatoChange(index, e)}
                                />
                                <input
                                    className="bg-gray-300 rounded-md p-2 text-lg"
                                    placeholder="Celular"
                                    name="celular"
                                    value={contact.celular}
                                    onChange={(e) => handleContatoChange(index, e)}
                                />
                                <input
                                    className="bg-gray-300 rounded-md p-2 text-lg"
                                    placeholder="Cargo"
                                    name="cargo"
                                    value={contact.cargo}
                                    onChange={(e) => handleContatoChange(index, e)}
                                />
                            </div>
                        ))}
                        <button className="bg-green-400 rounded-md col-span-1" onClick={handleAddContact}>+</button>
                        <button onClick={handleSubmitContato} className="col-span-1">Enviar</button>
                    </form>
                </div>
                <Link href="/fornecedores"
                    className="flex justify-center w-[80px] p-2 bg-slate-400 rounded-md absolute bottom-5 left-[140px] text-white"
                >Voltar</Link>
            </div>
        </>
    )
}