import React from "react";

const ModalEditarContato = ({
  open,
  setOpen,
  contatoEditar,
  setContatoEditar,
}) => {
  const handleEditarContato = async (e) => {
    e.preventDefault();
    try {
      fetch(`http://localhost:3001/fornecedores/contatos/${contatoEditar.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contatoEditar),
      });
      setOpen(!open);
      alert("Contato editado com sucesso!");
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setContatoEditar((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div
      className={
        (open ? `` : `hidden`) +
        ` fixed inset-0 bg-zinc-600/50 backdrop-blur-sm bg-opacity-75 flex items-center justify-center z-50`
      }
    >
      <div className="h-[calc(100vh-70%)] w-[calc(100vw-25%)] bg-white p-2 rounded-md">
        <div>
          <form onSubmit={handleEditarContato}>
            <div className="grid grid-cols-3 gap-2">
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
  );
}

export default ModalEditarContato;
