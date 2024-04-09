"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");
    const router = useRouter();

    const usuarios = [
        {
            id: 1,
            usuario: "admin",
            nome: "Administrador",
            email: "",
            cargo: "administrador",
            senha: "admin",
        },
        {
            id: 2,
            usuario: "gerente",
            nome: "Gerente",
            email: "",
            cargo: "gerente",
            senha: "gerente",
        },
    ];

    function handleSubmit(e) {
        e.preventDefault();
        if (usuarios.some((u) => u.usuario === usuario && u.senha === senha)) {
            setOpen(false);
            router.push("/dashboard");
        }
    }

    return (
        <nav className="h-[120px] items-center flex justify-between bg-[#792e2e] px-4">
            <div className="flex sm:none md:w-1/3"></div>
            <div className="flex md:justify-center md:w-1/3 w-1/2">
                <a href="/">
                    <Image
                        src="/Logo.png"
                        alt=""
                        width={120}
                        height={120}
                        priority={true}
                    />
                </a>
            </div>
            <div className="flex justify-end md:w-1/3 w-1/2 font-semibold">
                <div className="text-white cursor-pointer">
                    {/* {props.cargo ? (
            `${(<p>{props.cargo}</p>)}`
          ) : (
            <p onClick={() => setOpen(!open)}>Faça o login</p>
          )} */}
                    <p onClick={() => setOpen(!open)}>Faça o login</p>
                </div>
            </div>
            {open && (
                <div className="absolute top-[120px] right-0 bg-gray-200 p-4 rounded-bl-md">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Usuário"
                            className="border border-gray-400 mr-2 p-2 rounded-md"
                            onChange={(e) => setUsuario(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Senha"
                            className="border border-gray-400 mr-2 p-2 rounded-md"
                            onChange={(e) => setSenha(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="bg-[#792e2e] text-white mr-2 p-2 rounded-md"
                        >
                            Entrar
                        </button>
                    </form>
                </div>
            )}
        </nav>
    );
}
