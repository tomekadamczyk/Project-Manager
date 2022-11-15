import { ApolloClient, from, makeVar, ReactiveVar } from '@apollo/client';
import { ToastProps } from '../components/Toaster/types';
import { cache } from './apolloCache';
import { httpLink, errorLink } from './apolloLink';
import { ApolloLink } from '@apollo/client';
import { ConfigToast } from './Toasts/ConfigToasts';

const timeStartLink = new ApolloLink((operation, forward) => {
  const renderToast = ConfigToast();

  return forward(operation).map(data => {
    
    if(data.data) {
      Object.keys(data.data).forEach(key => {
        renderToast(key);
      })
    }
    return data
  })
});

export const toastsVar: ReactiveVar<ToastProps[]> = makeVar<ToastProps[]>([]);

export const client = new ApolloClient({
    link: from([timeStartLink, errorLink, httpLink]),
    cache,
})