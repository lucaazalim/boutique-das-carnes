import React from "react";

function BtnBack() {
  return (
    <button
      className="p-2 rounded-md text-white bg-gray-400 hover:bg-gray-500 absolute bottom-5 left-[140px] shadow-lg"
      onClick={() => window.history.back()}
    >
      Voltar
    </button>
  );
}

export default BtnBack;
