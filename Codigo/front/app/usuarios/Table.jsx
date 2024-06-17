import Link from "next/link";
import React, {useState} from "react";
import ModalConf from "./ModalConf";
import {FaEdit} from "react-icons/fa";
import {FaTrash} from "react-icons/fa6";

export default function Table({usuarios}) {

    const apagarUsuario = async (idUsuario) => {
        try {
            const response = await fetch(
                `http://localhost:3001/usuarios/${idUsuario}`,
                {
                    method: "DELETE",
                    redirect: "follow",
                }
            );
            if (response.ok) {
                alert("Usuário apagado com sucesso!");
                window.location.reload();
            } else {
                alert("Falha ao apagar usuário.");
                console.error("Falha ao apagar usuário.");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Usuario</th>
                    <th>Nome</th>
                    <th>Cargo</th>
                    <th>Opções</th>
                </tr>
                </thead>
                <tbody>
                {usuarios && usuarios.map((usuario) =>
                    <tr key={usuario.id}>
                        <td>{usuario.id}</td>
                        <td>{usuario.usuario}</td>
                        <td>{usuario.nome}</td>
                        <td>{usuario.cargo}</td>
                        <td className="flex justify-center gap-1">
                            <Link href={`usuarios/${usuario.id}`}>
                                <button className="p-2 rounded-md text-white bg-blue-500 hover:bg-blue-600">
                                    <FaEdit/>
                                </button>
                            </Link>
                            <button
                                className="p-2 rounded-md text-white bg-red-500 hover:bg-red-600"
                                onClick={() => apagarUsuario(usuario.id)}
                            >
                                <FaTrash/>
                            </button>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
}
