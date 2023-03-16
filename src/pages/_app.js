import "@/styles/globals.css"
import Layout from "@/components/layout/Layout"
import { AlchemyProvider } from "@/store/alchemy"

export default function App({ Component, pageProps }) {
    return (
        <AlchemyProvider apiKey={process.env.NEXT_PUBLIC__ALCHEMY_API_KEY}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </AlchemyProvider>
    )
}
