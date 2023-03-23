import BlockList from "@/components/blocks/BlockList"
import TransactionList from "@/components/transactions/TransactionList"
import InfoScreen from "@/components/info-screen/InfoScreen"
import SearchBar from "@/components/searchbar/SearchBar"
import axios from "axios"

export default function Home({ cryptoPrices }) {
    return (
        <div className="max-w-6xl mx-auto my-4">
            <h1 className="text-4xl font-semibold text-center text-blue-900">
                Ethereum Block Explorer
            </h1>
            <SearchBar />
            <InfoScreen cryptoPrices={cryptoPrices} />
            <div className="flex flex-col md:flex-row items-start justify-between space-x-8 ">
                <BlockList />
                <TransactionList />
            </div>
        </div>
    )
}

export const getServerSideProps = async () => {
    const url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest"

    const query = "?limit=10"
    try {
        const res = await axios.get(url + query, {
            headers: { "X-CMC_PRO_API_KEY": process.env.COINMARKETCAP_API_KEY },
        })
        console.log(res.data)
        return {
            props: { cryptoPrices: res.data.data },
        }
    } catch (error) {
        console.log(error)
        return {
            props: {},
        }
    }
}
