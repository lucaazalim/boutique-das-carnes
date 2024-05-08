"use client";

import Link from "next/link";
import BtnBack from "../components/BtnBack";

export default function Home() {
  return (
    <div className="p-5">
      <h1 className="text-4xl font-bold text-center">Home</h1>
      <div className="grid grid-cols-3 gap-4 mt-5">
        <Link
          href="/fornecedores"
          className="bg-gray-400 text-white p-2 rounded-md"
        >
          Fornecedores
        </Link>
        <Link
          href={`/clientes`}
          className="bg-gray-400 text-white p-2 rounded-md"
        >
          Clientes
        </Link>
        <Link
          href={`/usuarios`}
          className="bg-gray-400 text-white p-2 rounded-md"
        >
          Usuários
        </Link>
        <Link
          href={`/compras`}
          className="bg-gray-400 text-white p-2 rounded-md"
        >
          Compras
        </Link>
        <Link
          href={`/estoque`}
          className="bg-gray-400 text-white p-2 rounded-md"
        >
          Estoque
        </Link>
      </div>
      <BtnBack />
    </div>
  );
}
