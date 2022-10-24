import gql from "graphql-tag";

export const UPDATE_PROJECT = gql`
    mutation updateProject($id: Int!, $name: String, $description: String, $statusId: Int, $priorityId: Int) {
        updateProject(id: $id, name: $name, description: $description, statusId: $statusId, priorityId: $priorityId) {
            name,
            description,
            statusId {
                name
            },
            priorityId {
                name
            }
        }
    }
`;