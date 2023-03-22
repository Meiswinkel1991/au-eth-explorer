import { useState } from "react"
import { useRouter } from "next/router"
import { ethers } from "ethers"

const SearchBar = () => {
    const [searchInput, setSearchInput] = useState("")

    const router = useRouter()

    const handleSearchInputChange = (e) => {
        e.preventDefault()
        setSearchInput(e.target.value)
    }

    const handleKeyDown = (e) => {
        const { key } = e

        if (key === "Enter") {
            e.preventDefault()
            if (ethers.utils.isAddress(e.target.value)) {
                console.log("go to address")
                router.push(`/accounts/${e.target.value}`)
            } else {
                alert("Not an address!")
            }
        }
    }

    return (
        <div className="max-w-lg mx-auto  place-items-center my-8">
            <div tabIndex={1} onKeyDown={handleKeyDown}>
                <input
                    type="text"
                    value={searchInput}
                    onChange={handleSearchInputChange}
                    placeholder="Search address... "
                    className="peer block min-h-[auto] w-full rounded border-0 bg-white py-[0.32rem] px-3 leading-[1.6] outline-none text-blue-900 text-lg transition"
                />
            </div>
        </div>
    )
}

export default SearchBar
