import { HttpLink } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

export const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' });

export const errorLink = onError(({ graphQLErrors, networkError, forward }) => {

    if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
        );
    if (networkError) console.log(`[Network error]: ${networkError}`);
});