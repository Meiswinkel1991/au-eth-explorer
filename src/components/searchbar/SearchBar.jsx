import { useState } from "react"
import { ethers } from "ethers"

const SearchBar = () => {
    const [searchInput, setSearchInput] = useState("")

    const handleSearchInputChange = (e) => {
        e.preventDefault()
        setSearchInput(e.target.value)

        if (ethers.utils.isAddress(e.target.value)) {
            console.log("is Address")
        }
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        if (e.keyCode == 13) {
            console.log("test")
        }
    }

    return (
        <div className="max-w-lg mx-auto  place-items-center my-8">
            <input
                type="text"
                value={searchInput}
                onChange={handleSearchInputChange}
                placeholder="Search ... "
                className="peer block min-h-[auto] w-full rounded border-0 bg-white py-[0.32rem] px-3 leading-[1.6] outline-none text-blue-900 text-lg"
            />
        </div>
    )
}

export default SearchBar
