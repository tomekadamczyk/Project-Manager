import gql from "graphql-tag";

export const ADD_TIME_REPORT = gql`
    mutation addTimeReport ($duration: Int!, $taskId: Int!) {
        addTimeReport(duration: $duration, taskId: $taskId) {
            duration,
            createdAt
        }
    }
`;