import gql from "graphql-tag";

export const GET_PROJECTS = gql`
    query Projects {
        projects {
            id,
            name
        }
    }
`;

export const GET_PROJECT_BY_ID = gql`
    query Project ($id: Int!){
        project (id: $id){
            id,
            name,
            tasks {
                id,
                name
            },
            description,
            statusId {
                id,
                name
            },
            priorityId {
                id,
                name
            },
            clientId {
                name
            }
        }
    }
`;

export const GET_ALL_PROJECTS = gql`
    query Projects {
        projects {
            id,
            name,
            tasks {
                name
            },
            statusId {,
                id,
                name
            },
            priorityId {
                id,
                name
            },
            clientId {
                name
            },
        }
    }
`;