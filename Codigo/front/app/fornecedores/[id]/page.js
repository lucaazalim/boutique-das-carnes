"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ListaContatos from "../../components/ListaContatos";
import FormEdicaoFornecedor from "../../components/FormEdicaoFornecedor";

export default function Page({ params }) {
  const [fornecedor, setFornecedor] = useState({});
  const [contatos, setContatos] = useState([]);
  const [contatoCriar, setContatoCriar] = useState({
    nome: "",
    celular: "",
    cargo: "",
  });
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

  return (
    <>
      <div className="mb-[60px]">
        <div className="p-5">
          <h1 className="text-4xl font-semibold">Editar fornecedor</h1>

          <FormEdicaoFornecedor
            fornecedor={fornecedor}
            setFornecedor={setFornecedor}
            id={params.id}
          />

          <h1 className="text-4xl font-semibold mt-[30px] pt-[20px] border-0 border-t-2 border-zinc-300">
            Contatos
          </h1>
          <ListaContatos contatos={contatos} setContatos={setContatos} />

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

          
        </div>
      </div>

      {/* Botão de voltar */}
      <Link
        href="/fornecedores"
        className="flex justify-center w-[80px] p-2 bg-slate-400 rounded-md absolute bottom-5 left-[140px] text-white shadow-xl"
      >
        Voltar
      </Link>
    </>
  );
}
