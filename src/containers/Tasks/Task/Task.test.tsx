import "@testing-library/jest-dom";
import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import { createMockStore, Ref } from "@graphql-tools/mock";
import { render } from "../../../config/render";
import { schema } from "../../../config/schema";
import { Task } from "./Task";
import * as ApolloClient from '@apollo/client';

const store = createMockStore({ schema })

jest.mock("Data/Statuses/Statuses");
jest.mock("Data/Priorities/Priorities");

describe('should test Tasks render', function() {

    beforeEach(() => {
        const tasksRef = store.get('Task', '1') as Ref
        store.set(tasksRef, 'name', 'Task One')
        store.set(tasksRef, 'description', 'description')
        store.set(tasksRef, 'statusId', { id: 1, name: "Status 1" })
        store.set(tasksRef, 'priorityId', { id: 1, name: "Priorytet 1" })
        store.set(tasksRef, 'projectsId', { name: "Projekt 1" })
    })

    afterEach(() => {
        store.reset()
        jest.restoreAllMocks()
    })

    test('render Tasks', async () => {

        const useQuery = jest.spyOn(ApolloClient, 'useQuery');

        const resolvers = {
            Query: {
                task: (_: unknown, { id }: { id: number }) => store.get('Task', id)
            },
            Task: {
                id: (obj: Ref) => store.get(obj, 'id'),
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
                projectsId: (obj: Ref) => {
                    const projectsRef = store.get(obj, 'projectsId') as Ref;
                    return ({ id: store.get(projectsRef, 'id'), name: store.get(projectsRef, 'name')})
                }
            }
        }

        render(
            <MemoryRouter initialEntries={["/tasks/1"]}>
                <Routes>
                    <Route path='tasks/:id' element={<Task />} /> 
                </Routes>
            </MemoryRouter>,
            { resolvers }
        )

        expect(useQuery).toHaveBeenCalled()
        expect(await screen.findByText('loading')).toBeInTheDocument(); 
        await waitForElementToBeRemoved(() => screen.queryByText(/loading/i))
        expect(screen.queryByText('loading')).not.toBeInTheDocument();
        const tasksRef = store.get('Task', '1') as Ref
        expect(store.get(tasksRef, 'name')).toBe('Task One');
    })

    test('should render network error information', async () => {

        const resolvers = {
            Query: {
                task: () => {
                    throw new Error('Brak danych zadania')
                }
            }
        }

        render(
            <MemoryRouter initialEntries={["/tasks/1"]}>
                <Routes>
                    <Route path='tasks/:id' element={<Task />} /> 
                </Routes>
            </MemoryRouter>,
            { resolvers }
        )

        expect(await screen.findByText('Nie mogę pobrać danych zadania')).toBeInTheDocument(); 
    })

    test('should render no data information', async () => {

        const resolvers = {
            Query: {
                task: (_: unknown, { id }: { id: number }) => null
            }
        }

        const useQuery = jest.spyOn(ApolloClient, 'useQuery');

        render(
            <MemoryRouter initialEntries={["/tasks/1"]}>
                <Routes>
                    <Route path='tasks/:id' element={<Task />} /> 
                </Routes>
            </MemoryRouter>,
            { resolvers }
        )

        expect(useQuery).toHaveBeenCalled()
        expect(await screen.findByText('loading')).toBeInTheDocument(); 
        await waitForElementToBeRemoved(() => screen.queryByText(/loading/i))
        expect(screen.queryByText('loading')).not.toBeInTheDocument();
        expect(await screen.findByText('Brak danych zadania')).toBeInTheDocument(); 
    })
})