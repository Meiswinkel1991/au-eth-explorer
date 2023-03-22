import TokenBalanceCard from "./TokenBalanceCard"

const TokenBalanceDashboard = ({ tokenBalances }) => {
    return (
        <div className="w-full rounded-lg bg-white p-4 grid grid-cols-4 gap-x-2">
            {tokenBalances?.map((token) => {
                return <TokenBalanceCard key={token.name} token={token} />
            })}
        </div>
    )
}

export default TokenBalanceDashboard
