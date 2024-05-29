import React from "react";
import {FaArrowRight, FaArrowLeft} from "react-icons/fa";

function Pagination({page, setPage}) {
    return (
        <div
            className="absolute bottom-5 right-5 bg-gray-500 text-white w-[100px] h-10 grid grid-cols-3 rounded shadow-lg">
            {page <= 1 ? <div></div> : (
                <button onClick={() => setPage(page - 1)} className="p-2">
                    <FaArrowLeft/>
                </button>
            )}
            <span className="p-2 text-center">{page}</span>
            <button onClick={() => setPage(page + 1)} className="p-2">
                <FaArrowRight/>
            </button>
        </div>
    );
}

export default Pagination;
