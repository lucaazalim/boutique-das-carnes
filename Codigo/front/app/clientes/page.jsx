"use client";

import { useEffect, useState } from "react";
import Table from "./Table";
import Pagination from "../components/Pagination";
import ModalCriar from "./ModalCriar";

function Page() {
    const [clientes, setFornecedores] = useState([]);
    const [search, setsearch] = useState("");
    const [page, setPage] = useState(1);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        fetch(
            `http://localhost:3001/clientes${
                page ? `?page=${page}&page_size=11` : ""
            }`
        )
            .then((response) => response.json())
            .then((data) => setFornecedores(data))
            .catch((error) => console.error(error));
    }, [page]);

    return (
        <div>
            <h1 className="text-4xl font-semibold">Consultar Clientes</h1>
            <div className="mt-5 grid grid-cols-9 gap-2">
                <input
                    type="text"
                    placeholder="Procure pelo ID do cliente"
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
                    Criar Cliente
                </button>
            </div>

            <div className="mt-5">
                <Table clientes={clientes} />
            </div>
            <Pagination page={page} setPage={setPage} />
            <ModalCriar openModal={openModal} setOpenModal={setOpenModal} />
        </div>
    );
}

export default Page;
