import React from "react"
import Image from "next/image"
import { useAlchemy } from "@/store/alchemy"
import { MdOutlineLocalGasStation, MdOutlineDatasetLinked, MdInsights } from "react-icons/md"
import InfoBlock from "./InfoBlock"

const InfoScreen = ({ cryptoPrices }) => {
    const { gasPrice, latestBlockNumber } = useAlchemy()

    return (
        <div className="max-w-3xl mx-auto bg-white rounded-lg border-2 border-slate-100 flex justify-around my-4 p-2 ">
            <div className="w-full px-4">
                <InfoBlock
                    header="Ether Price"
                    info={cryptoPrices[1].quote.USD.price.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                    })}
                >
                    <Image
                        src="/ethereum-eth-logo-light-blue.svg"
                        width={16}
                        height={16}
                        alt="ethereum logo"
                    />
                </InfoBlock>
                <div className="bg-slate-200 w-full px-2 h-[1px]"></div>
                <InfoBlock
                    header="Market Cap"
                    info={cryptoPrices[1].quote.USD.market_cap.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                    })}
                >
                    <MdInsights className="text-blue-300 text-3xl font-light" />
                </InfoBlock>
            </div>
            <div className=" bg-slate-200 w-[1px] "></div>
            <div className="w-full px-4 flex flex-col items-end ">
                <InfoBlock header="Medium Gas Price" info={`${gasPrice} Gwei`}>
                    <MdOutlineLocalGasStation className="text-blue-300 text-3xl font-light" />
                </InfoBlock>

                <div className="bg-slate-200 w-full px-2 h-[1px]"></div>
                <InfoBlock header="Latest Blocknumber" info={latestBlockNumber}>
                    <MdOutlineDatasetLinked className="text-blue-300 text-3xl font-light" />
                </InfoBlock>
            </div>
        </div>
    )
}

export default InfoScreen
