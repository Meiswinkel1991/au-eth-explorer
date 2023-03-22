import Image from "next/image"
import { ethers } from "ethers"

const TokenBalanceCard = ({ token }) => {
    return (
        <>
            {token?.logo ? (
                <div className="p-2.5 flex space-x-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg shadow-lg text-white items-center ">
                    <Image src={token?.logo} alt={token?.name} width={32} height={32} />
                    <div className="flex flex-col items-start">
                        <p>{token?.name}</p>
                        <p>
                            {parseFloat(
                                ethers.utils.formatUnits(
                                    parseInt(token?.tokenBalance),
                                    token?.decimals
                                )
                            ).toFixed(3)}
                        </p>
                    </div>
                </div>
            ) : (
                ""
            )}{" "}
        </>
    )
}

export default TokenBalanceCard
