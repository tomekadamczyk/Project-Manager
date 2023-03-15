import gql from "graphql-tag";

export const ADD_PROJECT = gql`
    mutation addProject ($name: String!, $description: String, $statusId: Int!, $priorityId: Int!, $clientId: Int!) {
        addProject(name: $name, description: $description, statusId: $statusId, priorityId: $priorityId, clientId: $clientId){
            name,
            description,
            statusId {
                name
            },
            priorityId {
                name
            },
            clientId {
                name
            }
        }
    }
`;