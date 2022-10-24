import React from "react";
import "@testing-library/jest-dom";
import { GET_PRIORITIES } from 'queries/query/getPriorities';
import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { Priorities } from "./Priorities";
import { GraphQLError } from "graphql";
import userEvent from "@testing-library/user-event";

const mocks = {
    request: {
        query: GET_PRIORITIES
    },
    result: {
        data: {
            priorities: [
                { __typename: "Priority", id: 1, name: "Normal" },
                { __typename: "Priority", id: 2, name: "High" }
            ]
        },
        loading: false,
        networkStatus: 7
    }
};

describe('should test Priorities render', function() {
    function updatePriority(e: any) {
        return jest.fn()
    }
    let priorityRef: React.MutableRefObject<undefined>;
    beforeEach(() => {
        jest.spyOn(React, 'useRef').mockReturnValue({
            current: null,
        })
        priorityRef = React.useRef()
    })

    test("renders without error", async () => {
        
        render(
            <MockedProvider mocks={[mocks]} addTypename={false}>
                <Priorities ref={priorityRef} onSelectCallback={updatePriority} />
            </MockedProvider>
        );
    
        expect(await screen.findByText("Wybierz priorytet")).toBeInTheDocument();
    });

    test("render fetch error", async () => {
        const errorMock = {
            ...mocks,
            error: new Error('Wystąpił error')
        }
        render(
            <MockedProvider mocks={[errorMock]} addTypename={false}>
                <Priorities ref={priorityRef} onSelectCallback={updatePriority} />
            </MockedProvider>
        );
        expect(await screen.findByText("Nie mogę pobrać priorytetów")).toBeInTheDocument();
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
                <Priorities ref={priorityRef} onSelectCallback={updatePriority} />
            </MockedProvider>
        );
        expect(await screen.findByText("Nie mogę pobrać priorytetów")).toBeInTheDocument();
    });

    test("render status change", async () => {
        render(
            <MockedProvider mocks={[mocks]} addTypename={false}>
                <Priorities ref={priorityRef} onSelectCallback={updatePriority} />
            </MockedProvider>
        );

        expect(await screen.findByText("Wybierz priorytet")).toBeInTheDocument();
        const select = screen.getByTestId('priorities-select-options');
        await userEvent.selectOptions(select, '1')
        let options = screen.getAllByRole('option') as HTMLOptionElement[]
        
        expect(options[1].selected).toBeTruthy();
        expect(options[2].selected).toBeFalsy();
    });
})

