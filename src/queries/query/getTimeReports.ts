import gql from "graphql-tag";

export const GET_TIME_REPORTS = gql`
    query TimeReports {
        timeReports {
            duration,
            createdAt
        }
    }
`;

export const GET_TIME_REPORTS_BY_TASK = gql`
    query TimeReportsByTask($taskId: Int!, $limit: Int, $orderBy: TimeReportsOrderInput) {
        timeReportsByTask(taskId: $taskId, limit: $limit, orderBy: $orderBy) {
            duration,
            createdAt,
            uniqueId @client
        }
    }
`;
