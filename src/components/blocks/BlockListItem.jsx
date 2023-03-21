import Link from "next/link"
import ListItem from "../ui/ListItem"
import { MdOutlineStairs, MdArrowForwardIos } from "react-icons/md"

const BlockListItem = ({ blockNumber, miner, trxCount, elapsedTime }) => {
    const returnElapsedTime = () => {
        if (elapsedTime < 1) {
            return `less than a minute ago`
        }
        if (elapsedTime === 1) {
            return `1 minute ago`
        }

        return `${elapsedTime} minutes ago`
    }

    return (
        <Link href={`blocks/${blockNumber}`}>
            <ListItem>
                <div className="flex flex-start items-start">
                    <MdOutlineStairs className="text-2xl text-blue-900 mt-1" />
                    <div className="mx-2">
                        <h2 className="font-semibold text-blue-900 text-xl m-0 p-0">
                            {blockNumber}
                        </h2>
                        <h3 className="text-slate-400">{returnElapsedTime()}</h3>
                    </div>
                </div>
                <div className="flex flex-end items-center space-x-4  ">
                    <div className="flex flex-col text-slate-400 justify-between ">
                        <h3>Minted by:</h3>
                        <h3>Transactions:</h3>
                    </div>
                    <div className="flex flex-col items-end text-blue-900 justify-between">
                        <h2>
                            {miner.slice(0, 4)}...{miner.slice(-4)}
                        </h2>
                        <h2>{trxCount}</h2>
                    </div>
                    <MdArrowForwardIos className="text-2xl ml-4 text-blue-900" />
                </div>
            </ListItem>
        </Link>
    )
}

export default BlockListItem
