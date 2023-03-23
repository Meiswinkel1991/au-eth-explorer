import TokenBalanceCard from "./TokenBalanceCard"

const TokenBalanceDashboard = ({ tokenBalances }) => {
    return (
        <div className="w-full rounded-lg bg-white px-4 py-2 border">
            <h1 className="text-blue-900 mb-4 text-lg font-semibold">Token Balances</h1>
            <div className="w-full  grid grid-cols-4 gap-x-2 gap-y-2">
                {tokenBalances?.map((token, i) => {
                    return <TokenBalanceCard key={i} token={token} />
                })}
            </div>
        </div>
    )
}

export default TokenBalanceDashboard
