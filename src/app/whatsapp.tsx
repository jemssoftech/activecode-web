import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Whatsapp = () => {

    return (
        <Link href={"https://wa.me/+917778887142"} target='_blank' rel="noopener noreferrer" className='fixed md:bottom-10 bottom-5 right-5 z-[10000] md:right-10 whatsapp' >
            <Image width={50} height={50} src={"/whatsapp_icon.webp"} alt='whatsapp' className={"size-[50px] shadow-xl"} />
        </Link>
    )
}

export default Whatsapp