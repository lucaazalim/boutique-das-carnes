"use client"

import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <nav className="h-[120px] items-center flex justify-between bg-[#792e2e] px-4">
            <div className="flex sm:none md:w-1/3"></div>
            <div className="flex md:justify-center md:w-1/3 w-1/2">
                <Image src="/Logo.png" alt="" width={120} height={120} priority={true} />
            </div>
            <div className="flex justify-end md:w-1/3 w-1/2 font-semibold cursor-pointer" onClick={() => {
                setOpen(!open);
            }}>
                <p className="text-white">Administrador</p>
            </div>
        </nav>
    );
}