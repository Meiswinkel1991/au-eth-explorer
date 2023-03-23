import { MdHistory } from "react-icons/md"

const TimestampBadge = ({ timestamp }) => {
    return (
        <div className="flex space-x-2 text-blue-900">
            <MdHistory />
            <h3></h3>
        </div>
    )
}

export default TimestampBadge
