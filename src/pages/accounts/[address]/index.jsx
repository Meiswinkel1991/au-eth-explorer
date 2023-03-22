import { useRouter } from "next/router"
import { useAccount } from "@/store/alchemy"
import { addressShortener } from "@/utils/helper-functions"
import TokenBalanceDashboard from "@/components/account/token-balances/TokenBalanceDashboard"

const AccountDetail = () => {
    const router = useRouter()
    const { address } = router.query

    const { accountTrx, accountTokenBalance } = useAccount(address)

    return (
        <div className="container max-w-4xl mx-auto mt-4  ">
            <div className="w-full bg-white rounded-lg px-4 py-2">
                <h1 className="text-lg text-blue-900">Address: {address}</h1>
            </div>
            <TokenBalanceDashboard tokenBalances={accountTokenBalance} />
            <div className="w-full bg-white rounded-lg mt-4 overflow-hidden">
                <table className="divide-y divide-blue-400 w-full text-center ">
                    <thead className="bg-slate-100 ">
                        <tr>
                            <th className="px-6 py-2 text-xs text-slate-500">Transfer Type</th>
                            <th className="px-6 py-2 text-xs text-slate-500">From</th>
                            <th className="px-6 py-2 text-xs text-slate-500">To</th>
                            <th className="px-6 py-2 text-xs text-slate-500">Asset</th>
                            <th className="px-6 py-2 text-xs text-slate-500">Value</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-300">
                        {accountTrx?.map((trx, i) => {
                            return (
                                <tr key={i} className="whitespace-nowrap">
                                    <td className="px-6 py-4 text-sm text-slate-500">
                                        {trx.category}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-500">
                                        {addressShortener(trx.from)}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-500">
                                        {addressShortener(trx.to)}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-500">
                                        {trx.asset}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-500">
                                        {trx.value}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <div className="flex flex-col  mt-4 ">
                <div className="w-full  ">
                    <div className=" "></div>
                </div>
            </div>
        </div>
    )
}

export default AccountDetail
