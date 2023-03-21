import BlockList from "@/components/blocks/BlockList"
import TransactionList from "@/components/transactions/TransactionList"
import InfoScreen from "@/components/info-screen/InfoScreen"
import SearchBar from "@/components/searchbar/SearchBar"

export default function Home() {
    return (
        <div className="max-w-6xl mx-auto my-4">
            <h1 className="text-4xl font-semibold text-center text-blue-900">
                Ethereum Block Explorer
            </h1>
            <SearchBar />
            <InfoScreen />
            <div className="flex flex-col md:flex-row items-start justify-between space-x-8 ">
                <BlockList />
                <TransactionList />
            </div>
        </div>
    )
}
