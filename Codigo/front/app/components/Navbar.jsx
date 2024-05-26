import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Sidebar from "@/app/components/Sidebar";

function Navbar() {
    return (
        <nav className='bg-primary'>
            <div className='container mx-auto h-24 pt-4'>
                <div className='absolute top-5'>
                    <Sidebar/>
                </div>
                <div className='flex justify-center'>
                    <Link href='/'>
                        <Image className="hover:scale-105 transition-transform" alt='' src='/logo.png' width={150} height={100} priority/>
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar