import React from "react";

const ModalConf = ({ open, setOpen, idItem }) => {
  const apagarItem = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/pedidos/itens/${idItem}`,
        {
          method: "DELETE",
          redirect: "follow",
        }
      );
      if (response.ok) {
        console.log("Item apagado com sucesso");
      } else {
        console.error("Falha ao apagar item");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={`${
        open ? "" : "hidden"
      } fixed inset-0 z-10 bg-black bg-opacity-50 flex justify-center items-center`}
    >
      <div className="bg-white p-5 rounded-md w-1/4">
        <h1 className="text-2xl font-semibold">Confirmação</h1>
        <p className="mt-5">Deseja realmente apagar este item?</p>
        <div className="mt-5 flex justify-end">
          <button
            className="p-2 rounded-md text-white bg-red-500 hover:bg-red-600"
            onClick={() => {
              apagarItem();
              setOpen(!open);
              window.location.reload();
            }}
          >
            Apagar
          </button>
          <button
            className="ml-5 p-2 rounded-md text-white bg-gray-500 hover:bg-gray-600"
            onClick={(e) => {
              e.preventDefault();
              setOpen(!open);
            }}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConf;
