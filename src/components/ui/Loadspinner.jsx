import { CirclesWithBar } from "react-loader-spinner"

import React from "react"

const Loadspinner = () => {
    return (
        <div className="grid place-content-center my-32">
            <CirclesWithBar
                height="100"
                width="100"
                color="rgb(147 197 253)"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                outerCircleColor=""
                innerCircleColor=""
                barColor=""
                ariaLabel="circles-with-bar-loading"
            />
        </div>
    )
}

export default Loadspinner
