import React, { useEffect, useState } from "react";

function ModalCriar({ openModal, setOpenModal }) {
  const [fornecedores, setFornecedores] = useState([]);
  const [compra, setCompra] = useState({
    id_fornecedor: null,
    status: "",
    unidades_macho: null,
    unidades_femea: null,
    preco_arroba: null,
    desconto: null,
    animais_abatidos: null,
    peso_total_abate: null,
    id_documento_romaneio: null,
    id_documento_gta: null,
    id_documento_nf_compra: null,
    id_documento_nf_abate: null,
    id_documento_nfs_matadouro: null,
    id_documento_nf_retorno: null,
  });

  function handleChange(e) {
    setCompra({ ...compra, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    fetch("http://localhost:3001/fornecedores")
      .then((response) => response.json())
      .then((data) => {
        setFornecedores(data);
      })
      .catch((error) => console.error(error));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/compras", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(compra),
      });
      if (response.ok) {
        console.log("Compra criada com sucesso");
        setOpenModal(false);
        window.location.reload();
      } else {
        console.error("Falha ao criar compra");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={`${openModal ? "" : "hidden"}`}>
      <div className="fixed top-0 left-0 w-full h-full bg-zinc-800/70 z-50"></div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-5 z-50 max-h-[calc(100vh-20%)] rounded-md overflow-auto scrollbartop">
        <h1 className="text-2xl font-semibold">Criar Compra</h1>
        <form className="mt-5 grid grid-cols-2 gap-2" onSubmit={handleSubmit}>
          <label>
            Fornecedor:
            <select
              name="id_fornecedor"
              className="p-2 border-2 border-gray-200 rounded-md w-full"
              onChange={handleChange}
            >
              <option value="">Selecione um fornecedor</option>
              {fornecedores.map((fornecedor) => (
                <option key={fornecedor.id} value={fornecedor.id}>
                  {fornecedor.pessoa.nome || fornecedor.pessoa.razao_social}
                </option>
              ))}
            </select>
          </label>
          <label>
            Unidades Macho:
            <input
              type="number"
              name="unidades_macho"
              className="p-2 border-2 border-gray-200 rounded-md w-full"
              onChange={handleChange}
            />
          </label>
          <label>
            Unidades Femea:
            <input
              type="number"
              name="unidades_femea"
              className="p-2 border-2 border-gray-200 rounded-md w-full"
              onChange={handleChange}
            />
          </label>
          <label>
            Preço Arroba:
            <input
              type="number"
              name="preco_arroba"
              className="p-2 border-2 border-gray-200 rounded-md w-full"
              onChange={handleChange}
            />
          </label>
          <label>
            Desconto:
            <input
              type="number"
              name="desconto"
              className="p-2 border-2 border-gray-200 rounded-md w-full"
              onChange={handleChange}
            />
          </label>
          <label>
            Animais Abatidos:
            <input
              type="number"
              name="animais_abatidos"
              className="p-2 border-2 border-gray-200 rounded-md w-full"
              onChange={handleChange}
            />
          </label>
          <label>
            Peso Total Abate:
            <input
              type="number"
              name="peso_total_abate"
              className="p-2 border-2 border-gray-200 rounded-md w-full"
              onChange={handleChange}
            />
          </label>
          <button
            type="submit"
            className="bg-green-500 text-white p-2 rounded-md col-span-2"
          >
            Criar
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setOpenModal(false);
            }}
            className="bg-red-500 text-white p-2 rounded-md col-span-2"
          >
            Fechar
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalCriar;
