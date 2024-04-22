"use client";

import React, { useEffect, useState } from "react";

function ModalCriarCompra({ open, setOpen }) {
  const [fornecedores, setFornecedores] = useState([]);
  const [formData, setFormData] = useState({
    id_fornecedor: "",
    status: "",
    unidades_macho: "",
    unidades_femea: "",
    preco_arroba: "",
    desconto: "",
    animais_abatidos: "",
    peso_total_abate: "",
    id_documento_romaneio: null,
    id_documento_gta: null,
    id_documento_nf_compra: null,
    id_documento_nf_abate: null,
    id_documento_nfs_matadouro: null,
    id_documento_nf_retorno: null,
    pagamentos: {},
    pesagens: {},
  });

  useEffect(() => {
    fetch(`http://localhost:3001/fornecedores`)
      .then((res) => res.json())
      .then((data) => {
        setFornecedores(data);
      })
      .catch((e) => console.error("Erro ao solicitar os dados: " + e));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3001/compras", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        redirect: "follow",
      });
      alert("Compra inserida com sucesso.");
      setOpen(!open);
      router.push("/compras");
    } catch (error) {
      console.error("Erro ao inserir dado no banco.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div
      className={
        (open ? `` : `hidden`) +
        ` fixed inset-0 bg-zinc-800/80 backdrop-blur bg-opacity-75 flex items-center justify-center z-50`
      }
    >
      <div className="w-[calc(100vw-35%)] bg-white p-8 rounded-md">
        <form onSubmit={handleSubmit}>
          <h1 className="text-4xl font-semibold mb-2 col-span-2">
            Criar Compra
          </h1>
          <div className="grid grid-cols-2 gap-2 pb-2">
            <label className="bg-gray-300 p-2 rounded-md text-lg">
              Fornecedor:
              <select
                className="p-1 bg-gray-200 rounded-md w-full"
                name="id_fornecedor"
                onChange={handleChange}
              >
                <option value="">Selecione um fornecedor</option>
                {fornecedores.map((fornecedor) => (
                  <option key={fornecedor.id} value={fornecedor.id}>
                    {fornecedor.pessoa.nome || fornecedor.pessoa.nome_fantasia}
                  </option>
                ))}
              </select>
            </label>
            <label className="bg-gray-300 p-2 rounded-md text-lg">
              Status da compra:
              <select
                className="p-1 bg-gray-200 rounded-md w-full"
                name="status"
                onChange={handleChange}
              >
                <option value="">Selecione um status</option>
                <option value="PENDENTE">PENDENTE</option>
                <option value="CONCLUIDA">CONCLUIDA</option>
                <option value="CANCELADA">CANCELADA</option>
              </select>
            </label>
            <label className="bg-gray-300 p-2 rounded-md text-lg">
              Unidades macho:
              <input
                className="p-1 bg-gray-200 rounded-md w-full"
                type="number"
                min={0}
                name="unidades_macho"
                value={formData.unidades_macho}
                onChange={handleChange}
                placeholder="Unidades macho"
              />
            </label>
            <label className="bg-gray-300 p-2 rounded-md text-lg">
              Unidades fêmea:
              <input
                className="p-1 bg-gray-200 rounded-md w-full"
                type="number"
                min={0}
                name="unidades_femea"
                value={formData.unidades_femea}
                onChange={handleChange}
                placeholder="Unidades fêmea"
              />
            </label>
            <label className="bg-gray-300 p-2 rounded-md text-lg">
              Preço da arroba:
              <input
                className="p-1 bg-gray-200 rounded-md w-full"
                name="preco_arroba"
                type="number"
                min={0}
                step={0.01}
                value={formData.preco_arroba}
                onChange={handleChange}
                placeholder="Preço da arroba"
              />
            </label>
            <label className="bg-gray-300 p-2 rounded-md text-lg">
              Desconto:
              <input
                className="p-1 bg-gray-200 rounded-md w-full"
                name="desconto"
                type="number"
                min={0}
                step={0.01}
                value={formData.desconto}
                onChange={handleChange}
                placeholder="Desconto"
              />
            </label>
            <label className="bg-gray-300 p-2 rounded-md text-lg">
              Animais abatidos:
              <input
                className="p-1 bg-gray-200 rounded-md w-full"
                type="number"
                min={0}
                name="animais_abatidos"
                value={formData.animais_abatidos}
                onChange={handleChange}
                placeholder="Animais abatidos"
              />
            </label>
            <label className="bg-gray-300 p-2 rounded-md text-lg">
              Peso total do abate:
              <input
                className="p-1 bg-gray-200 rounded-md w-full"
                type="number"
                min={0}
                step={0.01}
                name="peso_total_abate"
                value={formData.peso_total_abate}
                onChange={handleChange}
                placeholder="Peso total do abate"
              />
            </label>
          </div>
          <div className="flex justify-between">
            <button
              className="bg-red-500 text-white p-2 rounded-md"
              onClick={(e) => {
                e.preventDefault();
                setOpen(!open);
              }}
            >
              Cancelar
            </button>
            <button
              className="bg-green-500 text-white p-2 rounded-md"
              type="submit"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalCriarCompra;
