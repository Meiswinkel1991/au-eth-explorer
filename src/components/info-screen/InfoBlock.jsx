import React from "react"

const InfoBlock = ({ children, header, info }) => {
    return (
        <div className="flex justify-between w-full py-2 items-center ">
            {children}

            <div className="flex flex-col items-end">
                <h3 className="text-lg text-slate-200">{header}</h3>
                <h3 className="text-xl text-blue-900">{info}</h3>
            </div>
        </div>
    )
}

export default InfoBlock
