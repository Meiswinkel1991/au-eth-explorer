import React from "react"
import Image from "next/image"
import Link from "next/link"

const Logo = () => {
    return (
        <Link href="/" className="flex flex-col items-start text-3xl space-x-2">
            <Image src="/au-logo.png" alt="explorer logo" width={120} height={120} />
            <h1 className="font-bold pl-4 text-slate-50">Explorer</h1>
        </Link>
    )
}

export default Logo
