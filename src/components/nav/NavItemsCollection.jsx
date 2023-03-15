import React from "react"
import NavItem from "./NavItem"

const NavItemsCollection = () => {
    return (
        <div>
            {/* hamburgerButton */}
            <nav className="hidden space-x-8 text-xl md:block" aria-label="main">
                <NavItem href="#" mobile>
                    Home
                </NavItem>
                <NavItem href="#" mobile>
                    Blocks
                </NavItem>
                <NavItem href="#" mobile>
                    Transactions
                </NavItem>
            </nav>
        </div>
    )
}

export default NavItemsCollection
