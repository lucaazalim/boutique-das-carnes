import Link from "next/link";

export default function Home() {
    return (
        <div className="flex justify-between p-8">
            <Link href="/fornecedores">
                <div className="bg-slate-400 rounded-md p-3 text-white">
                    <h1 className="text-2xl font-semibold">Consultar fornecedores</h1>
                </div>
            </Link>
            <Link href="/compras">
                <div className="bg-slate-400 rounded-md p-3 text-white">
                    <h1 className="text-2xl font-semibold">Consultar compras</h1>
                </div>
            </Link>
            <Link href="/usuarios">
                <div className="bg-slate-400 rounded-md p-3 text-white">
                    <h1 className="text-2xl font-semibold">Consultar usuários</h1>
                </div>
            </Link>
            <Link href="/teste">
                <div className="bg-slate-400 rounded-md p-3 text-white">
                    <h1 className="text-2xl font-semibold">Teste documentos</h1>
                </div>
            </Link>
        </div>
    )
}