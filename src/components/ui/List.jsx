import React from "react"

const List = ({ children, headingName }) => {
    return (
        <div className="flex flex-col space-y-4 w-full">
            <h1 className="text-2xl font-semibold my-4 text-blue-900">{headingName}</h1>
            {children}
        </div>
    )
}

export default List
