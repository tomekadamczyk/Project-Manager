import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { GetProjects } from "./GetProjects";
import { GraphQLError } from "graphql";
import { BrowserRouter } from 'react-router-dom';
import { GET_ALL_PROJECTS } from "queries/query/getProjects";

const projects = [{
    id: 1,
    name: 'projekt 1',
    tasks: [
        {
            name: 'zadanie 1 z projektu 1'
        }
    ],
    statusId: {
        id: 1,
        name: 'Status 1 projektu 1'
    },
    priorityId: {
        id: 1,
        name: 'priorytet 1 projektu 1'
    },
    clientId: {
        name: 'Tomek'
    },
},{
    id: 2,
    name: 'projekt 2',
    tasks: [
        {
            name: 'zadanie 1 z projektu 2'
        }
    ],
    statusId: {
        id: 1,
        name: 'Status 1 projektu 2'
    },
    priorityId: {
        id: 1,
        name: 'priorytet 1 projektu 2'
    },
    clientId: {
        name: 'Tomek'
    },
}]

const mocks = {
    request: {
        query: GET_ALL_PROJECTS
    },
    result: {
        data: {
            projects
        },
        loading: false,
        networkStatus: 7
    }
};

describe('should test Projects render', function() {

    test("renders without error", async () => {
        render(
            <BrowserRouter>
                <MockedProvider mocks={[mocks]} addTypename={false}>
                    <GetProjects  />
                </MockedProvider>
            </BrowserRouter>
        );
    
        expect(await screen.findByText("projekt 1")).toBeInTheDocument();
        expect(await screen.findByText("projekt 2")).toBeInTheDocument();
    });

    // test("render fetch error", async () => {
    //     const errorMock = {
    //         ...mocks,
    //         error: new Error('Wystąpił error')
    //     }
    //     render(
    //         <MockedProvider mocks={[errorMock]} addTypename={false}>
    //             <Clients ref={clientsRef} onSelectCallback={updateProject} />
    //         </MockedProvider>
    //     );
    //     expect(await screen.findByText("Nie mogę pobrać klientów")).toBeInTheDocument();
    // });

    // test("render graphql error", async () => {
    //     const errorMock = {
    //         ...mocks,
    //         result: {
    //             ...mocks.result,
    //             errors: [new GraphQLError("Error!")],
    //         }
    //     }
    //     render(
    //         <MockedProvider mocks={[errorMock]} addTypename={false}>
    //             <Clients ref={clientsRef} onSelectCallback={updateProject} />
    //         </MockedProvider>
    //     );
    //     expect(await screen.findByText("Nie mogę pobrać klientów")).toBeInTheDocument();
    // });
})

