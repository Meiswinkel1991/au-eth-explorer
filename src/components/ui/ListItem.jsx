import React from "react"

const ListItem = ({ children, hover = false }) => {
    return (
        <div
            className={`bg-white p-2  flex justify-between items-center rounded-lg  ${
                hover ? "cursor-pointer hover:shadow-lg" : ""
            } min-h-[52px]`}
        >
            {children}
        </div>
    )
}

export default ListItem
