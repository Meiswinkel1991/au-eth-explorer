import "@/styles/globals.css"
import Layout from "@/components/layout/Layout"
import { AlchemyProvider } from "@/store/alchemy"
import { Network, Alchemy } from "alchemy-sdk"

const settings = {
    apiKey: process.env.NEXT_PUBLIC__ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
}

const alchemy = new Alchemy(settings)

export default function App({ Component, pageProps }) {
    return (
        <AlchemyProvider alchemy={alchemy}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </AlchemyProvider>
    )
}
