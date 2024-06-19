"use client";

import React from "react";
import Table from "./Table";
import ModalCriar from "./ModalCriar";
import Pagination from "../components/Pagination";

function Page() {
    const [catDespesas, setCatDespesas] = React.useState([]);
    const [openModal, setOpenModal] = React.useState(false);
    const [search, setsearch] = React.useState("");

    React.useEffect(() => {
        fetch(`http://localhost:3001/despesas-categorias`)
            .then((response) => response.json())
            .then((data) => {
                setCatDespesas(data);
            })
            .catch((error) => console.error(error));
    }, []);

    return (
        <div>
            <h1 className="text-4xl font-semibold">Categoria de Despesa</h1>
            <div className="mt-5 grid grid-cols-9 gap-2">
                <input
                    type="text"
                    placeholder="Procure pelo ID da categoria de despesa"
                    className="p-2 border-2 border-gray-200 rounded-md col-span-7"
                    value={search}
                    onChange={(e) => setsearch(e.target.value)}
                    disabled
                />
                <button
                    onClick={() => {
                        setOpenModal(!openModal);
                    }}
                    className="bg-green-500 text-white p-2 rounded-md col-span-2"
                >
                    Criar Categoria
                </button>
            </div>
            <div className="mt-5">
                <Table catDespesas={catDespesas}/>
            </div>
            <ModalCriar openModal={openModal} setOpenModal={setOpenModal}/>
            <Pagination/>
        </div>
    );
}

export default Page;
