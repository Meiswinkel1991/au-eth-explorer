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
        <ListItem>
            <div className="flex flex-start items-start">
                <MdOutlineStairs className="text-2xl text-blue-900 mt-1" />
                <div className="mx-2">
                    <Link href={`/blocks/${blockNumber}`}>
                        <h2 className="font-semibold text-blue-900 text-xl m-0 p-0 hover:text-blue-300 delay-75">
                            {blockNumber}
                        </h2>
                    </Link>
                    <h3 className="text-slate-400">{returnElapsedTime()}</h3>
                </div>
            </div>
            <div className="flex flex-end items-center space-x-4  ">
                <div className="flex flex-col text-slate-400 justify-between ">
                    <h3>Mined by:</h3>
                    <h3>Transactions:</h3>
                </div>
                <div className="flex flex-col items-end text-blue-900  justify-between">
                    <Link href={`/accounts/${miner}`}>
                        <h2 className="hover:text-blue-300">
                            {miner.slice(0, 4)}...{miner.slice(-4)}
                        </h2>
                    </Link>
                    <h2>{trxCount}</h2>
                </div>
                <Link href={`/blocks/${blockNumber}`}>
                    <MdArrowForwardIos className="text-2xl ml-4 text-blue-900 hover:text-blue-300" />
                </Link>
            </div>
        </ListItem>
    )
}

export default BlockListItem
