import React from "react";

import { estados } from "../utils/estados";

function FormEdicaoFornecedor({ fornecedor, setFornecedor, id }) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3001/fornecedores/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fornecedor),
      });
      alert("Fornecedor alterado com sucesso!");
      //   router.push("/fornecedores");
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFornecedor((prevFormData) => {
      const newFormData = { ...prevFormData };
      if (
        name === "nome" ||
        name === "cpf" ||
        name === "cnpj" ||
        name === "razao_social" ||
        name === "nome_fantasia"
      ) {
        newFormData.pessoa[name] = value;
      } else {
        newFormData[name] = value;
      }
      return newFormData;
    });
  };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFornecedor((prevFormData) => ({
  //     ...prevFormData,
  //     [name]: value,
  //   }));
  // };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-2 grid grid-cols-2 gap-2">
        {fornecedor.tipo === "PF" && (
          <>
            <label className="bg-gray-300 p-2 rounded-md font-semibold text-gray-400 text-lg">
              CPF:
              <input
                className="p-1 bg-gray-300 rounded-md w-full font-normal text-gray-400 cursor-default"
                name="cpf"
                value={fornecedor.pessoa.cpf || ""}
                readOnly
                onChange={handleInputChange}
              />
            </label>
            <label className="bg-gray-300 p-2 rounded-md font-semibold text-lg">
              Nome:
              <input
                className="p-1 bg-gray-200 rounded-md w-full font-normal"
                name="nome"
                value={fornecedor.pessoa.nome || ""}
                onChange={handleInputChange}
              />
            </label>
          </>
        )}
        {fornecedor.tipo === "PJ" && (
          <>
            <label className="bg-gray-300 p-2 rounded-md font-semibold text-lg">
              CNPJ:
              <input
                className="p-1 bg-gray-300 rounded-md w-full font-normal text-gray-400 cursor-default"
                name="nome"
                value={fornecedor.pessoa.cnpj || ""}
                readOnly
                onChange={handleInputChange}
              />
            </label>
            <label className="bg-gray-300 p-2 rounded-md font-semibold text-lg">
              Razao Social:
              <input
                className="p-1 bg-gray-200 rounded-md w-full font-normal"
                name="razao_social"
                value={fornecedor.pessoa.razao_social || ""}
                onChange={handleInputChange}
              />
            </label>
            <label className="bg-gray-300 p-2 rounded-md font-semibold text-lg">
              Nome Fantasia:
              <input
                className="p-1 bg-gray-200 rounded-md w-full font-normal"
                name="nome_fantasia"
                value={fornecedor.pessoa.nome_fantasia || ""}
                onChange={handleInputChange}
              />
            </label>
          </>
        )}
        <label className="bg-gray-300 p-2 rounded-md font-semibold text-lg">
          Email:
          <input
            className="p-1 bg-gray-200 rounded-md w-full font-normal"
            name="email"
            value={fornecedor.email || ""}
            onChange={handleInputChange}
          />
        </label>
        <label className="bg-gray-300 p-2 rounded-md font-semibold text-lg">
          Telefone:
          <input
            className="p-1 bg-gray-200 rounded-md w-full font-normal"
            name="telefone"
            value={fornecedor.telefone || ""}
            onChange={handleInputChange}
          />
        </label>
        <label className="bg-gray-300 p-2 rounded-md font-semibold text-lg">
          Celular:
          <input
            className="p-1 bg-gray-200 rounded-md w-full font-normal"
            name="celular"
            value={fornecedor.celular || ""}
            onChange={handleInputChange}
          />
        </label>
        <label className="bg-gray-300 p-2 rounded-md font-semibold text-lg">
          CEP:
          <input
            className="p-1 bg-gray-200 rounded-md w-full font-normal"
            name="cep"
            value={fornecedor.cep || ""}
            onChange={handleInputChange}
          />
        </label>
        <label className="bg-gray-300 p-2 rounded-md font-semibold text-lg">
          Logradouro:
          <input
            className="p-1 bg-gray-200 rounded-md w-full font-normal"
            name="logradouro"
            value={fornecedor.logradouro || ""}
            onChange={handleInputChange}
          />
        </label>
        <label className="bg-gray-300 p-2 rounded-md font-semibold text-lg">
          Bairro:
          <input
            className="p-1 bg-gray-200 rounded-md w-full font-normal"
            name="bairro"
            value={fornecedor.bairro || ""}
            onChange={handleInputChange}
          />
        </label>
        <label className="bg-gray-300 p-2 rounded-md font-semibold text-lg">
          Número:
          <input
            className="p-1 bg-gray-200 rounded-md w-full font-normal"
            name="numero"
            value={fornecedor.numero || ""}
            onChange={handleInputChange}
          />
        </label>
        <label className="bg-gray-300 p-2 rounded-md font-semibold text-lg">
          Complemento:
          <input
            className="p-1 bg-gray-200 rounded-md w-full font-normal"
            name="complemento"
            value={fornecedor.complemento || ""}
            onChange={handleInputChange}
          />
        </label>
        <label className="bg-gray-300 p-2 rounded-md font-semibold text-lg">
          Estado:
          <select
            className="p-1 bg-gray-200 rounded-md w-full font-normal h-[36px]"
            name="estado"
            onChange={handleInputChange}
          >
            {estados.map((estado) => (
              <option key={estado.sigla} value={fornecedor.estado}>
                {estado.nome}
              </option>
            ))}
          </select>
        </label>
        <label className="bg-gray-300 p-2 rounded-md font-semibold text-lg">
          Cidade:
          <input
            className="p-1 bg-gray-200 rounded-md w-full font-normal"
            name="cidade"
            value={fornecedor.cidade || ""}
            onChange={handleInputChange}
          />
        </label>
        <label className="bg-gray-300 p-2 rounded-md font-semibold text-lg col-span-2">
          Notas:
          <textarea
            className="p-1 bg-gray-200 rounded-md w-full font-normal h-[100px]"
            name="notas"
            value={fornecedor.notas || ""}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div className="flex justify-between mt-2 items-center">
        <label className="bg-gray-300 p-2 rounded-md font-semibold text-lg">
          Status:
          <select
            name="ativo"
            className="p-1 bg-gray-200 rounded-md w-full font-normal h-[36px]"
            value={fornecedor.ativo}
            onChange={handleInputChange}
          >
            <option value="true">Ativo</option>
            <option value="false">Inativo</option>
          </select>
        </label>
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded h-[45px]"
        >
          Salvar
        </button>
      </div>
    </form>
  );
}

export default FormEdicaoFornecedor;
