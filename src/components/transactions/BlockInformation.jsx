import Link from "next/link"
import { MdHourglassBottom } from "react-icons/md"

const BlockInformation = ({ blockNumber, confirmations }) => {
    return (
        <div className="flex flex-start items-center space-x-2 col-span-2">
            <MdHourglassBottom className="text-slate-500" />
            <Link href={`/blocks/${blockNumber}`}>
                <h3 className="text-blue-900 text-lg  hover:text-blue-300">{blockNumber}</h3>
            </Link>
            <div className="bg-slate-200 rounded-lg shadow-md p-1">
                <h3 className="text-slate-800 text-center text-xs ">
                    {confirmations} Block Confirmation
                </h3>
            </div>
        </div>
    )
}

export default BlockInformation
