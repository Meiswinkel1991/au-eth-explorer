import { Alchemy, Network } from "alchemy-sdk"
import { ethers } from "ethers"

const settings = {
    apiKey: process.env.ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
}

const alchemy = new Alchemy(settings)

export const getGasPrice = async () => {
    const _gasPrice = await alchemy.core.getGasPrice()

    return parseFloat(ethers.utils.formatUnits(_gasPrice, "gwei")).toFixed(8)
}

export const getBlockData = async (_blockNumber) => {
    let _blocks = []
    for (let i = 0; i < 10; i++) {
        const _block = await alchemy.core.getBlock(_blockNumber - i)
        _blocks.push(_block)
    }

    return _blocks
}

export const getTransactions = async (_blockNumber) => {
    const _blockData = await alchemy.core.getBlockWithTransactions(_blockNumber)

    return _blockData.transactions
}

export const getTokensFromAccount = async (_address) => {
    const tokenBalanceData = []
    try {
        const accountInfoTokens = await alchemy.core.getTokenBalances(address)
        const _tokenBalances = accountInfoTokens.tokenBalances

        _tokenBalances.forEach(async (token) => {
            console.log(parseInt(token.tokenBalance))
            if (parseInt(token.tokenBalance) > 0) {
                const metaData = await alchemy.core.getTokenMetadata(token.contractAddress)

                token = { ...token, ...metaData }

                tokenBalanceData.push(token)
            }
        })
    } catch (e) {
        console.error(e)
    }
    return tokenBalanceData
}
