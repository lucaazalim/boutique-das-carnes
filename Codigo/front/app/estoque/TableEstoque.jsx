import Link from "next/link";
import React from "react";
import {FaArrowUpRightFromSquare} from "react-icons/fa6";

export default function TableResumo({estoque}) {
    return <table>
        <thead>
        <tr>
            {/* <th>ID da compra</th> */}
            <th>Tipo</th>
            <th>Compra</th>
        </tr>
        </thead>
        <tbody>
        {estoque && estoque.map((item) =>
            <tr key={item.id}>
                {/* <td>{item.id_compra_carcaca}</td> */}
                <td>{item.tipo}</td>
                <td>
                    <div className="flex justify-center">
                        <Link
                            className="text-blue-500"
                            href={`/compras/${item.id_compra_carcaca}`}
                        >
                            <FaArrowUpRightFromSquare/>
                        </Link>
                    </div>
                </td>
            </tr>
        )}
        </tbody>
    </table>;
}