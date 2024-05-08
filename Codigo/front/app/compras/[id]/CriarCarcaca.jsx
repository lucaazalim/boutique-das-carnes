import React, { useState } from "react";

function CriarCarcaca({ openCarcaca, setOpenCarcaca, idCompra }) {
  const [carcaca, setCarcaca] = useState({
    id_compra: idCompra,
    sequencial: null,
    carregado: false,
    peso_total: null,
  });

  function handleChange(e) {
    setCarcaca({ ...carcaca, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`http://localhost:3001/compras/${idCompra}/carcacas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(carcaca),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Carcaca criada com sucesso");
          setOpenCarcaca(false);
          window.location.reload();
        } else {
          console.error("Falha ao criar carcaca");
        }
      })
      .catch((error) => console.error(error));
  }

  return (
    <div className={`${openCarcaca ? "" : "hidden"}`}>
      <div className="fixed top-0 left-0 w-full h-full bg-zinc-800/70 z-50"></div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-5 z-50 max-h-[calc(100vh-20%)] rounded-md overflow-auto">
        <h1 className="text-2xl font-semibold">Criar Carcaça</h1>
        <form className="mt-5 grid grid-cols-2 gap-2" onSubmit={handleSubmit}>
          <label>
            Sequencial:
            <input
              type="number"
              name="sequencial"
              className="p-2 border-2 border-gray-200 rounded-md w-full"
              onChange={handleChange}
            />
          </label>
          <label>
            Peso Total:
            <input
              type="number"
              name="peso_total"
              className="p-2 border-2 border-gray-200 rounded-md w-full"
              onChange={handleChange}
            />
          </label>
          <label>
            Carregado:
            <select
              name="carregado"
              className="p-2 border-2 border-gray-200 rounded-md w-full"
              onChange={handleChange}
            >
              <option value="">Selecione</option>
              <option value="true">Sim</option>
              <option value="false">Não</option>
            </select>
          </label>
          <div className="col-span-2 flex justify-between">
            <button
              onClick={(e) => {
                e.preventDefault();
                setOpenCarcaca(false);
              }}
              className="bg-red-500 text-white p-2 rounded-md"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white p-2 rounded-md"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CriarCarcaca;
