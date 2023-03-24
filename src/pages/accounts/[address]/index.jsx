import { useRouter } from "next/router"
import { useAccount } from "@/store/alchemy"
import { addressShortener } from "@/utils/helper-functions"
import TokenBalanceDashboard from "@/components/account/token-balances/TokenBalanceDashboard"
import { MdOutlineAccountBalanceWallet } from "react-icons/md"
import Image from "next/image"
import SearchBar from "@/components/searchbar/SearchBar"

const AccountDetail = () => {
    const router = useRouter()
    const { address } = router.query

    const { accountTrx, accountTokenBalance, accountEtherBalance, onlyUnknownTokens } =
        useAccount(address)

    return (
        <div className="container max-w-4xl mx-auto mt-4  ">
            <div className="w-full bg-white rounded-lg border px-4 py-2 flex justify-between items-center mb-4">
                <h1 className="text-lg text-blue-900">Address: {address}</h1>
                <div className="flex space-x-2 items-center">
                    <MdOutlineAccountBalanceWallet className="text-blue-900 text-lg" />
                    <h3 className="text-blue-900 text-lg font-semibold">
                        {parseFloat(accountEtherBalance).toFixed(4)}{" "}
                    </h3>
                    <Image
                        src="/ethereum-eth-logo-dark-blue.svg"
                        width={12}
                        height={12}
                        alt="ethereum logo"
                    />
                </div>
            </div>
            {!onlyUnknownTokens && <TokenBalanceDashboard tokenBalances={accountTokenBalance} />}

            <div className="w-full bg-white rounded-lg mt-4 border overflow-hidden">
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
                                    <td
                                        className={`px-6 py-4 text-sm text-right  ${
                                            trx.to.toLowerCase() === address.toLowerCase()
                                                ? "text-green-500"
                                                : "text-red-500"
                                        } `}
                                    >
                                        {trx.value?.toFixed(3)}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AccountDetail
