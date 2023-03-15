import "@testing-library/jest-dom";
import { GetProjects } from "./GetProjects";
import { GraphQLError } from "graphql";
import { BrowserRouter } from 'react-router-dom';
import { GET_ALL_PROJECTS } from "queries/query/getProjects";

import { screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import { createMockStore, Ref } from "@graphql-tools/mock";
import { render } from "../../../App/config/render";
import { schema } from "../../../App/config/schema";
import * as ApolloClient from '@apollo/client';

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

// describe('should test Projects render', function() {

//     test("renders without error", async () => {
//         render(
//             <BrowserRouter>
//                 <MockedProvider mocks={[mocks]} addTypename={false}>
//                     <GetProjects  />
//                 </MockedProvider>
//             </BrowserRouter>
//         );
    
//         expect(await screen.findByText("projekt 1")).toBeInTheDocument();
//         expect(await screen.findByText("projekt 2")).toBeInTheDocument();
//     });

//     // test("render fetch error", async () => {
//     //     const errorMock = {
//     //         ...mocks,
//     //         error: new Error('Wystąpił error')
//     //     }
//     //     render(
//     //         <MockedProvider mocks={[errorMock]} addTypename={false}>
//     //             <Clients ref={clientsRef} onSelectCallback={updateProject} />
//     //         </MockedProvider>
//     //     );
//     //     expect(await screen.findByText("Nie mogę pobrać klientów")).toBeInTheDocument();
//     // });

//     // test("render graphql error", async () => {
//     //     const errorMock = {
//     //         ...mocks,
//     //         result: {
//     //             ...mocks.result,
//     //             errors: [new GraphQLError("Error!")],
//     //         }
//     //     }
//     //     render(
//     //         <MockedProvider mocks={[errorMock]} addTypename={false}>
//     //             <Clients ref={clientsRef} onSelectCallback={updateProject} />
//     //         </MockedProvider>
//     //     );
//     //     expect(await screen.findByText("Nie mogę pobrać klientów")).toBeInTheDocument();
//     // });
// })



jest.mock('react-router-dom', () => {
    const router = jest.requireActual('react-router-dom')
    return {
        ...router,
        useParams: () => ({
            id: 1
        })
    }
})

jest.mock("modules/Statuses/components/SelectStatuses/Statuses.tsx");
jest.mock("modules/Priorities/components/SelectPriorities/Priorities.tsx");

describe('should test Projects render', function() {
    const store = createMockStore({ schema })

    afterEach(() => {
        store.reset()
        jest.restoreAllMocks()
    })

    test('should fetch data correctly', async () => {
        const projectRef = store.get('Project', '1') as Ref

        store.set(projectRef, 'name', 'projekt 1')
        store.set(projectRef, 'description', 'description')
        store.set(projectRef, 'tasks', [
            { id: 14, name: "test" },
            { id: 22, name: "1fds" },
        ])
        store.set(projectRef, 'statusId', { id: 1, name: "Status 1" })
        store.set(projectRef, 'priorityId', { id: 1, name: "Priorytet 1" })
        store.set(projectRef, 'clientId', { name: "Tomek2" })
        const resolvers = {
            Query: {
                projects: () => [store.get('Project', 1)]
            },
            Project: {
                id: () => 1,
                name: (obj: Ref) => store.get(obj, 'name'),
                description: (obj: Ref) => store.get(obj, 'name'),
                statusId: (obj: Ref) => {
                    const statusRef = store.get(obj, 'statusId') as Ref;
                    return ({ id: store.get(statusRef, 'id'), name: store.get(statusRef, 'name')})
                },
                priorityId: (obj: Ref) => {
                    const priorityRef = store.get(obj, 'priorityId') as Ref;
                    return ({ id: store.get(priorityRef, 'id'), name: store.get(priorityRef, 'name')})
                },
                tasks: (obj: Ref) => {
                    const tasksRef = store.get(obj, 'tasks') as Ref[];
                    return tasksRef.map(ref => ({
                        id: store.get(ref, 'id'),
                        name: store.get(ref, 'name')
                    }))
                },
                clientId: (obj: Ref) => {
                    const clientRef = store.get(obj, 'clientId') as Ref;
                    return ({ name: store.get(clientRef, 'name')})
                },
            }
        }

        const useQuery = jest.spyOn(ApolloClient, 'useQuery')
        
        render(
            <BrowserRouter>
                <GetProjects />
            </BrowserRouter>,
            { resolvers }
        );

        expect(useQuery).toHaveBeenCalled()
        expect(await screen.findByTestId('spinner')).toBeInTheDocument(); 
        await waitForElementToBeRemoved(() => screen.queryByTestId(/spinner/i))
        expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
        expect(await screen.findByText("projekt 1")).toBeInTheDocument();
        
    })
})