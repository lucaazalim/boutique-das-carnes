"use client";

import React, { useState } from "react";
import ModalCriarDoc from "../components/ModalCriarDoc";
import Link from "next/link";

function Page() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="p-5">
        <button
          className="bg-blue-500 text-white p-2 rounded-md"
          onClick={() => setIsOpen(true)}
        >
          Criar documento
        </button>
      </div>
      <Link
        href="/dashboard"
        className="flex justify-center w-[80px] p-2 bg-slate-400 rounded-md absolute bottom-5 left-[140px] text-white"
      >
        Voltar
      </Link>
      <ModalCriarDoc isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}

export default Page;
