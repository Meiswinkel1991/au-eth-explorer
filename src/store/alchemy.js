import { useState, useEffect, createContext, useContext } from "react"
import { Network, Alchemy, Utils } from "alchemy-sdk"

const AlchemyContext = createContext({
    blocks: [],
    transactions: [],
    latestBlockNumber: 0,
    gasPrice: 0.0,
    blockDetail: {},
    accountTrx: [],
    updateBlockNumber: () => {},
    fetchTokensFromAccount: () => {},
    fetchBlockInformation: () => {},
    fetchAccountTransfers: () => {},
})

export const AlchemyProvider = ({ children, apiKey }) => {
    const [blocks, setBlocks] = useState([])
    const [transactions, setTransactions] = useState([])
    const [latestBlockNumber, setLatestBlockNumber] = useState(0)
    const [gasPrice, setGasPrice] = useState(0.0)
    const [blockDetail, setBlockDetail] = useState()
    const [accountTrx, setAccountTrx] = useState([])

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

        setGasPrice(parseFloat(Utils.formatUnits(_gasPrice, "gwei")).toFixed(0))
    }

    const fetchBlockData = async (_blockNumber) => {
        let _blocks = []
        for (let i = 0; i < 10; i++) {
            const _block = await alchemy.core.getBlock(_blockNumber - i)
            _blocks.push(_block)
        }

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
        })
    }

    const fetchBlockInformation = async (_blockNumber) => {
        const _blockInfo = await alchemy.core.getBlockWithTransactions(_blockNumber)
        setBlockDetail(_blockInfo)
    }

    const fetchAccountTransfers = async (address) => {
        let transfers = []
        const transfersTo = await alchemy.core.getAssetTransfers({
            toAddress: address,
            excludeZeroValue: true,
            category: ["external", "internal", "erc20", "erc721", "erc1155", "specialnft"],
        })

        const transferFrom = await alchemy.core.getAssetTransfers({
            fromAddress: address,
            excludeZeroValue: true,
            category: ["external", "internal", "erc20", "erc721", "erc1155", "specialnft"],
        })
        transfers = [...transfersTo.transfers, ...transferFrom.transfers]
        transfers.sort((a, b) => parseInt(b.blockNum) - parseInt(a.blockNum))
        setAccountTrx(transfers)
    }

    const context = {
        blocks: blocks,
        transactions: transactions,
        latestBlockNumber: latestBlockNumber,
        updateBlockNumber: updateBlockNumber,
        gasPrice: gasPrice,
        blockDetail: blockDetail,
        accountTrx: accountTrx,
        fetchTokensFromAccount: fetchTokensFromAccount,
        fetchBlockInformation: fetchBlockInformation,
        fetchAccountTransfers: fetchAccountTransfers,
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

export const useBlockDetail = (_blockNumber) => {
    const context = useContext(AlchemyContext)

    useEffect(() => {
        context.fetchBlockInformation(parseInt(_blockNumber))
    }, [_blockNumber])

    return context.blockDetail
}

export const useAccount = (address) => {
    const context = useContext(AlchemyContext)

    useEffect(() => {
        context.fetchAccountTransfers(address)
    }, [])
    return context.accountTrx
}
