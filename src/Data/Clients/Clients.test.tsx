import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { Clients } from "./Clients";
import { GraphQLError } from "graphql";
import userEvent from "@testing-library/user-event";
import { GET_CLIENTS } from "queries/query/getClient";

const mocks = {
    request: {
        query: GET_CLIENTS
    },
    result: {
        data: {
            clients: [
                { __typename: "Client", id: 1, name: "Klient 1" },
                { __typename: "Client", id: 2, name: "Klient 2" }
            ]
        },
        loading: false,
        networkStatus: 7
    }
};

describe('should test Clients render', function() {
    function updateProject(e: any) {
        return jest.fn()
    }
    let clientsRef: React.MutableRefObject<undefined>;
    beforeEach(() => {
        jest.spyOn(React, 'useRef').mockReturnValue({
            current: null,
        })
        clientsRef = React.useRef()
    })

    test("renders without error", async () => {
        render(
            <MockedProvider mocks={[mocks]} addTypename={false}>
                <Clients ref={clientsRef} onSelectCallback={updateProject} />
            </MockedProvider>
        );
    
        expect(await screen.findByText("Wybierz klienta")).toBeInTheDocument();
        expect(await screen.findByText("Klient 1")).toBeInTheDocument();
    });

    test("render fetch error", async () => {
        const errorMock = {
            ...mocks,
            error: new Error('Wystąpił error')
        }
        render(
            <MockedProvider mocks={[errorMock]} addTypename={false}>
                <Clients ref={clientsRef} onSelectCallback={updateProject} />
            </MockedProvider>
        );
        expect(await screen.findByText("Nie mogę pobrać klientów")).toBeInTheDocument();
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
                <Clients ref={clientsRef} onSelectCallback={updateProject} />
            </MockedProvider>
        );
        expect(await screen.findByText("Nie mogę pobrać klientów")).toBeInTheDocument();
    });

    test("render status change", async () => {
        render(
            <MockedProvider mocks={[mocks]} addTypename={false}>
                <Clients ref={clientsRef} onSelectCallback={updateProject} />
            </MockedProvider>
        );

        expect(await screen.findByText("Wybierz klienta")).toBeInTheDocument();
        const select = screen.getByRole('combobox');
        await userEvent.selectOptions(select, '1')
        let options = screen.getAllByRole('option') as HTMLOptionElement[]
        
        expect(options[1].selected).toBeTruthy();
        expect(options[2].selected).toBeFalsy();
    });
})

