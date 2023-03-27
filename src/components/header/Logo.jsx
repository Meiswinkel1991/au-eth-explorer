import React from "react"
import Image from "next/image"
import Link from "next/link"

const Logo = () => {
    return (
        <Link href="/" className="flex  items-end text-3xl ">
            <h1 className="font-bold text-4xl text-blue-900 ">3</h1>

            <h1 className="font-bold text-slate-50">xplorer</h1>
        </Link>
    )
}

export default Logo
