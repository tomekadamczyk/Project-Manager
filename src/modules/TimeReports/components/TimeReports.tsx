import { useGetTimeReports } from "../hooks/useGetTimeReport";
import { Report } from "./Report";
import Spinner from "modules/App/components/UI/Spinner/Spinner";
import { Link } from "react-router-dom";

export function TimeReportsByTask({ taskId }: { taskId: number; }) {
    const { reports, loading } = useGetTimeReports({ taskId });
    
    if(loading) return <Spinner />
    if(!reports) return <p>Błąd w pobieraniu raportów</p>
    
    return (
        <>
            {!reports.length ? <p>Nie zarejestrowano jeszcze czasu</p> : null}
            {reports.map(report => {
                return <Report key={report.createdAt} report={report} />
            })}
            {reports.length > 2 ? <Link to={`/tasks/${taskId}/reports`}>more</Link> : null}
        </>
    )
}