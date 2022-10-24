import gql from "graphql-tag";

export const LOGIN = gql`
    mutation LoginMutation($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            name
        }
    }
`