import React from "react"
import Link from "next/link"

const NavItem = ({ children, href, mobile }) => {
    return (
        <Link
            href={href}
            className={mobile ? "w-full py-6 text-center hover:opacity-90" : " hover:opacity-90"}
        >
            {children}
        </Link>
    )
}

export default NavItem
