"use client"

import {FaBars, FaChevronLeft, FaChevronRight} from "react-icons/fa6";

export default function BtnBack() {
    return <>
        <div className="flex gap-2">
            <button onClick={() => window.history.back()}
                    className="p-4 text-xl bg-secondary text-white rounded hover:scale-105 transition-transform z-10">
                <FaChevronLeft/>
            </button>
            <button onClick={() => window.history.forward()}
                    className="p-4 text-xl bg-secondary text-white rounded hover:scale-105 transition-transform z-10">
                <FaChevronRight/>
            </button>
        </div>
    </>;
}