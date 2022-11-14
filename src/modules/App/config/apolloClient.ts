import { ApolloClient, from, makeVar, ReactiveVar } from '@apollo/client';
import { ToastProps } from '../components/Toaster/types';
import { cache } from './apolloCache';
import { httpLink, errorLink } from './apolloLink';

export const toastsVar: ReactiveVar<ToastProps[]> = makeVar<ToastProps[]>([]);

export const client = new ApolloClient({
    link: from([errorLink, httpLink]),
    cache,
})