"use client";

import Link from "next/link";
import BtnBack from "./components/BtnBack";
import {FaBars} from "react-icons/fa6";

export default function Home() {
    return (
        <div className="text-center mt-5">
            <div className="text-xl">
                Seja bem-vindo ao sistema da <span className="font-bold">Boutique das Carnes</span>!
            </div>
            <br />
            <span className="bg-gray-200 p-4 rounded-xl">
                Clique no <FaBars className="text-xl inline-block"/> para iniciar a navegação.
            </span>
        </div>
    );
}
