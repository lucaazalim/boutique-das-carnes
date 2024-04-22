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
        <form
          onSubmit={handleSubmit}
          className="w-[calc(100vw-35%)] bg-white p-8 rounded-md grid grid-cols-2 gap-2"
        >
          <h1 className="text-4xl font-semibold mb-2 col-span-2">
            Criar Funcionário
          </h1>
          <label className="bg-gray-300 p-2 rounded-md text-lg">
            Tipo de pessoa:
            <select
              className="p-1 bg-gray-200 rounded-md w-full"
              name="tipo"
              required
              onChange={handleChange}
            >
              <option value="PF" defaultValue>
                Pessoa Física
              </option>
              <option value="PJ">Pessoa Jurídica</option>
            </select>
          </label>
          {formData.tipo === "PF" ? (
            <>
              <label className="bg-gray-300 p-2 rounded-md text-lg">
                CPF:
                <input
                  className="p-1 bg-gray-200 rounded-md w-full"
                  required
                  pattern="[0-9]{11}"
                  name="cpf"
                  value={formData.pessoa.cpf}
                  onChange={handleChange}
                  placeholder="CPF"
                />
              </label>
              <label className="bg-gray-300 p-2 rounded-md text-lg">
                Nome:
                <input
                  className="p-1 bg-gray-200 rounded-md w-full"
                  required
                  name="nome"
                  value={formData.pessoa.nome}
                  onChange={handleChange}
                  placeholder="Nome"
                />
              </label>
            </>
          ) : (
            <>
              <label className="bg-gray-300 p-2 rounded-md text-lg">
                CNPJ:
                <input
                  className="p-1 bg-gray-200 rounded-md w-full"
                  required
                  pattern="[0-9]{14}"
                  name="cnpj"
                  value={formData.pessoa.cnpj}
                  onChange={handleChange}
                  placeholder="CNPJ"
                />
              </label>
              <label className="bg-gray-300 p-2 rounded-md text-lg">
                Razão Social:
                <input
                  className="p-1 bg-gray-200 rounded-md w-full"
                  required
                  name="razao_social"
                  value={formData.pessoa.razao_social}
                  onChange={handleChange}
                  placeholder="Razão Social"
                />
              </label>
              <label className="bg-gray-300 p-2 rounded-md text-lg">
                Nome Fantasia:
                <input
                  className="p-1 bg-gray-200 rounded-md w-full"
                  name="nome_fantasia"
                  value={formData.pessoa.nome_fantasia}
                  onChange={handleChange}
                  placeholder="Nome Fantasia"
                />
              </label>
            </>
          )}
          <label className="bg-gray-300 p-2 rounded-md text-lg">
            Email:
            <input
              className="p-1 bg-gray-200 rounded-md w-full"
              type="email"
              name="email"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}"
              value={formData.email}
              onChange={handleChange}
              placeholder="E-mail"
            />
          </label>
          <label className="bg-gray-300 p-2 rounded-md text-lg">
            Telefone:
            <input
              className="p-1 bg-gray-200 rounded-md w-full"
              name="telefone"
              type="tel"
              maxLength={11}
              value={formData.telefone}
              onChange={handleChange}
              placeholder="Telefone"
            />
          </label>
          <label className="bg-gray-300 p-2 rounded-md text-lg">
            Celular:
            <input
              className="p-1 bg-gray-200 rounded-md w-full"
              name="celular"
              value={formData.celular}
              onChange={handleChange}
              placeholder="Celular"
            />
          </label>
          <label className="bg-gray-300 p-2 rounded-md text-lg">
            CEP:
            <input
              className="p-1 bg-gray-200 rounded-md w-full"
              required
              name="cep"
              value={formData.cep}
              onChange={handleChange}
              placeholder="CEP"
            />
          </label>
          <label className="bg-gray-300 p-2 rounded-md text-lg">
            Logradouro:
            <input
              className="p-1 bg-gray-200 rounded-md w-full"
              required
              name="logradouro"
              value={formData.logradouro}
              onChange={handleChange}
              placeholder="Logradouro"
            />
          </label>
          <label className="bg-gray-300 p-2 rounded-md text-lg">
            Bairro:
            <input
              className="p-1 bg-gray-200 rounded-md w-full"
              required
              name="bairro"
              value={formData.bairro}
              onChange={handleChange}
              placeholder="Bairro"
            />
          </label>
          <label className="bg-gray-300 p-2 rounded-md text-lg">
            Número:
            <input
              className="p-1 bg-gray-200 rounded-md w-full"
              name="numero"
              value={formData.numero}
              onChange={handleChange}
              placeholder="Número"
            />
          </label>
          <label className="bg-gray-300 p-2 rounded-md text-lg">
            Complemento:
            <input
              className="p-1 bg-gray-200 rounded-md w-full"
              name="complemento"
              value={formData.complemento}
              onChange={handleChange}
              placeholder="Complemento"
            />
          </label>
          <label className="bg-gray-300 p-2 rounded-md text-lg">
            Estado:
            <select
              className="p-1 bg-gray-200 rounded-md w-full"
              name="estado"
              onChange={(e) => handleChange(e)}
              required
            >
              {estados.map((estado) => (
                <option key={estado.sigla} value={estado.sigla}>
                  {estado.nome}
                </option>
              ))}
            </select>
          </label>
          <label className="bg-gray-300 p-2 rounded-md text-lg">
            Cidade:
            <input
              className="p-1 bg-gray-200 rounded-md w-full"
              required
              name="cidade"
              value={formData.cidade}
              onChange={handleChange}
              placeholder="Cidade"
            />
          </label>
          <label className="bg-gray-300 p-2 rounded-md text-lg col-span-2">
            Notas:
            <textarea
              className="p-1 bg-gray-200 rounded-md w-full"
              name="notas"
              value={formData.notas}
              onChange={handleChange}
              placeholder="Notas"
            />
          </label>
          <div className="flex justify-between col-span-2">
            <button
              className="bg-red-500 text-white p-2 rounded-md"
              onClick={(e) => {
                e.preventDefault();
                setIsOpen(!isOpen);
              }}
            >
              Cancelar
            </button>
            <button
              className="bg-green-500 text-white p-2 rounded-md"
              type="submit"
            >
              Criar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ModalCriarFornecedor;
