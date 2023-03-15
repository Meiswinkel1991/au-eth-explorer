import React from "react"
import { useAlchemy } from "@/hooks/useAlchemy"
import BlockListItem from "./BlockListItem"
import List from "../ui/List"

const BlockList = () => {
    const { blocks } = useAlchemy()

    const calulateElapsedTime = (timeStamp) => {
        const now = Date.now()

        const elapsed = now / 1000 - timeStamp

        return parseInt(elapsed / 60)
    }

    return (
        <List headingName="Latest Block">
            {blocks?.map((block) => {
                return (
                    <BlockListItem
                        blockNumber={block.number}
                        miner={block.miner}
                        elapsedTime={calulateElapsedTime(block.timestamp)}
                        trxCount={block.transactions.length}
                        key={block.number}
                    />
                )
            })}
        </List>
    )
}

export default BlockList
