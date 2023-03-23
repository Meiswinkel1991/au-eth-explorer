import React from "react"
import NavItem from "./NavItem"

const NavItemsCollection = () => {
    return (
        <div>
            {/* hamburgerButton */}
            <nav className="hidden space-x-8 text-xl md:block" aria-label="main">
                <NavItem href="/" mobile>
                    Home
                </NavItem>
                <NavItem href="/blocks" mobile>
                    Blocks
                </NavItem>
                <NavItem href="/transactions" mobile>
                    Transactions
                </NavItem>
                <NavItem href="/accounts" mobile>
                    Accounts
                </NavItem>
            </nav>
        </div>
    )
}

export default NavItemsCollection
