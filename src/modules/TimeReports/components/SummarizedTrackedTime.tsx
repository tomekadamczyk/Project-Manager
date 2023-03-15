import { useGetTimeReports } from "../hooks/useGetTimeReport";
import { formatTime } from "utils/formatTime";

function incrementArrayItemPropertyAsNumber<T>(arraySource: T[], key: keyof T) {
    return arraySource.reduce((acc, item) => {
        acc+= item[key] as number;
        return acc
    }, 0)
}

export function SummarizedTrackedTime({ taskId }: { taskId: number; }) {
    const { reports } = useGetTimeReports({ taskId });
    const sum = reports ? incrementArrayItemPropertyAsNumber(reports, "duration") : 0

    return (
        <div style={{fontSize: 12}}>{formatTime(sum)}</div>
    )
}
