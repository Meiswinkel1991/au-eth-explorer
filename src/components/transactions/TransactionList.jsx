import React from "react"
import { useAlchemy } from "@/store/alchemy"
import List from "../ui/List"
import { TransactionListItem } from "./TransactionListItem"

const TransactionList = () => {
    const { transactions } = useAlchemy()

    return (
        <List headingName="Latest Transactions">
            {transactions?.map((trx, index) => {
                return index >= 10 ? (
                    ""
                ) : (
                    <TransactionListItem
                        key={trx.hash}
                        trxHash={trx.hash}
                        from={trx.from}
                        value={trx.value}
                        to={trx.to}
                    />
                )
            })}
        </List>
    )
}

export default TransactionList
