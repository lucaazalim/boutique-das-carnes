"use client";

import {FaBars} from "react-icons/fa6";
import Dashboard from "@/app/components/Dashboard";

export default function Home() {
    return (
        <div className="mt-5">

            <div className="text-center mb-5">
                <div className="text-xl mb-5">
                    Seja bem-vindo ao sistema da <span className="font-bold">Boutique das Carnes</span>!
                </div>
                <span className="bg-gray-200 p-4 rounded-xl inline-block">
                    Clique no <FaBars className="text-xl inline-block"/> para iniciar a navegação.
                </span>
            </div>

            <h1 className="text-xl border-b-2 font-semibold mb-5">Dashboard</h1>
            <div>
                <Dashboard/>
            </div>

        </div>
    );
}