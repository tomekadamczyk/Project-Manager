import gql from "graphql-tag";

export const GET_PRIORITIES = gql`
    query Priorities {
        priorities {
            id,
            name
        }
    }
`;

export const GET_PRIORITY = gql`
    query Priority ($id: Int!){
        priority (id: $id){
            name,
            tasks {
                id,
                name,
                statusId {
                    name
                }
            }
        }
    }`
;
