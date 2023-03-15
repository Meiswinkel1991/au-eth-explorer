import React from "react"
import ListItem from "../ui/ListItem"
import { MdOutlineSwapHorizontalCircle, MdArrowForwardIos } from "react-icons/md"
import { Utils } from "alchemy-sdk"

export const TransactionListItem = ({ trxHash, from, value }) => {
    return (
        <ListItem>
            <div className="flex flex-start items-start">
                <MdOutlineSwapHorizontalCircle className="text-2xl text-blue-900 mt-1" />
                <div className="mx-2">
                    <h2 className="font-semibold text-blue-900 text-xl m-0 p-0">
                        {trxHash.slice(0, 8)}...{trxHash.slice(-8)}
                    </h2>
                </div>
            </div>
            <div className="flex flex-end items-center space-x-4  ">
                <div className="flex flex-col text-slate-400 justify-between ">
                    <h3>Trx Caller:</h3>
                    <h3>Value:</h3>
                </div>
                <div className="flex flex-col items-end text-blue-900 justify-between">
                    <h2>
                        {from.slice(0, 4)}...{from.slice(-4)}
                    </h2>
                    <h2>{parseFloat(Utils.formatEther(value)).toFixed(4)} ETH</h2>
                </div>
                <MdArrowForwardIos className="text-2xl ml-4 text-blue-900" />
            </div>
        </ListItem>
    )
}
