import React from "react"

const ListItem = ({ children }) => {
    return (
        <div className="bg-white p-2 mt-4 flex justify-between items-center rounded-lg cursor-pointer hover:shadow-lg min-h-[52px]">
            {children}
        </div>
    )
}

export default ListItem
