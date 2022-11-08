import gql from "graphql-tag";

export const PROJECT_BASE_FRAGMENT = gql`
    fragment ProjectIdAndName on Project {
        id,
        name
    }
`;

export const GET_PROJECTS = gql`
    query Projects {
        projects {
            ...ProjectIdAndName
        }
    }
    ${PROJECT_BASE_FRAGMENT}
`;

export const GET_PROJECT_BY_ID = gql`
    query Project ($id: Int!){
        project (id: $id){
            ...ProjectIdAndName,
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
    ${PROJECT_BASE_FRAGMENT}
`;

export const GET_ALL_PROJECTS = gql`
    query Projects {
        projects {
            ...ProjectIdAndName,
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
    ${PROJECT_BASE_FRAGMENT}
`;