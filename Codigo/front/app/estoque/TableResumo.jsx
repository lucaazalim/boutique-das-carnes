import React from "react";

function TableResumo({resumo}) {
    return (
        <div className="">
            <table className="">
                <thead className="">
                <tr>
                    <th>Tipo</th>
                    <th>Quantidade</th>
                </tr>
                </thead>
                <tbody>
                {resumo && resumo.map(item =>
                    <tr key={item.tipo}>
                        <td>{item.tipo}</td>
                        <td>{item.quantidade}</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
}

export default TableResumo;
