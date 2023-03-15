import { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetTimeReports } from "../hooks/useGetTimeReport";
import { Report } from "../components/Report";
import Spinner from "modules/App/components/UI/Spinner/Spinner";
import ContentTable from "modules/App/components/UI/ContentTable/ContentTable"
import { formatTime } from "utils/formatTime";

function incrementArrayItemPropertyAsNumber<T>(arraySource: T[], key: keyof T) {
    return arraySource.reduce((acc, item) => {
        acc+= item[key] as number;
        return acc
    }, 0)
}

export function TaskTimeReports() {
  
    let { id } = useParams();
    const navigate = useNavigate();
    const [orderState, setOrderState] = useState<"ASC" | "DESC">("DESC")
    const { reports, loading } = useGetTimeReports({ taskId: Number(id), order: orderState });
    function summarizeDuration() {
        return reports ? incrementArrayItemPropertyAsNumber(reports, "duration") : 0;
    }

    function goBack() {
        navigate(-1)
    }

    function setOrder() {
        setOrderState(order => order === "ASC" ? "DESC" : "ASC")
    }

    const list = useMemo(() => {
        
        return reports?.map(report => {
            return <Report key={report.createdAt} report={report} />
        })
    }, [reports])

    if(loading) return <Spinner />
    if(!reports) return <p>Błąd w pobieraniu raportów</p>

    return (
        <ContentTable>
            <div>
                <h1>Czas zaraportowany - {formatTime(summarizeDuration())}</h1>
                <button style={style.button} onClick={goBack}>Back</button>
                {/* <button style={style.button} onClick={th}>Call throttle</button>
                <button style={style.button} onClick={debounded_log}>Call debounce</button> */}
                <button style={style.button} onClick={setOrder}>Set order</button>
                {list}
            </div>
        </ContentTable>
    )
}

const style = {
    button: {
        border: "none",
        background: "transparent",
        borderLeft: "4px solid black",
        marginBottom: 30,
        cursor: "pointer"
    }
}