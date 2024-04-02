import Link from "next/link";

export default function Home() {
    return (
        <div className="flex justify-between p-8">
            <Link href="/consultar-fornecedores">
                <div className="bg-slate-400 rounded-md p-3">
                    <h1 className="text-2xl font-semibold">Consultar fornecedores</h1>
                </div>
            </Link>
        </div>
    )
}