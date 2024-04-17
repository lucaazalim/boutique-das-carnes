import React from "react";

function Paginacao({ page, setPage }) {
  return (
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
  );
}

export default Paginacao;
