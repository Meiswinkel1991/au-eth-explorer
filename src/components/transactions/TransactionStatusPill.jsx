import React from "react"
import { MdDoDisturb, MdCheck } from "react-icons/md"

const status = {
    0: {
        text: "Failure",
        color: "text-red-800",
        bg: "bg-red-300",
        border: "border-red-800",
        item: <MdDoDisturb />,
    },
    1: {
        text: "Success",
        color: "text-green-800",
        bg: "bg-green-300",
        border: "border-green-800",
        item: <MdCheck />,
    },
    2: {
        text: "Awaiting Others",
        color: "text-green-800",
        bg: "bg-green-200",
        border: "border-green-800",
        item: <MdCheck />,
    },
}

const TransactionStatusPill = ({ statusId }) => {
    return (
        <>
            {status[statusId] && (
                <div
                    className={`col-span-2 ${statusId in status ? status[statusId].color : ""} ${
                        statusId in status ? status[statusId].bg : ""
                    } ${
                        statusId in status ? status[statusId].border : ""
                    } border rounded-xl py-1 px-2.5 text-xs flex space-x-2 items-center`}
                >
                    {status[statusId].item}
                    <h3>{status[statusId].text}</h3>
                </div>
            )}
        </>
    )
}

export default TransactionStatusPill
