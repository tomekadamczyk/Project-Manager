import { ApolloClient, from } from '@apollo/client';
import { cache } from './apolloCache';
import { httpLink, errorLink } from './apolloLink';

export const client = new ApolloClient({
    link: from([errorLink, httpLink]),
    cache,
})