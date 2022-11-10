import { ApolloError } from '@apollo/client';
import { useEffect } from 'react';
import { useError } from './useError';

interface WithErrorProps {
    apolloError?: ApolloError;
}

export function WithErrorComponent({ apolloError }: WithErrorProps) {
    const {error, getError} = useError();

    useEffect(() => {
        if(apolloError) {
            getError(apolloError)
        }
    }, [apolloError, getError])

    return(
        error ? <div role="alert">{error}</div> : null
    )
}