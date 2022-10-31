import { ApolloError } from "@apollo/client";

export const formatApolloError = (error?: ApolloError): ApolloError | undefined => {
    if (!error) return undefined;
  
    if (
      error.networkError &&
      'result' in error.networkError &&
      'errors' in error.networkError.result &&
      error.networkError.result.errors.length
    ) {
      const networkError = error.networkError.result.errors[0];
    //   if (networkError.extensions.code === 'BAD_USER_INPUT') {
    //     error.message = networkError.message.split(';').slice(-1)[0].trim();
    //   } else {
    //     error.message = networkError.message;
    //   }
        error.message = networkError.message;
    }
  
    if (error.graphQLErrors && error.graphQLErrors.length) {
      error.message = error.graphQLErrors[0].message;
    }
  
    return error;
};