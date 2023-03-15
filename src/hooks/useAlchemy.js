import { useState, useEffect } from "react"
import { Network, Alchemy } from "alchemy-sdk"

const settings = {
    apiKey: "",
    network: Network.ETH_MAINNET,
}

const alchemy = new Alchemy(settings)

export const useAlchemy = () => {
    const [blocks, setBlocks] = useState([])
    const [transactions, setTransactions] = useState([])
    const [latestBlockNumber, setLatestBlockNumber] = useState(0)

    const updateBlockNumber = async () => {
        const _blockNumber = await alchemy.core.getBlockNumber()

        if (_blockNumber > latestBlockNumber) {
            await fetchBlockData(_blockNumber)
            await fetchTransactions(_blockNumber)
        }

        setLatestBlockNumber(_blockNumber)
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

    useEffect(() => {
        const blockNumberInterval = setInterval(updateBlockNumber, 1000 * 12)

        updateBlockNumber()

        return () => clearInterval(blockNumberInterval)
    }, [])

    return { latestBlockNumber, blocks, transactions }
}
