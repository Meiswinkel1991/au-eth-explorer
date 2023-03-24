import { MdHistory } from "react-icons/md"

const TimestampBadge = ({ timestamp }) => {
    const convertTimestamp = (timestamp) => {
        const date = new Date(timestamp * 1000)

        return date.toLocaleDateString("en-GB") + " " + date.toLocaleTimeString("default")
    }

    const calculateElapsedTime = (timestamp) => {
        const date = Date.now() / 1000

        return parseInt((date - timestamp) / 60)
    }

    return (
        <div className="flex space-x-2 text-blue-900 col-span-2 items-center">
            <MdHistory />
            <h3>{convertTimestamp(timestamp)}</h3>
            <h4 className="text-sm text-slate-400">
                {calculateElapsedTime(timestamp)} minutes ago
            </h4>
        </div>
    )
}

export default TimestampBadge
