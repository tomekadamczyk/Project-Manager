import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { MockedProvider } from "@apollo/client/testing";
import { ADD_PROJECT } from "queries/mutation/addProject";
import { AddProject } from "./AddProject";
import { GraphQLError } from "graphql";
import { errorsDictionary, ErrorType } from "modules/App/config/ErrorMessages/AddTaskMessages";

jest.mock("modules/Statuses/components/SelectStatuses/Statuses.tsx");
jest.mock("modules/Clients/components/SelectClients/Clients.tsx");
jest.mock("modules/Priorities/components/SelectPriorities/Priorities.tsx");

describe('should test Project insert', function() {
    test("renders without error", async () => {
        render(
            <MockedProvider mocks={[]} addTypename={false}>
                <AddProject />
            </MockedProvider>
        );
        
        expect(await screen.findByText("Dodaj projekt")).toBeInTheDocument();
    });

    test("should render loading and success state on create button click", async function() {

        const mocks = [
            {
                request: {
                    query: ADD_PROJECT,
                    variables: { name: "Projekt 1", description: "Opis Projekt 1", statusId: 1, clientId: 1, priorityId: 1 }
                },
                result: {
                    data: {
                        addProject: {
                            name: "Projekt 1",
                            description: "Opis Projekt 1",
                            statusId: {
                                name: "Todo",
                            },
                            clientId: {
                                name: "Klient 1",
                            },
                            priorityId: {
                                name: "high",
                            }
                        }
                    },
                },
            }
        ];
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <AddProject />
            </MockedProvider>
        );

        const button = await screen.findByRole('button', { name: 'Przycisk Dodaj projekt'});
        userEvent.click(button);
        
        const buttonAgain = await screen.findByRole('button', { name: 'Przycisk Dodaj projekt'});
        expect(buttonAgain).toHaveClass('loading')
        expect(buttonAgain).toBeDisabled()
    })

    test("should no priority chosen error", async () => {

        const mocks = [
            {
                request: {
                    query: ADD_PROJECT,
                    variables: { name: "", description: "", statusId: 1, clientId: 1, priorityId: 0 }
                },
                result: {
                    data: {
                        addProject: {}
                    },
                    errors: [new GraphQLError(errorsDictionary[ErrorType.PRIORITY_FOREIGN_KEY_CONSTRAINT_FAILS_2].message)]
                },
                
            }
        ];
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <AddProject />
            </MockedProvider>
        );

        const clientSelect = await screen.findByTestId('clients-select-options');
        await userEvent.selectOptions(clientSelect, '1')
        const statusSelect = await screen.findByTestId('status-select-options');
        await userEvent.selectOptions(statusSelect, '1')

        const button = await screen.findByRole('button', { name: 'Przycisk Dodaj projekt'});
        userEvent.click(button);
        const buttonAgain = await screen.findByRole('button', { name: 'Przycisk Dodaj projekt'});
        expect(buttonAgain).toHaveClass('loading')

        expect(await screen.findByText('Wybierz priorytet z listy')).toBeInTheDocument();

        const buttonAgain2 = await screen.findByRole('button', { name: 'Przycisk Dodaj projekt'});
        expect(buttonAgain2).not.toHaveClass('loading')
    })

    test("should no status chosen error", async () => {

        const mocks = [
            {
                request: {
                    query: ADD_PROJECT,
                    variables: { name: "", description: "", statusId: 0, clientId: 1, priorityId: 1 }
                },
                result: {
                    data: {
                        addTask: {}
                    },
                    errors: [new GraphQLError(errorsDictionary[ErrorType.STATUS_FOREIGN_KEY_CONSTRAINT_FAILS_2].message)]
                },
                
            }
        ];
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <AddProject />
            </MockedProvider>
        );

        const clientSelect = await screen.findByTestId('clients-select-options');
        await userEvent.selectOptions(clientSelect, '1')
        const prioritySelect = await screen.findByTestId('priority-select-options');
        await userEvent.selectOptions(prioritySelect, '1')

        const button = await screen.findByRole('button', { name: 'Przycisk Dodaj projekt'});
        userEvent.click(button);

        const buttonAgain = await screen.findByRole('button', { name: 'Przycisk Dodaj projekt'});
        expect(buttonAgain).toHaveClass('loading')

        expect(await screen.findByText('Wybierz status z listy')).toBeInTheDocument();

        const buttonAgain2 = await screen.findByRole('button', { name: 'Przycisk Dodaj projekt'});
        expect(buttonAgain2).not.toHaveClass('loading')
    })

    test("should no client chosen error", async () => {

        const mocks = [
            {
                request: {
                    query: ADD_PROJECT,
                    variables: { name: "", description: "", statusId: 1, clientId: Number('choose'), priorityId: 1 }
                },
                result: {
                    data: {
                        addTask: {
                            name: "",
                            description: "",
                            statusId: {
                                name: "",
                            },
                            clientId: {
                                name: "",
                            },
                            priorityId: {
                                name: "",
                            }
                        }
                    },
                    errors: [new GraphQLError(errorsDictionary[ErrorType.CLIENT_FOREIGN_KEY_CONSTRAINT_FAILS].message)]
                },
                
            }
        ];
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <AddProject />
            </MockedProvider>
        );

        const clientSelect = await screen.findByTestId('clients-select-options');
        await userEvent.selectOptions(clientSelect, 'choose')
        const statusSelect = await screen.findByTestId('status-select-options');
        await userEvent.selectOptions(statusSelect, '1')
        const prioritySelect = await screen.findByTestId('priority-select-options');
        await userEvent.selectOptions(prioritySelect, '1')
        
        const button = await screen.findByRole('button', { name: 'Przycisk Dodaj projekt'});
        userEvent.click(button);
        const buttonAgain = await screen.findByRole('button', { name: 'Przycisk Dodaj projekt'});
        expect(buttonAgain).toHaveClass('loading')
        expect(await screen.findByText('Wybierz klienta z listy')).toBeInTheDocument();
    })
})

