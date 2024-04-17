"use client";

import { useEffect, useState } from "react";
import InputMask from "react-input-mask";
import Link from "next/link";

export default function Page({ params }) {
  const [compra, setCompra] = useState({});
  const [pesagens, setPesagens] = useState([]);
  const [pagamentos, setPagamentos] = useState([]);
  const [criarPesagemOpen, setCriarPesagemOpen] = useState(false);
  const [pesagemCreate, setPesagemCreate] = useState({
    unidades: "",
    peso: "",
  });
  const [criarPagamentosOpen, setCriarPagamentosOpen] = useState(false);
  const [pagamentoCreate, setPagamentoCreate] = useState({
    valor: "",
    meio_pagamento: "",
    id_documento_comprovante: "",
  });

  useEffect(() => {
    fetch(`http://localhost:3001/compras/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setCompra(data);
        setPesagens(data.pesagens);
        setPagamentos(data.pagamentos);
      });
  }, [params.id]);

  function handleExcludePesagem(id) {
    return function () {
      fetch(`http://localhost:3001/compras/pesagens/${id}`, {
        method: "DELETE",
      }).then(() => {
        setPesagens(pesagens.filter((pesagem) => pesagem.id !== id));
      });
    };
  }

  function handleExcludePagamento(id) {
    return function () {
      fetch(`http://localhost:3001/compras/pagamentos/${id}`, {
        method: "DELETE",
      }).then(() => {
        setPagamentos(pagamentos.filter((pagamento) => pagamento.id !== id));
      });
    };
  }

  function handleCreatePesagem() {
    fetch(`http://localhost:3001/compras/${params.id}/pesagens`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pesagemCreate),
    })
      .then((res) => res.json())
      .then((data) => {
        setPesagens([...pesagens, data]);
        setCriarPesagemOpen(false);
        setPesagemCreate({ unidades: "", peso: "" });
      });
  }

  function handleCreatePagamentos() {
    fetch(`http://localhost:3001/compras/${params.id}/pagamentos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pagamentoCreate),
    })
      .then((res) => res.json())
      .then((data) => {
        setPagamentos([...pagamentos, data]);
        setCriarPagamentosOpen(false);
        setPagamentoCreate({
          valor: "",
          meio_pagamento: "",
          id_documento_comprovante: "",
        });
      });
  }

  function handleChangeCreatePagamento(e) {
    setPagamentoCreate({ ...pagamentoCreate, [e.target.name]: e.target.value });
  }

  function handleChangeCreatePesagem(e) {
    setPesagemCreate({ ...pesagemCreate, [e.target.name]: e.target.value });
  }

  function handleChangeEdit(e) {
    setCompra({ ...compra, [e.target.name]: e.target.value });
  }

  return (
    <div className="p-5">
      <div className="mb-[60px]">
        <h1 className="text-4xl font-semibold">Editar compra</h1>
        <form className="mt-5 grid grid-cols-2 gap-2">
          <div className="p-2 bg-gray-200 rounded-md align-middle">
            <label>Fornecedor: </label>
            <input
              disabled
              type="text"
              name="id_fornecedor"
              onChange={handleChangeEdit}
              value={compra.id_fornecedor || ""}
              className="text-lg bg-gray-200 rounded-md w-full text-gray-400 cursor-default"
            />
          </div>
          <div className="p-2 bg-gray-200 rounded-md align-middle">
            <label>Status: </label>
            <input
              type="text"
              name="status"
              onChange={handleChangeEdit}
              value={compra.status || ""}
              className="text-lg bg-gray-200 rounded-md w-full"
            />
          </div>
          <div className="p-2 bg-gray-200 rounded-md align-middle">
            <label>Unidades machos: </label>
            <input
              type="text"
              name="unidades_macho"
              onChange={handleChangeEdit}
              value={compra.unidades_macho || ""}
              className="text-lg bg-gray-200 rounded-md w-full"
            />
          </div>
          <div className="p-2 bg-gray-200 rounded-md align-middle">
            <label>Unidades fêmeas: </label>
            <input
              type="text"
              name="unidades_femea"
              onChange={handleChangeEdit}
              value={compra.unidades_femea || ""}
              className="text-lg bg-gray-200 rounded-md w-full"
            />
          </div>
          <div className="p-2 bg-gray-200 rounded-md align-middle">
            <label>Preço da arroba: </label>
            <input
              type="text"
              name="preco_arroba"
              onChange={handleChangeEdit}
              value={compra.preco_arroba || ""}
              className="text-lg bg-gray-200 rounded-md w-full"
            />
          </div>
          <div className="p-2 bg-gray-200 rounded-md align-middle">
            <label>Desconto: </label>
            <input
              type="text"
              name="desconto"
              onChange={handleChangeEdit}
              value={compra.desconto}
              className="text-lg bg-gray-200 rounded-md w-full"
            />
          </div>
          <div className="p-2 bg-gray-200 rounded-md align-middle">
            <label>Animais Abatidos: </label>
            <input
              type="text"
              name="animais_abatidos"
              onChange={handleChangeEdit}
              value={compra.animais_abatidos || ""}
              className="text-lg bg-gray-200 rounded-md w-full"
            />
          </div>
          <div className="p-2 bg-gray-200 rounded-md align-middle">
            <label>Peso total do abate: </label>
            <input
              type="text"
              name="peso_total_abate"
              onChange={handleChangeEdit}
              value={compra.peso_total_abate || ""}
              className="text-lg bg-gray-200 rounded-md w-full"
            />
          </div>
        </form>

        <h1 className="text-4xl font-semibold mt-10">Pesagens</h1>
        {pesagens.map((pesagem) => {
          return (
            <div key={pesagem.id} className="mt-5 grid grid-cols-9 gap-2">
              <div className="p-2 bg-gray-200 rounded-md align-middle col-span-4">
                <label>Peso: </label>
                <input
                  readOnly
                  type="text"
                  value={pesagem.peso || ""}
                  className="text-lg bg-gray-200 rounded-md w-full cursor-default"
                />
              </div>
              <div className="p-2 bg-gray-200 rounded-md align-middle col-span-4">
                <label>Unidades: </label>
                <input
                  readOnly
                  type="text"
                  value={pesagem.unidades || ""}
                  className="text-lg bg-gray-200 rounded-md w-full cursor-default"
                />
              </div>
              <button
                onClick={handleExcludePesagem(pesagem.id)}
                className="bg-red-500 hover:bg-red-400 text-white rounded-md p-2 font-semibold text-xl"
              >
                Excluir
              </button>
            </div>
          );
        })}

        {!criarPesagemOpen && (
          <div className="mt-2 flex justify-center">
            <button
              className="bg-green-600 hover:bg-green-500 rounded-md p-2 text-white font-semibold text-xl"
              onClick={() => setCriarPesagemOpen(!criarPesagemOpen)}
            >
              Criar pesagem
            </button>
          </div>
        )}

        {criarPesagemOpen && (
          <div className="mt-5 grid grid-cols-2 gap-2 bg-slate-100 p-2 rounded-md shadow-lg">
            <div className="p-2 bg-gray-200 rounded-md align-middle">
              <label>Peso: </label>
              <input
                type="text"
                name="peso"
                value={pesagemCreate.peso || ""}
                onChange={handleChangeCreatePesagem}
                className="text-lg bg-gray-200 rounded-md w-full"
              />
            </div>
            <div className="p-2 bg-gray-200 rounded-md align-middle">
              <label>Unidades: </label>
              <input
                type="text"
                name="unidades"
                value={pesagemCreate.unidades || ""}
                onChange={handleChangeCreatePesagem}
                className="text-lg bg-gray-200 rounded-md w-full"
              />
            </div>
            <div className="flex justify-around p-2 rounded-md col-span-2">
              <button
                onClick={() => setCriarPesagemOpen(!criarPesagemOpen)}
                className="bg-red-500 hover:bg-red-400 rounded-md p-2 text-white font-semibold text-xl"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreatePesagem}
                className="bg-green-600 hover:bg-green-500 rounded-md p-2 text-white font-semibold text-xl"
              >
                Criar
              </button>
            </div>
          </div>
        )}

        <h1 className="text-4xl font-semibold mt-10">Pagamentos</h1>
        {pagamentos.map((pagamento) => {
          return (
            <div key={pagamento.id} className="mt-5 grid grid-cols-9 gap-2">
              <div className="p-2 bg-gray-200 rounded-md align-middle col-span-2">
                <label>Data: </label>
                <input
                  readOnly
                  type="text"
                  value={pagamento.data || ""}
                  className="text-lg bg-gray-200 rounded-md w-full cursor-default"
                />
              </div>
              <div className="p-2 bg-gray-200 rounded-md align-middle col-span-2">
                <label>Forma de pagamento:</label>
                <input
                  readOnly
                  type="text"
                  value={pagamento.meio_pagamento || ""}
                  className="text-lg bg-gray-200 rounded-md w-full cursor-default"
                />
              </div>
              <div className="p-2 bg-gray-200 rounded-md align-middle col-span-2">
                <label>ID do comprovante: </label>
                <input
                  readOnly
                  type="text"
                  value={pagamento.id_documento_comprovante || ""}
                  className="text-lg bg-gray-200 rounded-md w-full cursor-default"
                />
              </div>
              <div className="p-2 bg-gray-200 rounded-md align-middle col-span-2">
                <label>Valor: </label>
                <input
                  readOnly
                  type="text"
                  value={pagamento.valor || ""}
                  className="text-lg bg-gray-200 rounded-md w-full cursor-default"
                />
              </div>
              <button
                onClick={handleExcludePagamento(pagamento.id)}
                className="bg-red-500 hover:bg-red-400 text-white rounded-md p-2 font-semibold text-xl"
              >
                Excluir
              </button>
            </div>
          );
        })}

        {!criarPagamentosOpen && (
          <div className="mt-2 flex justify-center">
            <button
              className="bg-green-600 hover:bg-green-500 rounded-md p-2 text-white font-semibold text-xl"
              onClick={() => setCriarPagamentosOpen(!criarPagamentosOpen)}
            >
              Criar pagamento
            </button>
          </div>
        )}

        {criarPagamentosOpen && (
          <div
            key={pagamentoCreate.id}
            className="mt-5 grid grid-cols-8 gap-2 bg-slate-100 p-2 rounded-md shadow-lg"
          >
            <div className="p-2 bg-gray-200 rounded-md align-middle col-span-2">
              <label>Data: </label>
              <InputMask
                type="text"
                onChange={handleChangeCreatePagamento}
                name="data"
                value={pagamentoCreate.data || ""}
                className="text-lg bg-gray-200 rounded-md w-full cursor-default"
                mask="99-99-9999"
              />
            </div>
            <div className="p-2 bg-gray-200 rounded-md align-middle col-span-2">
              <label>Forma de pagamento:</label>
              <input
                type="text"
                onChange={handleChangeCreatePagamento}
                name="meio_pagamento"
                value={pagamentoCreate.meio_pagamento || ""}
                className="text-lg bg-gray-200 rounded-md w-full cursor-default"
              />
            </div>
            <div className="p-2 bg-gray-200 rounded-md align-middle col-span-2">
              <label>ID do comprovante: </label>
              <input
                type="text"
                name="id_documento_comprovante"
                onChange={handleChangeCreatePagamento}
                value={pagamentoCreate.id_documento_comprovante || ""}
                className="text-lg bg-gray-200 rounded-md w-full cursor-default"
              />
            </div>
            <div className="p-2 bg-gray-200 rounded-md align-middle col-span-2">
              <label>Valor: </label>
              <input
                type="text"
                name="valor"
                onChange={handleChangeCreatePagamento}
                value={pagamentoCreate.valor || ""}
                className="text-lg bg-gray-200 rounded-md w-full cursor-default"
              />
            </div>
            <div className="flex justify-around p-2 rounded-md col-span-8">
              <button
                onClick={() => setCriarPagamentosOpen(!criarPagamentosOpen)}
                className="bg-red-500 hover:bg-red-400 rounded-md p-2 text-white font-semibold text-xl"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreatePagamentos}
                className="bg-green-600 hover:bg-green-500 rounded-md p-2 text-white font-semibold text-xl"
              >
                Criar
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="absolute bottom-0 w-[calc(100vw-240px)] left-[120px] bg-white p-2">
        <Link
          href="/compras"
          className="flex justify-center w-[80px] p-2 bg-slate-400 rounded-md text-white"
        >
          Voltar
        </Link>
      </div>
    </div>
  );
}
