"use client";

import React from "react";
import Table from "./Table";
import ModalCriar from "./ModalCriar";
import Pagination from "../components/Pagination";

function Page() {
    const [search, setsearch] = React.useState("");
    const [despesas, setDespesas] = React.useState([]);
    const [openModal, setOpenModal] = React.useState(false);
    const [page, setPage] = React.useState(1);

    React.useEffect(() => {
        fetch(`http://localhost:3001/despesas${page ? `?page=${page}&page_size=11` : ""}`)
            .then((response) => response.json())
            .then((data) => {
                setDespesas(data);
            })
            .catch((error) => console.error(error));
    }, [page]);

    return (
        <div>
            <h1 className="text-4xl font-semibold">Consultar Despesas</h1>
            <div className="mt-5 grid grid-cols-9 gap-2">
                <input
                    type="text"
                    placeholder="Procure pelo ID da despesa"
                    className="p-2 border-2 border-gray-200 rounded-md col-span-7"
                    value={search}
                    onChange={(e) => setsearch(e.target.value)}
                    disabled
                />
                <button
                    onClick={() => {
                        setOpenModal(true);
                    }}
                    className="bg-green-500 text-white p-2 rounded-md col-span-2"
                >
                    Criar Despesa
                </button>
            </div>
            <div className="mt-5">
                <Table despesas={despesas}/>
            </div>
            <ModalCriar openModal={openModal} setOpenModal={setOpenModal}/>
            <Pagination page={page} setPage={setPage}/>
        </div>
    );
}

export default Page;
