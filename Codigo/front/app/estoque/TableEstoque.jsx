import Link from "next/link";
import React from "react";
import {FaArrowUpRightFromSquare} from "react-icons/fa6";

function TableResumo({estoque}) {
    return (
        <div className="border-2 border-gray-200 rounded-md">
            <table className="w-full table-auto">
                <thead className="h-10 bg-gray-200">
                <tr>
                    <th>Letra</th>
                    <th>Tipo</th>
                    <th>Compra</th>
                </tr>
                </thead>
                <tbody>
                {estoque && estoque.map((item) =>
                    <tr key={item.id} className="text-center">
                        <td className="py-2">
                            {item.id_compra_carcaca}
                        </td>
                        <td>{item.tipo}</td>
                        <td className="flex justify-center py-2">
                            <Link
                                className="text-blue-500"
                                href={`/compras/${item.id_compra_carcaca}`}
                            >
                                <FaArrowUpRightFromSquare/>
                            </Link>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
}

export default TableResumo;
