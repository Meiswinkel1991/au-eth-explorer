import { useBlockDetail } from "@/store/alchemy"
import { useRouter } from "next/router"
import { utils } from "ethers"
import { calculatePercent } from "@/utils/helper-functions"
import { TransactionListItem } from "@/components/transactions/TransactionListItem"

const BlockDetail = () => {
    const router = useRouter()

    const { blockNumber } = router.query

    const block = useBlockDetail(blockNumber)

    console.log(block)

    return (
        <div className="max-w-4xl mx-auto">
            <div className=" bg-white border rounded-lg p-4 mt-8">
                <div className="grid grid-cols-3 gap-4 place-items-start">
                    <div className="text-slate-400">Block Height:</div>
                    <div className="col-span-2 text-blue-900">{blockNumber}</div>
                    <div className="text-slate-400">Timestamp:</div>
                    <div className="col-span-2 text-blue-900">{block?.timestamp}</div>
                    <div className="text-slate-400">Transactions:</div>
                    <div className="col-span-2 text-blue-900">
                        {block?.transactions.length} transactions
                    </div>
                    <div className="text-slate-400">Miner:</div>
                    <div className="col-span-2 text-blue-900">{block?.miner}</div>
                    <div className="text-slate-400">Hash:</div>
                    <div className="col-span-2 text-blue-900">{block?.hash}</div>
                    <div className="col-span-3 my-4 bg-slate-200 h-[2px] w-full"></div>
                    <div className="text-slate-400">Gas used:</div>
                    <div className="col-span-2 text-blue-900">
                        {block?.gasUsed ? utils.commify(block?.gasUsed) : ""}{" "}
                        <span className="text-slate-300">
                            {`(${calculatePercent(block.gasUsed, block.gasLimit)}%)`}
                        </span>
                    </div>
                    <div className="text-slate-400">Gas Limit:</div>
                    <div className="col-span-2 text-blue-900">
                        {block?.gasUsed ? utils.commify(block?.gasLimit) : ""}
                    </div>
                    <div className="text-slate-400">Base Fee per Gas:</div>
                    <div className="col-span-2 text-blue-900">
                        {block?.gasUsed ? utils.formatUnits(block?.baseFeePerGas, "gwei") : ""}{" "}
                        Gwei
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-lg border mt-4 px-4 ">
                <h1 className="text-xl text-slate-400 mt-2">Transactions</h1>
                {block?.transactions.map((trx) => {
                    return (
                        <TransactionListItem
                            key={trx.hash}
                            trxHash={trx.hash}
                            from={trx.from}
                            value={trx.value}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default BlockDetail
