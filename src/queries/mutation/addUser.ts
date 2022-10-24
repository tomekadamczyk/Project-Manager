import gql from "graphql-tag";

export const ADD_USER = gql`
    mutation addUser ($name: String!, $email: String!, $password: String!) {
        addUser(name: $name, email: $email, password: $password){
            name
        }
    }
`;