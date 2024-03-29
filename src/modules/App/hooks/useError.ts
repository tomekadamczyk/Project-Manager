import { ApolloError } from "@apollo/client"
import { useState } from "react";
import { formatApolloError } from "utils/formatApolloError"

export const useError = () => {
    const [error, setError] = useState<string>();

    function getError(apolloError: any) {
        if(apolloError instanceof ApolloError) {
            const error = JSON.parse(JSON.stringify(apolloError));
            const formated = formatApolloError(error);
            setError(formated?.message);
        } else {
            setError(undefined);
        }
    }

    return {error, getError}
}