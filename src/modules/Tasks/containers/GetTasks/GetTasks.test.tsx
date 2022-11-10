import "@testing-library/jest-dom";
import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { createMockStore, Ref } from "@graphql-tools/mock";
import { render } from "modules/App/config/render";
import { schema } from "modules/App/config/schema";
import { GetTasks } from "./GetTasks";
import * as ApolloClient from '@apollo/client';

const store = createMockStore({ schema })


describe('should test Tasks render', function() {

    afterEach(() => {
        store.reset()
        jest.restoreAllMocks()
    })

    test('render Tasks', async () => {
        const tasksRef = store.get('Task', '1') as Ref
        store.set(tasksRef, 'name', 'Task One')
        store.set(tasksRef, 'description', 'description')
        store.set(tasksRef, 'statusId', { id: 1, name: "Status 1" })
        store.set(tasksRef, 'priorityId', { id: 1, name: "Priorytet 1" })
        store.set(tasksRef, 'projectsId', { name: "Projekt 1" })

        const useQuery = jest.spyOn(ApolloClient, 'useQuery');

        const resolvers = {
            Query: {
                tasks: () => [store.get('Task', 1)],
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
            <BrowserRouter>
                <GetTasks />
            </BrowserRouter>,
            { resolvers }
        )

        expect(useQuery).toHaveBeenCalled()
        expect(await screen.findByTestId('spinner')).toBeInTheDocument(); 
        await waitForElementToBeRemoved(() => screen.queryByTestId(/spinner/i))
        expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
        expect(await screen.findByText('Task One')).toBeInTheDocument()
    })

    test('should render network error information', async () => {

        const resolvers = {
            Query: {
                tasks: () => {
                    throw new Error('Brak zadań')
                }
            }
        }

        render(
            <BrowserRouter>
                <GetTasks />
            </BrowserRouter>,
            { resolvers }
        )

        expect(await screen.findByText('Nie mogę pobrać zadań')).toBeInTheDocument(); 
    })

    test('should render no data information', async () => {

        const resolvers = {
            Query: {
                tasks: () => []
            }
        }

        const useQuery = jest.spyOn(ApolloClient, 'useQuery');

        render(
            <BrowserRouter>
                <GetTasks />
            </BrowserRouter>,
            { resolvers }
        )

        expect(useQuery).toHaveBeenCalled()
        expect(await screen.findByTestId('spinner')).toBeInTheDocument(); 
        await waitForElementToBeRemoved(() => screen.queryByTestId(/spinner/i))
        expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
        expect(await screen.findByText('Brak zadań')).toBeInTheDocument(); 
    })
})