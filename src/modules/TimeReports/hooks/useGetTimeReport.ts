import { useQuery } from "@apollo/client";
import { GET_TIME_REPORTS_BY_TASK } from "queries/query/getTimeReports";
import { TimeReportProps } from "modules/App/reactiveVariables/timeReportsVar/types";

interface GetTimeReportsByTaskVariables {
    taskId: number;
    limit: number | undefined;
    orderBy: {
        createdAt: "ASC" | "DESC"
    }
}

interface GetTimeReportsResult {
    timeReportsByTask: TimeReportProps[];
}

interface GetTimeReportsHookProps {
    taskId: number;
    limit?: number;
    order?: "ASC" | "DESC";
}

export function useGetTimeReports({ taskId, limit, order = "DESC" }: GetTimeReportsHookProps) {
    const { loading, error, data } = useQuery<GetTimeReportsResult, GetTimeReportsByTaskVariables>(GET_TIME_REPORTS_BY_TASK, {
        variables: {
            taskId,
            limit,
            orderBy: { createdAt: order }
        }
    });

    const reports = data?.timeReportsByTask;
    
    return { loading, error, reports };
}
