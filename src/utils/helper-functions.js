import { ethers } from "ethers"

export const calculatePercent = (used, limit) => {
    const _percent = used.mul(10000).div(limit)
    console.log(used, limit, _percent)
    return parseFloat(_percent.toString()) / 100
}
