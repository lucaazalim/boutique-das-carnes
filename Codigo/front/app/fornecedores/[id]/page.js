"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { estados } from "../page";

export default function Page({ params }) {
  const [fornecedor, setFornecedor] = useState({});
  const [contatos, setContatos] = useState([]);
  const [contatoEditar, setContatoEditar] = useState([]);
  const [contatoCriar, setContatoCriar] = useState({
    nome: "",
    celular: "",
    cargo: "",
  });
  const [idEditar, setIdEditar] = useState(0);
  const [open, setOpen] = useState(false);
  const [criarOpen, setCriarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch(`http://localhost:3001/fornecedores/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setFornecedor(data);
        setContatos(data.contatos);
      })
      .catch((e) => console.error("Erro ao solicitar os dados: " + e));
  }, [params.id]);

  useEffect(() => {
    setContatoEditar(contatos[idEditar - 1]);
  }, [contatos, idEditar]);

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

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setContatoEditar((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(value);
  };

  const handleCriarChange = (e) => {
    const { name, value } = e.target;
    setContatoCriar((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCriarContato = async (e) => {
    console.log(contatoCriar);
    try {
      const res = await fetch(
        `http://localhost:3001/fornecedores/${params.id}/contatos`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contatoCriar),
          redirect: "follow",
        }
      );
      alert("Fornecedor criado com sucesso!");
      setCriarOpen(!criarOpen);
      router.push("/fornecedores");
    } catch (error) {
      console.error("Erro ao inserir dado no banco");
    }
  };

  const handleSubmit = async (e) => {
    try {
      const res = await fetch(
        `http://localhost:3001/fornecedores/${params.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(fornecedor),
          redirect: "follow",
        }
      );
      alert("Fornecedor alterado com sucesso!");
      router.push("/fornecedores");
    } catch (error) {
      console.error("Erro ao editar fornecedor");
    }
  };

  const handleEditarContato = async (e) => {
    try {
      const res = await fetch(
        `http://localhost:3001/fornecedores/contatos/${idEditar}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contatoEditar),
          redirect: "follow",
        }
      );
      setOpen(!open);
      alert("Contato editado com sucesso!");
      router.push("/fornecedores");
    } catch (error) {
      console.error("Erro ao editar contato");
    }
  };

  function handleDeleteContato(id) {
    fetch(`http://localhost:3001/fornecedores/contatos/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        setContatos(contatos.filter((contato) => contato.id !== id));
        alert("Contato deletado com sucesso!");
        router.refresh();
      })
      .catch((e) => console.error("Erro ao deletar contato: " + e));
  }

  return (
    <>
      <div className="p-5">
        <h1 className="text-4xl font-semibold">Editar fornecedor</h1>

        {/* Formulário de edição de fornecedor */}
        <form onSubmit={handleSubmit}>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {fornecedor.tipo === "PF" && (
              <>
                <div className="p-2 bg-gray-200 rounded-md align-middle">
                  <label className="text-align-center font-semibold text-lg">
                    Nome:{" "}
                  </label>
                  <input
                    className="text-lg bg-gray-200 rounded-md w-full"
                    name="nome"
                    value={fornecedor.pessoa.nome || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="p-2 bg-gray-200 rounded-md align-middle">
                  <label className="text-align-center font-semibold text-lg text-gray-400">
                    CPF:{" "}
                  </label>
                  <input
                    className="text-lg bg-gray-200 rounded-md w-full text-gray-400 cursor-default"
                    name="cpf"
                    value={fornecedor.pessoa.cpf || ""}
                    readOnly
                    onChange={handleInputChange}
                  />
                </div>
              </>
            )}
            {fornecedor.tipo === "PJ" && (
              <>
                <div className="p-2 bg-gray-200 rounded-md align-middle">
                  <label className="text-align-center font-semibold text-lg text-gray-400">
                    CNPJ:{" "}
                  </label>
                  <input
                    className="text-lg bg-gray-200 rounded-md w-full text-gray-400 cursor-default"
                    name="nome"
                    value={fornecedor.pessoa.cnpj || ""}
                    readOnly
                    onChange={handleInputChange}
                  />
                </div>
                <div className="p-2 bg-gray-200 rounded-md align-middle">
                  <label className="text-align-center font-semibold text-lg">
                    Razao Social:{" "}
                  </label>
                  <input
                    className="text-lg bg-gray-200 rounded-md w-full"
                    name="razao_social"
                    value={fornecedor.pessoa.razao_social || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="p-2 bg-gray-200 rounded-md align-middle">
                  <label className="text-align-center font-semibold text-lg">
                    Nome Fantasia:{" "}
                  </label>
                  <input
                    className="text-lg bg-gray-200 rounded-md w-full"
                    name="nome_fantasia"
                    value={fornecedor.pessoa.nome_fantasia || ""}
                    onChange={handleInputChange}
                  />
                </div>
              </>
            )}
            <div className="p-2 bg-gray-200 rounded-md align-middle">
              <label className="text-align-center font-semibold text-lg">
                Email:{" "}
              </label>
              <input
                className="text-lg bg-gray-200 rounded-md w-full"
                name="email"
                value={fornecedor.email || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="p-2 bg-gray-200 rounded-md align-middle">
              <label className="text-align-center font-semibold text-lg">
                Telefone:{" "}
              </label>
              <input
                className="text-lg bg-gray-200 rounded-md w-full"
                name="telefone"
                value={fornecedor.telefone || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="p-2 bg-gray-200 rounded-md align-middle">
              <label className="text-align-center font-semibold text-lg">
                Celular:{" "}
              </label>
              <input
                className="text-lg bg-gray-200 rounded-md w-full"
                name="celular"
                value={fornecedor.celular || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="p-2 bg-gray-200 rounded-md align-middle">
              <label className="text-align-center font-semibold text-lg">
                CEP:{" "}
              </label>
              <input
                className="text-lg bg-gray-200 rounded-md w-full"
                name="cep"
                value={fornecedor.cep || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="p-2 bg-gray-200 rounded-md align-middle">
              <label className="text-align-center font-semibold text-lg">
                Logradouro:{" "}
              </label>
              <input
                className="text-lg bg-gray-200 rounded-md w-full"
                name="logradouro"
                value={fornecedor.logradouro || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="p-2 bg-gray-200 rounded-md align-middle">
              <label className="text-align-center font-semibold text-lg">
                Bairro:{" "}
              </label>
              <input
                className="text-lg bg-gray-200 rounded-md w-full"
                name="bairro"
                value={fornecedor.bairro || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="p-2 bg-gray-200 rounded-md align-middle">
              <label className="text-align-center font-semibold text-lg">
                Número:{" "}
              </label>
              <input
                className="text-lg bg-gray-200 rounded-md w-full"
                name="numero"
                value={fornecedor.numero || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="p-2 bg-gray-200 rounded-md align-middle">
              <label className="text-align-center font-semibold text-lg">
                Complemento:{" "}
              </label>
              <input
                className="text-lg bg-gray-200 rounded-md w-full"
                name="complemento"
                value={fornecedor.complemento || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="p-2 bg-gray-200 rounded-md align-middle">
              <label className="text-align-center font-semibold text-lg">
                Estado:{" "}
              </label>
              <select
                onChange={handleInputChange}
                name="estado"
                className="text-lg bg-gray-200 rounded-md w-full"
              >
                {estados.map((estado) => (
                  <option key={estado.sigla} value={fornecedor.estado}>
                    {estado.nome}
                  </option>
                ))}
              </select>
            </div>
            <div className="p-2 bg-gray-200 rounded-md align-middle">
              <label className="text-align-center font-semibold text-lg">
                Cidade:{" "}
              </label>
              <input
                className="text-lg bg-gray-200 rounded-md w-full"
                name="cidade"
                value={fornecedor.cidade || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="p-2 bg-gray-200 rounded-md align-middle col-span-2">
              <label className="text-align-center font-semibold text-lg">
                Notas:{" "}
              </label>
              <textarea
                className="text-lg bg-gray-200 rounded-md w-full"
                name="notas"
                value={fornecedor.notas || ""}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="flex justify-between mt-2">
            <div className="text-lg p-2 bg-gray-200 rounded-md">
              <label>Status: </label>
              <select
                name="ativo"
                className="bg-gray-200 rounded-md"
                value={fornecedor.ativo}
                onChange={handleInputChange}
              >
                <option value="true">Ativo</option>
                <option value="false">Inativo</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Salvar
            </button>
          </div>
        </form>

        {/* Lista de contatos */}
        <div className="mt-2 mb-[60px]">
          <h1 className="text-4xl font-semibold">Contatos</h1>
          {contatos &&
            contatos.map((contato) => {
              return (
                <div key={contato.id} className="mt-2 grid grid-cols-11 gap-2">
                  <input
                    className="text-lg p-2 bg-gray-200 rounded-md col-span-3"
                    name="nome"
                    value={contato.nome || ""}
                    onChange={handleInputChange}
                    disabled
                    placeholder="Nome"
                  />
                  <input
                    className="text-lg p-2 bg-gray-200 rounded-md col-span-3"
                    name="celular"
                    value={contato.celular || ""}
                    onChange={handleInputChange}
                    disabled
                    placeholder="Celular"
                  />
                  <input
                    className="text-lg p-2 bg-gray-200 rounded-md col-span-3"
                    name="cargo"
                    value={contato.cargo || ""}
                    onChange={handleInputChange}
                    disabled
                    placeholder="Cargo"
                  />
                  <button
                    className="col-span-1 bg-red-600 hover:bg-red-500 rounded-md font-semibold text-white"
                    onClick={() => {
                      handleDeleteContato(contato.id);
                    }}
                  >
                    Deletar
                  </button>
                  <button
                    className="col-span-1 bg-yellow-400 hover:bg-yellow-300 rounded-md"
                    onClick={() => {
                      setOpen(!open);
                      setIdEditar(contato.id);
                    }}
                  >
                    Editar
                  </button>
                </div>
              );
            })}
          <div className="mt-2 flex justify-center">
            <button
              className="bg-green-400 hover:bg-green-300 rounded-md p-2"
              onClick={() => setCriarOpen(!criarOpen)}
            >
              Criar contato
            </button>
          </div>
        </div>

        {/* Modal de criação de contato */}
        <div
          className={
            (criarOpen ? `` : `hidden`) +
            ` fixed inset-0 bg-zinc-600/50 backdrop-blur-sm bg-opacity-75 flex items-center justify-center z-50`
          }
        >
          <div className="h-[calc(100vh-70%)] w-[calc(100vw-25%)] bg-white p-2 rounded-md">
            <div>
              <form onSubmit={handleCriarContato}>
                <div className="grid grid-cols-3 gap-2">
                  <input
                    className="text-lg p-2 bg-gray-200 rounded-md col-span-3"
                    name="nome"
                    value={contatoCriar.nome || ""}
                    onChange={handleCriarChange}
                    placeholder="Nome"
                  />
                  <input
                    className="text-lg p-2 bg-gray-200 rounded-md col-span-3"
                    name="celular"
                    value={contatoCriar.celular || ""}
                    onChange={handleCriarChange}
                    placeholder="Celular"
                  />
                  <input
                    className="text-lg p-2 bg-gray-200 rounded-md col-span-3"
                    name="cargo"
                    value={contatoCriar.cargo || ""}
                    onChange={handleCriarChange}
                    placeholder="Cargo"
                  />
                </div>
                <div className="flex justify-between mt-[80px]">
                  <button
                    className="bg-[#9e1616] p-2 rounded-md text-white font-semibold"
                    onClick={(e) => {
                      e.preventDefault();
                      setCriarOpen(!criarOpen);
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
        </div>

        {/* Modal de edição de contato */}
        <div
          className={
            (open ? `` : `hidden`) +
            ` fixed inset-0 bg-zinc-600/50 backdrop-blur-sm bg-opacity-75 flex items-center justify-center z-50`
          }
        >
          <div className="h-[calc(100vh-70%)] w-[calc(100vw-25%)] bg-white p-2 rounded-md">
            <div>
              <form onSubmit={handleEditarContato}>
                {contatos &&
                  contatos.map((contato) => {
                    if (contato.id === idEditar) {
                      return (
                        <div key={contato.id} className="grid grid-cols-3 gap-2">
                          <input
                            className="text-lg p-2 bg-gray-200 rounded-md col-span-3"
                            name="nome"
                            value={contatoEditar.nome || ""}
                            onChange={handleEditChange}
                          />
                          <input
                            className="text-lg p-2 bg-gray-200 rounded-md col-span-3"
                            name="celular"
                            value={contatoEditar.celular || ""}
                            onChange={handleEditChange}
                          />
                          <input
                            className="text-lg p-2 bg-gray-200 rounded-md col-span-3"
                            name="cargo"
                            value={contatoEditar.cargo || ""}
                            onChange={handleEditChange}
                          />
                        </div>
                      );
                    }
                  })}
                <div className="flex justify-between mt-[80px]">
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
        </div>
      </div>
      
      {/* Botão de voltar */}
      <div className="absolute bottom-0 w-[calc(100vw-240px)] left-[120px] bg-white p-2">
        <Link
          href="/fornecedores"
          className="flex justify-center w-[80px] p-2 bg-slate-400 rounded-md text-white"
        >
          Voltar
        </Link>
      </div>
    </>
  );
}
