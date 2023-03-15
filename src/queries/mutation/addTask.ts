import gql from "graphql-tag";

export const ADD_TASK = gql`
    mutation addTask ($name: String!, $description: String, $statusId: Int!, $priorityId: Int!, $projectId: Int!) {
        addTask(name: $name, description: $description, statusId: $statusId, priorityId: $priorityId, projectId: $projectId){
            name,
            description,
            statusId {
                name
            },
            priorityId {
                name
            },
            projectId
        }
    }
`;