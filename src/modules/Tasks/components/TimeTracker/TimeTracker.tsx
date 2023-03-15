import { TrackTimeHandler } from "modules/TimeReports/components/TimeReportHandler";
import { TimeReportsByTask } from "modules/TimeReports/components/TimeReports";
// import { Timer } from "modules/App/components/Timer/Timer";
// import Spinner from '../../../App/components/UI/Spinner/Spinner';
// import { useAddTimeReport } from "../../../TimeReports/hooks/useAddTimeReport";

// export function TimeTracker({ taskId, TimeReportsByTaskChildren  }: { taskId: number; TimeReportsByTaskChildren: any; }) {
//     const { operations, state } = useAddTimeReport({ taskId });
//     const { addTimeReport } = operations;
//     const { loading } = state;

//     function onTimerStop(duration: number) {
//         addTimeReport({ duration })
//     }

//     console.log('time tracker');
    

//     return (
//         <div>
//             <h3>Track time</h3>
//             <div style={{display: "flex"}}>
//                 <Timer operations={{onTimerStop}} /> {loading ? <Spinner /> : null}
//             </div>
//             <TimeReportsByTask taskId={taskId}>
//                 {TimeReportsByTaskChildren}
//             </TimeReportsByTask>
//         </div>
//     )
// }



export function TimeTracker({ taskId }: { taskId: number; }) {

    return (
        <div>
            <h3>Track time</h3>
            <TrackTimeHandler taskId={taskId} />
            <TimeReportsByTask taskId={taskId} />
        </div>
    )
}
