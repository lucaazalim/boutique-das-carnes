'use client';

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Sidebar from "@/app/components/Sidebar";
import {FaChevronLeft, FaChevronRight} from "react-icons/fa6";

function Navbar() {
    return (
        <nav className='bg-primary'>
            <div className='container mx-auto h-24 pt-4'>
                <div className='absolute top-5'>
                    <div className="flex gap-2">
                        <Sidebar/>
                        <button onClick={() => window.history.back()}
                                className="p-4 text-xl bg-secondary text-white rounded hover:scale-105 transition-transform z-10">
                            <FaChevronLeft/>
                        </button>
                        <button onClick={() => window.history.forward()}
                                className="p-4 text-xl bg-secondary text-white rounded hover:scale-105 transition-transform z-10">
                            <FaChevronRight/>
                        </button>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <Link href='/'>
                        <Image className="hover:scale-105 transition-transform" alt='' src='/logo.png' width={150}
                               height={100} priority/>
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar