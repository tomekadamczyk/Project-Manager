import { TimeReportProps } from "modules/App/reactiveVariables/timeReportsVar/types"
import { formatTime } from "utils/formatTime";

export function Report({ report }: { report: TimeReportProps }) {
    const reportDate = new Date(Number(report.createdAt)).toLocaleDateString();
    const reportTime = formatTime(report.duration);

    return (
        <div style={{fontSize: 12, marginBottom: 5}}>
            <div>{reportDate} - {reportTime}</div>
        </div>
    )
}