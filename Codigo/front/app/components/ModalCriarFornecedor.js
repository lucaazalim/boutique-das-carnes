"use client";

import React, { useState } from "react";
import { estados } from "../utils/estados";

function ModalCriarFornecedor({ isOpen, setIsOpen }) {
  const [formData, setFormData] = useState({
    tipo: "PF",
    pessoa: {},
    email: "",
    telefone: "",
    celular: "",
    cep: "",
    logradouro: "",
    bairro: "",
    numero: "",
    complemento: "",
    estado: "",
    cidade: "",
    ativo: true,
    notas: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify.formData);
    try {
      const res = await fetch("http://localhost:3001/fornecedores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        redirect: "follow",
      });
      alert("Fornecedor criado com sucesso!");
      setIsOpen(!isOpen);
    } catch (error) {
      console.error("Erro ao inserir dado no banco");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      const newFormData = { ...prevFormData };
      if (name === "tipo") {
        if (value === "PJ") {
          delete newFormData.pessoa.cpf;
          delete newFormData.pessoa.nome;
          newFormData.pessoa.cnpj = "";
          newFormData.pessoa.razao_social = "";
          newFormData.pessoa.nome_fantasia = "";
        } else if (value === "PF") {
          delete newFormData.pessoa.cnpj;
          delete newFormData.pessoa.razao_social;
          delete newFormData.pessoa.nome_fantasia;
          newFormData.pessoa.cpf = "";
          newFormData.pessoa.nome = "";
        }
      }
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

  return (
    <>
      <div
        className={
          (isOpen ? `` : `hidden`) +
          ` fixed inset-0 bg-zinc-800/80 backdrop-blur bg-opacity-75 flex items-center justify-center z-50`
        }
      >
        <div className="h-[calc(100vh-25%)] w-[calc(100vw-25%)] bg-white p-2 rounded-md">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-2 pb-2">
              <select
                className="text-lg p-2 bg-gray-300 rounded-md"
                name="tipo"
                required
                onChange={handleChange}
              >
                <option value="PF" defaultValue>
                  Pessoa Física
                </option>
                <option value="PJ">Pessoa Jurídica</option>
              </select>
              {formData.tipo === "PF" ? (
                <>
                  <input
                    className="text-lg p-2 bg-gray-300 rounded-md"
                    required
                    pattern="[0-9]{11}"
                    name="cpf"
                    value={formData.pessoa.cpf}
                    onChange={handleChange}
                    placeholder="CPF"
                  />
                  <input
                    className="text-lg p-2 bg-gray-300 rounded-md"
                    required
                    name="nome"
                    value={formData.pessoa.nome}
                    onChange={handleChange}
                    placeholder="Nome"
                  />
                </>
              ) : (
                <>
                  <input
                    className="text-lg p-2 bg-gray-300 rounded-md"
                    required
                    pattern="[0-9]{14}"
                    name="cnpj"
                    value={formData.pessoa.cnpj}
                    onChange={handleChange}
                    placeholder="CNPJ"
                  />
                  <input
                    className="text-lg p-2 bg-gray-300 rounded-md"
                    required
                    name="razao_social"
                    value={formData.pessoa.razao_social}
                    onChange={handleChange}
                    placeholder="Razão Social"
                  />
                  <input
                    className="text-lg p-2 bg-gray-300 rounded-md"
                    name="nome_fantasia"
                    value={formData.pessoa.nome_fantasia}
                    onChange={handleChange}
                    placeholder="Nome Fantasia"
                  />
                </>
              )}
              <input
                className="text-lg p-2 bg-gray-300 rounded-md"
                type="email"
                name="email"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}"
                value={formData.email}
                onChange={handleChange}
                placeholder="E-mail"
              />
              <input
                className="text-lg p-2 bg-gray-300 rounded-md"
                name="telefone"
                type="tel"
                maxLength={11}
                value={formData.telefone}
                onChange={handleChange}
                placeholder="Telefone"
              />
              <input
                className="text-lg p-2 bg-gray-300 rounded-md"
                name="celular"
                value={formData.celular}
                onChange={handleChange}
                placeholder="Celular"
              />
              <input
                className="text-lg p-2 bg-gray-300 rounded-md"
                required
                name="cep"
                value={formData.cep}
                onChange={handleChange}
                placeholder="CEP"
              />
              <input
                className="text-lg p-2 bg-gray-300 rounded-md"
                required
                name="logradouro"
                value={formData.logradouro}
                onChange={handleChange}
                placeholder="Logradouro"
              />
              <input
                className="text-lg p-2 bg-gray-300 rounded-md"
                required
                name="bairro"
                value={formData.bairro}
                onChange={handleChange}
                placeholder="Bairro"
              />
              <input
                className="text-lg p-2 bg-gray-300 rounded-md"
                name="numero"
                value={formData.numero}
                onChange={handleChange}
                placeholder="Número"
              />
              <input
                className="text-lg p-2 bg-gray-300 rounded-md"
                name="complemento"
                value={formData.complemento}
                onChange={handleChange}
                placeholder="Complemento"
              />
              <select
                className="text-lg p-2 bg-gray-300 rounded-md"
                name="estado"
                value={formData.estado}
                onChange={(e) => handleChange(e)}
                required
              >
                {estados.map((estado) => (
                  <option key={estado.sigla} value={estado.sigla}>
                    {" "}
                    {estado.nome}
                  </option>
                ))}
              </select>
              <input
                className="text-lg p-2 bg-gray-300 rounded-md"
                required
                name="cidade"
                value={formData.cidade}
                onChange={handleChange}
                placeholder="Cidade"
              />
              <textarea
                className="text-lg p-2 bg-gray-300 rounded-md col-span-2"
                name="notas"
                value={formData.notas}
                onChange={handleChange}
                placeholder="Notas"
              />
            </div>
            <div className="flex justify-between mt-[210px]">
              <button
                className="bg-[#9e1616] p-2 rounded-md text-white font-semibold"
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen(!isOpen);
                }}
              >
                Cancelar
              </button>
              <button
                className="bg-[#06BD18] p-2 rounded-md text-white font-semibold"
                type="submit"
              >
                Criar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ModalCriarFornecedor;
