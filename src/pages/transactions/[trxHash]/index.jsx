import { useRouter } from "next/router"
import { useAlchemy } from "@/store/alchemy"
import { useEffect, useState } from "react"
import TransactionStatusPill from "@/components/transactions/TransactionStatusPill"
import BlockInformation from "@/components/transactions/BlockInformation"
import Loadspinner from "@/components/ui/Loadspinner"

const TransactionDetail = () => {
    const [trx, setTrx] = useState({})

    const router = useRouter()
    const { trxHash } = router.query

    const { fetchTrxData, isLoading } = useAlchemy()

    const getDetails = async () => {
        const data = await fetchTrxData(trxHash)
        setTrx(data)
    }

    useEffect(() => {
        getDetails()
    }, [])

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
                                blockNumber={trx.blockNumber}
                                confirmations={trx.confirmations}
                            />
                            <div className="text-slate-400">Timestamp:</div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default TransactionDetail
