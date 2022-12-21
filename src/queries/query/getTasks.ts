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
            projectId {,
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
    query TasksPaginated($offset: Int!, $limit: Int!, $orderBy: LinkOrderByInput, $filter: TaskFilterByInput) {
        tasksPaginated(offset: $offset, limit: $limit, orderBy: $orderBy, filter: $filter) {
            totalCount,
            edges {
                id,
                name,
                projectId {
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
            projectId {,
                id,
                name
            }
        }
    }
`;

export const GET_FILTERS = (filterQueryName: string, group: string) => gql`
    query statusFilters($group: String!) {
        ${filterQueryName}Filters(group: $group) {
            filter: ${group} {
                id,
                name
            }
        }
    }
`;