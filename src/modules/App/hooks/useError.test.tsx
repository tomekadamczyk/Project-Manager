import "@testing-library/jest-dom";
import { WithErrorComponent } from "./WithError";
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { GraphQLError } from "graphql";
import { ApolloError } from "@apollo/client";
import { formatApolloError } from "utils/formatApolloError";

const serverErrorWithGraphQLResultErrorMessage = {
    graphQLErrors: [],
    clientErrors: [],
    networkError: {
        name: "ServerError",
        response: {},
        statusCode: 500,
        result: {
            errors: [{
                message: "Variable \"$projectId\" of non-null type \"Int!\" must not be null.",
                locations: [
                    {
                        line: 1,
                        column: 92
                    }
                ]
            }]
        }
    },
    message: "Response not successful: Received status code 500",
    extraInfo: undefined,
    name: 'NetworkError'
} as unknown as ApolloError

describe('should update error state', function() {

    test('display null error', async () => {
        render(
            <WithErrorComponent />
        )
        expect(screen.queryByRole('alert')).toBeNull();
    }) 


    test('display error from graphql', async () => {
        render(
            <WithErrorComponent apolloError={serverErrorWithGraphQLResultErrorMessage} />
        )
        const errorWrapper = screen.getByRole('alert');
        expect(errorWrapper).toBeInTheDocument();
        const apolloError = formatApolloError(serverErrorWithGraphQLResultErrorMessage);
        expect(errorWrapper.innerHTML).toEqual(apolloError?.message)
    }) 

})