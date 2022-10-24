import gql from "graphql-tag";
import { TypedDocumentNode } from "@apollo/client";

interface GetStatusesWithTasksData {
    statuses: {
        name: string;
        tasks: {
            name: string;
        }[]
    }[]
}

export const STATUS_FRAGMENT = gql`
    fragment StatusNameAndId on Status {
        id,
        name
    }
`;

export const GET_STATUSES = gql`
    query Status {
        statuses {
            ...StatusNameAndId
        }
    }
    ${STATUS_FRAGMENT}
`;

export const GET_STATUSES_WITH_TASKS: TypedDocumentNode<GetStatusesWithTasksData>  = gql`
    query Status {
        statuses {
            name,
            tasks {
                name
            }
        }
    }`
;

export const GET_KANBAN_STATUSES = gql`
    query Status {
        statuses {
            ...StatusNameAndId
            tasks {
                id,
                name,
                priorityId {
                    id,
                    name
                },
                projectsId {
                    id,
                    name
                }
            }
        }
    }
    ${STATUS_FRAGMENT}
`;