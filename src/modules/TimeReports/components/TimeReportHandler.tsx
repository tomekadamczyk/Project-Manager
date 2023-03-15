
import { Timer } from "modules/App/components/Timer/Timer";
import Spinner from 'modules/App/components/UI/Spinner/Spinner';
import { useAddTimeReport } from "../../TimeReports/hooks/useAddTimeReport";
import { SummarizedTrackedTime } from "./SummarizedTrackedTime";
import { Estimator, EstimatorReceiver } from "../../Tasks/components/Estimator/Estimator";

export function TrackTimeHandler({ taskId }: { taskId: number; }) {
    const { operations, state } = useAddTimeReport({ taskId });
    const { addTimeReport } = operations;
    const { loading } = state;

    function onTimerStop(duration: number) {
        addTimeReport({ duration })
    }

    return (
        <>
            <div style={{display: "flex", flexDirection: "column", marginBottom: 10}}>
                <Timer operations={{onTimerStop}} /> {loading ? <Spinner /> : null}
                <SummarizedTrackedTime taskId={taskId} />
                <EstimatorReceiver />
            </div>
            {/* <div style={{marginBottom: 30}}>
                <Estimator />
            </div> */}
        </>
    )
}