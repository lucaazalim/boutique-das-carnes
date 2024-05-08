import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Navbar() {
    return (
        <nav className='grid grid-cols-3 p-4 bg-[#77302E]'>
            <div></div>
            <div className='flex justify-center'>
                <Link href='/'>
                    <Image alt='' src='/logo.png' width={100} height={100} priority/>
                </Link>
            </div>
            <div></div>
        </nav>
    )
}

export default Navbar