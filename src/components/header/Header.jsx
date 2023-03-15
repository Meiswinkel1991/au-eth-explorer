import React from "react"
import Logo from "./Logo"
import NavItemsCollection from "../nav/NavItemsCollection"

const Header = () => {
    return (
        <header className="sticky top-0 text-white bg-gradient-to-r from-cyan-500 to-blue-500">
            <section className="mx-auto flex max-w-4xl items-center justify-between p-4">
                <Logo />
                <NavItemsCollection />
            </section>
        </header>
    )
}

export default Header
