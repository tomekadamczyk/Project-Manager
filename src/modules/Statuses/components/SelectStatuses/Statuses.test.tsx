import React from "react";
import "@testing-library/jest-dom";
import { GET_STATUSES } from 'queries/query/getStatuses';
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { Statuses } from "./Statuses";
import { GraphQLError } from "graphql";
import { StatusesData } from './types';

type TypeWithTypename<T> = {
    [Property in keyof T]: T[Property] extends (infer ElementType)[] ? (ElementType & { __typename: string})[] : never;
};

interface Mock<T> extends MockedResponse {
    result?: {
        data: TypeWithTypename<T>;
    }
}

const mocks: Mock<StatusesData> = {
    request: {
        query: GET_STATUSES
    },
    result: {
        data: {
            statuses: [
                { __typename: "Status", id: 1, name: "Todo" },
                { __typename: "Status", id: 2, name: "In progress" }
            ]
        },
    }
};

describe('should test Statuses render', function() {
    function updateStatus(e: any) {
        return jest.fn()
    }
    let statusRef: React.MutableRefObject<undefined>;
    beforeEach(() => {
        jest.spyOn(React, 'useRef').mockReturnValue({
            current: null,
        })
        statusRef = React.useRef()
    })

    test("renders without error", async () => {
        render(
            <MockedProvider mocks={[mocks]} addTypename={false}>
                <Statuses ref={statusRef} onSelectCallback={updateStatus} />
            </MockedProvider>
        );
        
        expect(await screen.findByText("Wybierz status")).toBeInTheDocument();
        expect(await screen.findByText("Todo")).toBeInTheDocument();
    });

    test("render fetch error", async () => {
        const errorMock = {
            ...mocks,
            error: new Error('Wystąpił error')
        }
        render(
            <MockedProvider mocks={[errorMock]} addTypename={false}>
                <Statuses ref={statusRef} onSelectCallback={updateStatus} />
            </MockedProvider>
        );
        expect(await screen.findByText("Nie mogę pobrać statusów")).toBeInTheDocument();
    });

    test("render graphql error", async () => {
        const errorMock = {
            ...mocks,
            result: {
                ...mocks.result,
                errors: [new GraphQLError("Error!")],
            }
        }
        render(
            <MockedProvider mocks={[errorMock]} addTypename={false}>
                <Statuses ref={statusRef} onSelectCallback={updateStatus} />
            </MockedProvider>
        );
        expect(await screen.findByText("Nie mogę pobrać statusów")).toBeInTheDocument();
    });

    test("render status change", async () => {
        render(
            <MockedProvider mocks={[mocks]} addTypename={false}>
                <Statuses ref={statusRef} onSelectCallback={updateStatus} />
            </MockedProvider>
        );

        expect(await screen.findByText("Wybierz status")).toBeInTheDocument();
        const select = screen.getByRole('combobox', { name: 'Wybierz status z listy'});
        await userEvent.selectOptions(select, '2')
        let options = screen.getAllByRole('option') as HTMLOptionElement[]
        
        expect(options[1].selected).toBeFalsy();
        expect(options[2].selected).toBeTruthy();
    });
})

