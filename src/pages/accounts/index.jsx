import { useAlchemy } from "@/store/alchemy"

const Accounts = () => {
    const { fetchTokensFromAccount } = useAlchemy()

    return (
        <div>
            <button
                onClick={() =>
                    fetchTokensFromAccount("0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199")
                }
            >
                Fetch data
            </button>
        </div>
    )
}

export default Accounts
