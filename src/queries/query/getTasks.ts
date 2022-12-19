import gql from "graphql-tag";

export const GET_TASKS = gql`
    query Tasks {
        tasks {
            id,
            name
        }
    }
`;


export const GET_ALL_TASKS = gql`
    query Tasks {
        tasks {
            id,
            name,
            projectsId {,
                id,
                name
            },
            statusId {
                id,
                name
            },
            priorityId {
                id,
                name
            }
        }
    }
`;

export const GET_TASKS_PAGINATED = gql`
    query TasksPaginated($offset: Int!, $limit: Int!) {
        tasksPaginated(offset: $offset, limit: $limit) {
            totalCount,
            edges {
                id,
                name,
                projectsId {
                    id,
                    name
                },
                statusId {
                    id,
                    name
                },
                priorityId {
                    id,
                    name
                }
            }
        }
    }
`;

export const GET_TASK_BY_ID = gql`
    query Task ($id: Int!){
        task (id: $id){
            id,
            name,
            description,
            statusId {
                id,
                name
            },
            priorityId {
                id,
                name
            },
            projectsId {,
                id,
                name
            }
        }
    }
`;