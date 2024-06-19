"use client";

import React, {useEffect, useState} from "react";
import Pagination from "../components/Pagination";
import ModalCriar from "./ModalCriar";
import Table from "./Table";

function Page() {
    const [openModal, setOpenModal] = useState(false);
    const [pedidos, setPedidos] = useState([]);
    const [search, setsearch] = useState("");
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetch(`http://localhost:3001/pedidos${page ? `?page=${page}&page_size=11` : ""}`)
            .then((response) => response.json())
            .then((data) => setPedidos(data))
            .catch((error) => console.error(error));
    }, [page]);

    return (
        <div>
            <h1 className="text-4xl font-semibold">Pedidos</h1>
            <div className="mt-5 grid grid-cols-9 gap-2">
                <input
                    type="text"
                    placeholder="Procure pelo ID do pedido"
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
                    Criar Pedido
                </button>
            </div>

            <div className="mt-5">
                <Table pedidos={pedidos}/>
            </div>
            <ModalCriar open={openModal} setOpen={setOpenModal}/>
            <Pagination page={page} setPage={setPage}/>
        </div>
    );
}

export default Page;
