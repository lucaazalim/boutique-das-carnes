// "use client"

// import Link from "next/link";
// import { useEffect, useState } from "react";

// export default function Page({ params }) {
//     const [contatos, setContatos] = useState([]);
//     const [contatoEdit, setContatoEdit] = useState({
//         nome: 
//     });

//     useEffect(() => {
//         fetch(`http://localhost:3001/fornecedores/${params.id}`)
//             .then(res => res.json())
//             .then(data => {
//                 setContatos(data.contatos);
//             })
//             .catch(e => console.error('Erro ao solicitar os dados: ' + e))
//     }, [])

//     function handleSubmit(e) {
//         const { name, value } = e.target;
//         setContatoEdit(prev => ({
//             ...prev,
//             [name]: value
//         }))

//     }

//     return (
//         <>
//             {contatos && contatos.map((contato => {
//                 return (
//                     <div className="p-5">
//                         <form
//                             className="grid grid-cols-10 gap-2"
//                             onSubmit={handleSubmit}>
//                             <input className="text-lg p-2 bg-gray-300 rounded-md" name="nome" value={null}></input>
//                         </form>
//                     </div>
//                 )
//             }))}
//             <Link href={`/fornecedores/${params.id}`}
//                 className="flex justify-center w-[80px] p-2 bg-slate-400 rounded-md absolute bottom-5 left-[140px] text-white"
//             >Voltar</Link>
//         </>
//     );
// }
