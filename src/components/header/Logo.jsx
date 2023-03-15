import React from "react"
import Image from "next/image"

const Logo = () => {
    return (
        <div className="flex flex-col items-start text-3xl space-x-2">
            <Image src="/au-logo.png" alt="explorer logo" width={120} height={120} />
            <h1 className="font-bold pl-4 text-slate-50">Explorer</h1>
        </div>
    )
}

export default Logo
