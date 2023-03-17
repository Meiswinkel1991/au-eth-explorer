import { useState, useEffect, createContext, useContext } from "react"
import { Network, Alchemy, Utils } from "alchemy-sdk"

const AlchemyContext = createContext({
    blocks: [],
    transactions: [],
    latestBlockNumber: 0,
    gasPrice: 0.0,
    updateBlockNumber: () => {},
    fetchTokensFromAccount: () => {},
})

export const AlchemyProvider = ({ children, apiKey }) => {
    const [blocks, setBlocks] = useState([])
    const [transactions, setTransactions] = useState([])
    const [latestBlockNumber, setLatestBlockNumber] = useState(0)
    const [gasPrice, setGasPrice] = useState(0.0)

    const settings = {
        apiKey: apiKey,
        network: Network.ETH_MAINNET,
    }

    const alchemy = new Alchemy(settings)

    const updateBlockNumber = async () => {
        const _blockNumber = await alchemy.core.getBlockNumber()

        if (_blockNumber > latestBlockNumber) {
            await fetchBlockData(_blockNumber)
            await fetchTransactions(_blockNumber)
            await fetchGasPrice()
        }

        setLatestBlockNumber(_blockNumber)
    }

    const fetchGasPrice = async () => {
        const _gasPrice = await alchemy.core.getGasPrice()

        console.log(`Actual Gas Price: ${Utils.formatUnits(_gasPrice, "gwei")}`)

        setGasPrice(parseFloat(Utils.formatUnits(_gasPrice, "gwei")).toFixed(0))
    }

    const fetchBlockData = async (_blockNumber) => {
        let _blocks = []
        for (let i = 0; i < 10; i++) {
            const _block = await alchemy.core.getBlock(_blockNumber - i)
            _blocks.push(_block)
        }
        console.log(_blocks)
        setBlocks(_blocks)
    }

    const fetchTransactions = async (_blockNumber) => {
        const _blockData = await alchemy.core.getBlockWithTransactions(_blockNumber)
        console.log(_blockData.transactions)
        setTransactions(_blockData.transactions)
    }

    const fetchTokensFromAccount = async (address) => {
        const accountInfoTokens = await alchemy.core.getTokenBalances(address)
        const _tokenBalances = accountInfoTokens.tokenBalances

        const tokenBalanceData = []

        _tokenBalances.forEach(async (token) => {
            const metaData = await alchemy.core.getTokenMetadata(token.contractAddress)

            token = { ...token, ...metaData }

            console.log(token)
        })
    }

    const context = {
        blocks: blocks,
        transactions: transactions,
        latestBlockNumber: latestBlockNumber,
        updateBlockNumber: updateBlockNumber,
        gasPrice: gasPrice,
        fetchTokensFromAccount: fetchTokensFromAccount,
    }

    return <AlchemyContext.Provider value={context}>{children}</AlchemyContext.Provider>
}

export const useAlchemy = () => {
    const context = useContext(AlchemyContext)

    useEffect(() => {
        const blockNumberInterval = setInterval(context.updateBlockNumber, 1000 * 12)
        console.log("Start Timer")
        context.updateBlockNumber()
        return () => clearInterval(blockNumberInterval)
    }, [context.latestBlockNumber])

    return context
}
