import { useState, useEffect, createContext, useContext } from "react"
import { Network, Alchemy, Utils } from "alchemy-sdk"
import { ethers } from "ethers"

const AlchemyContext = createContext({
    blocks: [],
    transactions: [],
    latestBlockNumber: 0,
    gasPrice: 0.0,
    blockDetail: {},
    accountTrx: [],
    accountTokenBalance: [],
    accountEtherBalance: 0,
    isLoading: true,
    updateBlockNumber: () => {},
    fetchTokensFromAccount: () => {},
    fetchBlockInformation: async () => {},
    fetchAccountTransfers: () => {},
    setIsloading: () => {},
    fetchAccountEtherBalance: () => {},
    fetchTrxData: async () => {},
})

export const AlchemyProvider = ({ children, apiKey }) => {
    const [isLoading, setIsLoading] = useState(false)

    const [blocks, setBlocks] = useState([])
    const [transactions, setTransactions] = useState([])
    const [latestBlockNumber, setLatestBlockNumber] = useState(0)
    const [gasPrice, setGasPrice] = useState(0.0)
    const [blockDetail, setBlockDetail] = useState()
    const [accountTrx, setAccountTrx] = useState([])
    const [accountTokenBalance, setAccountTokenBalance] = useState([])
    const [accountEtherBalance, setAccountEtherBalance] = useState(0)

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
        setIsLoading(true)

        try {
            const accountInfoTokens = await alchemy.core.getTokenBalances(address)
            const _tokenBalances = accountInfoTokens.tokenBalances

            const tokenBalanceData = []
            console.log(_tokenBalances)
            _tokenBalances.forEach(async (token) => {
                console.log(parseInt(token.tokenBalance))
                if (parseInt(token.tokenBalance) > 0) {
                    const metaData = await alchemy.core.getTokenMetadata(token.contractAddress)

                    token = { ...token, ...metaData }

                    tokenBalanceData.push(token)
                }
            })
            console.log(tokenBalanceData)
            setAccountTokenBalance(tokenBalanceData)
            setIsLoading(false)
        } catch (e) {
            console.error(e)
            setIsLoading(false)
        }
    }

    const fetchAccountEtherBalance = async (address) => {
        const balance = await alchemy.core.getBalance(address)
        const transformBalance = ethers.utils.formatEther(balance)
        setAccountEtherBalance(transformBalance)
    }

    const fetchBlockInformation = async (_blockNumber) => {
        setIsLoading(true)
        try {
            const _blockInfo = await alchemy.core.getBlockWithTransactions(_blockNumber)
            setBlockDetail(_blockInfo)
            console.log(_blockInfo)
            setIsLoading(false)
        } catch (e) {
            console.error(e)
            setIsLoading(false)
        }
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

    const fetchTrxData = async (trxHash) => {
        setIsLoading(true)
        try {
            const trx = await alchemy.core.getTransaction(trxHash)
            const trxReceipt = await alchemy.core.getTransactionReceipt(trxHash)
            setIsLoading(false)
            return { ...trx, ...trxReceipt }
        } catch (e) {
            console.error(e)
            setIsLoading(false)
        }
    }

    const context = {
        blocks: blocks,
        transactions: transactions,
        latestBlockNumber: latestBlockNumber,
        updateBlockNumber: updateBlockNumber,
        gasPrice: gasPrice,
        blockDetail: blockDetail,
        accountTrx: accountTrx,
        accountEtherBalance: accountEtherBalance,
        isLoading: isLoading,
        fetchTokensFromAccount: fetchTokensFromAccount,
        fetchBlockInformation: fetchBlockInformation,
        fetchAccountTransfers: fetchAccountTransfers,
        fetchTokensFromAccount: fetchTokensFromAccount,
        fetchAccountEtherBalance: fetchAccountEtherBalance,
        accountTokenBalance: accountTokenBalance,
        fetchTrxData: fetchTrxData,
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

export const useAccount = (address) => {
    const context = useContext(AlchemyContext)

    useEffect(() => {
        if (address) {
            context.fetchAccountTransfers(address)
            context.fetchTokensFromAccount(address)
            context.fetchAccountEtherBalance(address)
        }
    }, [address])
    return {
        accountTrx: context.accountTrx,
        accountTokenBalance: context.accountTokenBalance,
        accountEtherBalance: context.accountEtherBalance,
        isLoading: context.isLoading,
    }
}
