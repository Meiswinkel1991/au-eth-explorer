import { useState } from "react"

const SearchBar = () => {
    const [searchInput, setSearchInput] = useState("")

    const handleSearchInputChange = (e) => {
        e.preventDefault()
        setSearchInput(e.target.value)
    }

    return (
        <div className="max-w-lg mx-auto  place-items-center my-8">
            <input
                type="search"
                value={searchInput}
                onChange={handleSearchInputChange}
                placeholder="Search by Address / Trx Hash / Block "
                className="peer block min-h-[auto] w-full rounded border-0 bg-white py-[0.32rem] px-3 leading-[1.6] outline-none text-blue-900 text-lg"
            />
        </div>
    )
}

export default SearchBar
