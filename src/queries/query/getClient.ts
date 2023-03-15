import gql from "graphql-tag";

export const GET_CLIENTS = gql`
    query Clients {
        clients {
            id,
            name
        }
    }
`;