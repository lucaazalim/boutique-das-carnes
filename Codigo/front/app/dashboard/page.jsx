"use client";

import Link from "next/link";
import BtnBack from "../components/BtnBack";

export default function Home() {
  return (
    <>
      <h1 className="text-4xl font-bold text-center pt-5">Home</h1>
      <div className="px-5">
        <div className="grid grid-cols-3 gap-4 mt-5 mb-5">
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
          <Link
            href={`/despesas`}
            className="bg-gray-400 text-white p-2 rounded-md"
          >
            Despesas
          </Link>
          <Link
            href={`/criar-categoria-despesa`}
            className="bg-gray-400 text-white p-2 rounded-md"
          >
            Ciar categoria de despesa
          </Link>
          <Link
            href={`/pedidos`}
            className="bg-gray-400 text-white p-2 rounded-md"
          >
            Pedidos
          </Link>
        </div>
        <div>
          <div className="border-b-2 border-b-black mb-5">
            <h1 className="text-2xl font-bold">Relatórios</h1>
          </div>
          <div className="grid grid-col gap-4">
            <Link
              href={`/relatorios/compras-por-fornecedor`}
              className="bg-gray-400 text-white p-2 rounded-md flex"
            >
              Relatório de compras por fornecedor
            </Link>
            <Link
              href={`/relatorios/pedidos-por-cliente`}
              className="bg-gray-400 text-white p-2 rounded-md flex"
            >
              Relatório de pedidos por cliente
            </Link>
            <Link
              href={`/relatorios/financeiro`}
              className="bg-gray-400 text-white p-2 rounded-md flex"
            >
              Relatório financeiro
            </Link>
          </div>
        </div>
        <BtnBack />
      </div>
    </>
  );
}
