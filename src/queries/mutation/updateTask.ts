import gql from "graphql-tag";

export const UPADTE_TASK = gql`
    mutation updateTask($id: Int!, $statusId: Int) {
        updateTask(id: $id, statusId: $statusId) {
            statusId {
                id,
                name
            }
        }
    }
`;


export const UPDATE_FULL_TASK = gql`
    mutation updateTask($id: Int!, $name: String, $description: String, $statusId: Int, $priorityId: Int) {
        updateTask(id: $id, name: $name, description: $description, statusId: $statusId, priorityId: $priorityId) {
            name,
            description,
            statusId {
                name
            },
            priorityId {
                id,
                name
            }
        }
    }
`;