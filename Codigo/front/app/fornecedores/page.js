"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Table from "../components/Table";
import InputMask from "react-input-mask";

export const estados = [
  { sigla: "AC", nome: "Acre" },
  { sigla: "AL", nome: "Alagoas" },
  { sigla: "AP", nome: "Amapá" },
  { sigla: "AM", nome: "Amazonas" },
  { sigla: "BA", nome: "Bahia" },
  { sigla: "CE", nome: "Ceará" },
  { sigla: "DF", nome: "Distrito Federal" },
  { sigla: "ES", nome: "Espírito Santo" },
  { sigla: "GO", nome: "Goiás" },
  { sigla: "MA", nome: "Maranhão" },
  { sigla: "MT", nome: "Mato Grosso" },
  { sigla: "MS", nome: "Mato Grosso do Sul" },
  { sigla: "MG", nome: "Minas Gerais" },
  { sigla: "PA", nome: "Pará" },
  { sigla: "PB", nome: "Paraíba" },
  { sigla: "PR", nome: "Paraná" },
  { sigla: "PE", nome: "Pernambuco" },
  { sigla: "PI", nome: "Piauí" },
  { sigla: "RJ", nome: "Rio de Janeiro" },
  { sigla: "RN", nome: "Rio Grande do Norte" },
  { sigla: "RS", nome: "Rio Grande do Sul" },
  { sigla: "RO", nome: "Rondônia" },
  { sigla: "RR", nome: "Roraima" },
  { sigla: "SC", nome: "Santa Catarina" },
  { sigla: "SP", nome: "São Paulo" },
  { sigla: "SE", nome: "Sergipe" },
  { sigla: "TO", nome: "Tocantins" },
];

export default function Home() {
  const [pesquisa, setPesquisa] = useState(null);
  const [fornecedores, setFornecedores] = useState([]);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [idEditar, setIdEditar] = useState("");
  const router = useRouter();

  const headers = [
    "ID",
    "Tipo",
    "CPF ou CNPJ",
    "Razão Social ou Nome",
    "Editar",
  ];

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
      setOpen(!open);
    } catch (error) {
      console.error("Erro ao inserir dado no banco");
    }
  };

  useEffect(() => {
    fetch(
      `http://localhost:3001/fornecedores${
        page ? `?page=${page}&page_size=15` : ""
      }${pesquisa ? `&search=${encodeURI(pesquisa)}` : ""}`
    )
      .then((res) => res.json())
      .then((data) => setFornecedores(data))
      .catch((e) => console.error("Erro ao solicitar os dados: " + e));
  }, [page, pesquisa]);

  return (
    <>
      {/* Tela de consulta de fornecedores */}
      <div className="p-5">
        <h1 className="text-4xl font-semibold">Consultar fornecedores</h1>
        <div className="py-4 grid grid-cols-4 mt-3 gap-4">
          <input
            onChange={(e) => setPesquisa(e.target.value)}
            className="col-span-3 bg-[#d9d9d9] rounded-md p-2 border-0"
            placeholder="Pesquise o ID do fornecedor"
          />
          <button
            onClick={() => setOpen(!open)}
            className="col-span-1 flex justify-center bg-[#06BD18] hover:bg-[#2edb3f] p-2 rounded-md
                               text-white font-semibold"
          >
            Criar novo fornecedor
          </button>
        </div>
        <Table headers={headers} data={{ fornecedores }} />
      </div>

      {/* Modal de criação de fornecedor */}
      <div
        className={
          (open ? `` : `hidden`) +
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
                  <InputMask
                    className="text-lg p-2 bg-gray-300 rounded-md"
                    required
                    name="cpf"
                    value={formData.pessoa.cpf}
                    onChange={handleChange}
                    placeholder="CPF"
                    mask={"999.999.999-99"}
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
                  <InputMask
                    className="text-lg p-2 bg-gray-300 rounded-md"
                    required
                    name="cnpj"
                    value={formData.pessoa.cnpj}
                    onChange={handleChange}
                    placeholder="CNPJ"
                    mask={"99.999.999/9999-99"}
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
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="E-mail"
              />
              <InputMask
                className="text-lg p-2 bg-gray-300 rounded-md"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                placeholder="Telefone"
                mask={"(99) 9999-9999"}
              />
              <InputMask
                className="text-lg p-2 bg-gray-300 rounded-md"
                name="celular"
                value={formData.celular}
                onChange={handleChange}
                placeholder="Celular"
                mask={"(99) 99999-9999"}
              />
              <InputMask
                className="text-lg p-2 bg-gray-300 rounded-md"
                required
                name="cep"
                value={formData.cep}
                onChange={handleChange}
                placeholder="CEP"
                mask={"99999-999"}
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
                  setOpen(!open);
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

      {/* Paginação */}
      <div className="absolute right-[140px] bottom-5 w-[150px] h-[60px] rounded bg-gray-500">
        <div className="flex justify-around items-center h-full font-bold text-white">
          <button
            onClick={() => setPage(page - 1)}
            className="w-[40px] h-[40px] rounded-full flex justify-center items-center"
          >
            {"<"}
          </button>
          <span className="px-3">{page}</span>
          <button
            onClick={() => setPage(page + 1)}
            className="w-[40px] h-[40px] rounded-full flex justify-center items-center"
          >
            {">"}
          </button>
        </div>
      </div>

      {/* // Botão de voltar */}
      <Link
        href="/dashboard"
        className="flex justify-center w-[80px] p-2 bg-slate-400 rounded-md absolute bottom-5 left-[140px] text-white"
      >
        Voltar
      </Link>
    </>
  );
}
