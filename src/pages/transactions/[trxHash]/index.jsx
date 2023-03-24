import { useRouter } from "next/router"
import { useAlchemy } from "@/store/alchemy"
import { useEffect, useState } from "react"
import { ethers } from "ethers"
import TransactionStatusPill from "@/components/transactions/TransactionStatusPill"
import BlockInformation from "@/components/transactions/BlockInformation"
import Loadspinner from "@/components/ui/Loadspinner"
import TimestampBadge from "@/components/ui/TimestampBadge"
import Link from "next/link"
import Image from "next/image"

const TransactionDetail = () => {
    const [trx, setTrx] = useState({})

    const router = useRouter()
    const { trxHash } = router.query

    const { fetchTrxData, isLoading, blockDetail } = useAlchemy()

    const getDetails = async () => {
        const data = await fetchTrxData(trxHash)
        setTrx(data)
    }

    useEffect(() => {
        getDetails()
        console.log(trxHash)
    }, [trxHash])

    return (
        <>
            {isLoading ? (
                <Loadspinner />
            ) : (
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white border rounded-lg p-4 mt-8">
                        <div className="grid grid-cols-3 gap-4 place-items-start">
                            <div className="text-slate-400">Transaction Hash:</div>
                            <div className="col-span-2 text-blue-900">{trx?.hash}</div>
                            <div className="text-slate-400">Status:</div>
                            {trx && <TransactionStatusPill statusId={trx.status} />}
                            <div className="text-slate-400">Block:</div>
                            <BlockInformation
                                blockNumber={trx?.blockNumber}
                                confirmations={trx?.confirmations}
                            />
                            <div className="text-slate-400">Timestamp:</div>
                            <TimestampBadge timestamp={blockDetail?.timestamp} />
                            <div className="col-span-3 my-4 bg-slate-200 h-[2px] w-full"></div>
                            <div className="text-slate-400">From:</div>
                            <Link href={`/accounts/${trx?.from}`} className="col-span-2">
                                <div className=" text-blue-900 hover:text-blue-300">
                                    {trx?.from}
                                </div>
                            </Link>
                            <div className="text-slate-400">To:</div>
                            <Link href={`/accounts/${trx?.to}`} className="col-span-2">
                                <div className=" text-blue-900 hover:text-blue-300">{trx?.to}</div>
                            </Link>
                            <div className="col-span-3 my-4 bg-slate-200 h-[2px] w-full"></div>
                            <div className="text-slate-400">Value:</div>
                            <div className="col-span-2 text-blue-900 flex space-x-1">
                                <Image
                                    src="/ethereum-eth-logo-dark-blue.svg"
                                    width={12}
                                    height={12}
                                    alt="ethereum logo"
                                />
                                <h2>
                                    {trx?.value
                                        ? parseFloat(ethers.utils.formatEther(trx?.value)).toFixed(
                                              3
                                          )
                                        : "0.000"}
                                </h2>
                            </div>
                            <div className="text-slate-400">Transaction Fee:</div>
                            <div className="col-span-2 text-blue-900 flex space-x-1">
                                <Image
                                    src="/ethereum-eth-logo-dark-blue.svg"
                                    width={12}
                                    height={12}
                                    alt="ethereum logo"
                                />
                                <h2>
                                    {trx?.gasUsed
                                        ? parseFloat(
                                              ethers.utils.formatEther(
                                                  trx?.gasUsed.mul(trx?.gasPrice)
                                              )
                                          )
                                        : "0.000"}
                                </h2>
                            </div>
                            <div className="text-slate-400">Gas Price:</div>
                            <div className="col-span-2 text-blue-900">
                                {trx?.gasPrice
                                    ? ethers.utils.formatUnits(trx?.gasPrice.toString(), "gwei")
                                    : "0"}{" "}
                                Gwei
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default TransactionDetail
