import List from "@/components/ui/List"

const TokenBalanceList = ({ tokenBalances }) => {
    return (
        <List headingName="Token Balances">
            {tokenBalances?.map((token) => {
                return <p key={token.contractAddres}>{token.balance.toString()}</p>
            })}
        </List>
    )
}

export default TokenBalanceList
