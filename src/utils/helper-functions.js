import { ethers } from "ethers"

export const calculatePercent = (used, limit) => {
    const _percent = used.mul(10000).div(limit)
    console.log(used, limit, _percent)
    return parseFloat(_percent.toString()) / 100
}

export const addressShortener = (address) => {
    if (address) {
        return `${address.slice(0, 6)}...${address.slice(-6)}`
    }

    return ""
}
