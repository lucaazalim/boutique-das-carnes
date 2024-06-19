"use client";

import Table from "./Table";
import Pagination from "../components/Pagination";
import ModalCriar from "./ModalCriar";
import { useEffect, useState } from "react";

function Page() {
    const [compras, setCompras] = useState([]);
    const [search, setsearch] = useState("");
    const [page, setPage] = useState(1);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        fetch(
            `http://localhost:3001/compras${
                page ? `?page=${page}&page_size=11` : ""
            }`
        )
            .then((response) => response.json())
            .then((data) => {
                setCompras(data);
            })
            .catch((error) => console.error(error));
    }, [page]);

    return (
        <div>
            <h1 className="text-4xl font-semibold">Consultar Compras</h1>
            <div className="mt-5 grid grid-cols-9 gap-2">
                <input
                    type="text"
                    placeholder="Procure pelo ID da compra"
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
                    Criar Compra
                </button>
            </div>

            <div className="mt-5">
                <Table compras={compras} />
            </div>
            <Pagination page={page} setPage={setPage} />
            <ModalCriar openModal={openModal} setOpenModal={setOpenModal} />
        </div>
    );
}

export default Page;
