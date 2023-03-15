import "@testing-library/jest-dom";
import { screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { createMockStore, Ref } from "@graphql-tools/mock";
import { render } from "../../../App/config/render";
import { schema } from "../../../App/config/schema";
import { UpdateProps } from "./types";
import { Project } from "./Project";
import * as ApolloClient from '@apollo/client';
import { act } from "react-dom/test-utils";

// const mockedUseQuery = jest.fn().mockResolvedValue({
//     loading: false,
//     data: {
//         id: 1,
//         name: 'test1',
//         description: 'description',
//         statusId: { id: 1, name: "Status 1" },
//         priorityId: { id: 1, name: "Priorytet 1" },
//         tasks: [
//             { id: 14, name: "test" },
//             { id: 22, name: "qw" },
//         ],
//         clientId: { name: "Tomek2" }
//     },
//     error: null
// })

// jest.mock('@apollo/client', () => {
//     const apollo = jest.requireActual('@apollo/client')
//     return {
//         ...apollo,
//         useQuery: () => mockedUseQuery()
//     }
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

    beforeEach(() => {
        const projectRef = store.get('Project', '1') as Ref

        store.set(projectRef, 'name', 'test1')
        store.set(projectRef, 'description', 'description')
        store.set(projectRef, 'tasks', [
            { id: 14, name: "test" },
            { id: 22, name: "1fds" },
        ])
        store.set(projectRef, 'statusId', { id: 1, name: "Status 1" })
        store.set(projectRef, 'priorityId', { id: 1, name: "Priorytet 1" })
        store.set(projectRef, 'clientId', { name: "Tomek2" })
    })

    afterEach(() => {
        store.reset()
        jest.restoreAllMocks()
    })

    test('should fetch data correctly', async () => {

        const resolvers = {
            Query: {
                project: (_: unknown, { id }: { id: number }) => store.get('Project', id)
            },
            Mutation: {
                updateProject(_: unknown, { name, description }: UpdateProps) {

                    const projectRef = store.get('Project', '1') as Ref
                    store.set(projectRef, 'name', name)
                    store.set(projectRef, 'description', description)
                    
                    return projectRef
                },
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
            <MemoryRouter initialEntries={["/projects/1"]}>
                <Routes>
                    <Route path='projects/:id' element={<Project />} /> 
                </Routes>
            </MemoryRouter>,
            { resolvers }
        );

        expect(useQuery).toHaveBeenCalled()
        expect(await screen.findByText('loading')).toBeInTheDocument(); 
        await waitForElementToBeRemoved(() => screen.queryByText(/loading/i))
        expect(screen.queryByText('loading')).not.toBeInTheDocument();
        
    })

    test('update on status select change', async () => {

        const resolvers = {
            Query: {
                project: (_: unknown, { id }: { id: number }) => store.get('Project', id)
            },
            Mutation: {
                updateProject(_: unknown, { name, statusId }: UpdateProps) {

                    const projectRef = store.get('Project', '1') as Ref
                    store.set(projectRef, 'name', name)
                    store.set(projectRef, 'statusId', statusId)
                    
                    return projectRef
                },
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
        
        render(
            <MemoryRouter initialEntries={["/projects/1"]}>
                <Routes>
                    <Route path='projects/:id' element={<Project />} /> 
                </Routes>
            </MemoryRouter>,
            { resolvers }
        );
            
        const statusSelect = await screen.findByTestId('status-select-options');
        await userEvent.selectOptions(statusSelect, '1')
        
        expect(await screen.findByText('update loading')).toBeInTheDocument();
        await waitForElementToBeRemoved(() => screen.queryByText(/update loading/i))
        expect(screen.queryByText('update loading')).not.toBeInTheDocument();
        
    })

    test('update on name change', async () => {
        const resolvers = {
            Query: {
                project: (_: unknown, { id }: { id: number }) => store.get('Project', id)
            },
            Mutation: {
                updateProject(_: unknown, { name, description }: UpdateProps) {

                    const projectRef = store.get('Project', '1') as Ref
                    store.set(projectRef, 'name', name)
                    store.set(projectRef, 'description', description)
                    
                    return projectRef
                },
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
    
        render(
            <MemoryRouter initialEntries={["/projects/1"]}>
                <Routes>
                    <Route path='projects/:id' element={<Project />} /> 
                </Routes>
            </MemoryRouter>,
            { resolvers }
        );

        const nameInput = await screen.findByTestId('project-name-input');
        await userEvent.clear(nameInput);
        await userEvent.type(nameInput, '1ew');
        
        act(() => {
            nameInput.blur()
        })
        
        expect(await screen.findByText('update loading')).toBeInTheDocument(); 
        await waitForElementToBeRemoved(() => screen.queryByText(/update loading/i))
        expect(await screen.findByTestId('project-name-input')).toHaveValue('1ew');
    })
})