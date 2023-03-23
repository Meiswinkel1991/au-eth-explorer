import React from "react"
import Link from "next/link"
import Image from "next/image"
import ListItem from "../ui/ListItem"
import { MdOutlineSwapHorizontalCircle, MdArrowForwardIos } from "react-icons/md"
import { Utils } from "alchemy-sdk"

export const TransactionListItem = ({ trxHash, from, value, to }) => {
    return (
        <ListItem>
            <div className="flex flex-start items-start ">
                <MdOutlineSwapHorizontalCircle className="text-2xl text-blue-900 mt-1" />
                <div className="mx-2">
                    <Link href={`/transactions/${trxHash}`}>
                        <h2 className="min-w-[170px] font-semibold text-blue-900 text-lg m-0 p-0 hover:text-blue-300">
                            {trxHash.slice(0, 8)}...{trxHash.slice(-8)}
                        </h2>
                    </Link>
                </div>
            </div>
            <div className="flex flex-start space-x-2">
                <h2 className="text-blue-900">
                    {parseFloat(Utils.formatEther(value)).toFixed(3)}{" "}
                </h2>
                <Image
                    src="/ethereum-eth-logo-dark-blue.svg"
                    width={12}
                    height={12}
                    alt="ethereum logo"
                />
            </div>
            <div className="flex flex-end items-center space-x-4  ">
                <div className="flex flex-col text-slate-400 justify-between ">
                    <h3>From:</h3>
                    <h3>To:</h3>
                </div>
                <div className="flex flex-col items-end text-blue-900 justify-between">
                    <h2>
                        <Link href={`accounts/${from}`} className="hover:text-blue-300">
                            {from.slice(0, 4)}...{from.slice(-4)}
                        </Link>
                    </h2>
                    <h2>
                        <Link href={`accounts/${to}`} className="hover:text-blue-300">
                            {to?.slice(0, 4)}...{to?.slice(-4)}
                        </Link>
                    </h2>
                </div>
                <Link href={`/transactions/${trxHash}`}>
                    <MdArrowForwardIos className="text-2xl ml-4 text-blue-900 hover:text-blue-300" />
                </Link>
            </div>
        </ListItem>
    )
}
