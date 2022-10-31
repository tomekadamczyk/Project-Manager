import "@testing-library/jest-dom";
import { findByRole, render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { ADD_TASK } from "../../../queries/mutation/addTask";
import { AddTask } from "./AddTask";
import { GraphQLError } from "graphql";
import { errorsDictionary, ErrorType } from "config/ErrorMessages/AddTaskMessages";

jest.mock("Data/Statuses/Statuses");
jest.mock("Data/Projects/Projects");
jest.mock("Data/Priorities/Priorities");

describe('should test Task insert', function() {
    function updateStatus(e: any) {
        return jest.fn()
    }

    test("renders without error", async () => {
        render(
            <MockedProvider mocks={[]} addTypename={false}>
                <AddTask />
            </MockedProvider>
        );
        
        expect(await screen.findByText("Dodaj zadanie")).toBeInTheDocument();
    });

    test("should render loading and success state on create button click", async function() {

        const mocks = [
            {
                request: {
                    query: ADD_TASK,
                    variables: { name: "Zadanie 1", description: "Opis zadania 1", statusId: 1, projectId: 1, priorityId: 1 }
                },
                result: {
                    data: {
                        addTask: {
                            name: "Zadanie 1",
                            description: "Opis zadania 1",
                            statusId: {
                                name: "Todo",
                            },
                            projectId: 1,
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
                <AddTask />
            </MockedProvider>
        );

        const button = await screen.findByRole('button', { name: 'Przycisk Dodaj zadanie'});
        userEvent.click(button);
        const buttonAgain = await screen.findByRole('button', { name: 'Przycisk Dodaj zadanie'});
        expect(buttonAgain).toHaveClass('loading')
        expect(buttonAgain).toBeDisabled()
    })

    test("should no priority chosen error", async () => {

        const mocks = [
            {
                request: {
                    query: ADD_TASK,
                    variables: { name: "", description: "", statusId: 1, projectId: 1, priorityId: 0 }
                },
                result: {
                    data: {
                        addTask: {}
                    },
                    errors: [new GraphQLError(errorsDictionary[ErrorType.PRIORITY_FOREIGN_KEY_CONSTRAINT_FAILS].message)]
                },
                
            }
        ];
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <AddTask />
            </MockedProvider>
        );

        const projectSelect = await screen.findByTestId('projects-select-options');
        await userEvent.selectOptions(projectSelect, '1')
        const statusSelect = await screen.findByTestId('status-select-options');
        await userEvent.selectOptions(statusSelect, '1')

        const button = await screen.findByRole('button', { name: 'Przycisk Dodaj zadanie'});
        userEvent.click(button);

        const buttonAgain = await screen.findByRole('button', { name: 'Przycisk Dodaj zadanie'});
        expect(buttonAgain).toHaveClass('loading')

        expect(await screen.findByText('Wybierz priorytet z listy')).toBeInTheDocument();

        const buttonAgain2 = await screen.findByRole('button', { name: 'Przycisk Dodaj zadanie'});
        expect(buttonAgain2).not.toHaveClass('loading')
    })

    test("should no status chosen error", async () => {

        const mocks = [
            {
                request: {
                    query: ADD_TASK,
                    variables: { name: "", description: "", statusId: 0, projectId: 1, priorityId: 1 }
                },
                result: {
                    data: {
                        addTask: {}
                    },
                    errors: [new GraphQLError(errorsDictionary[ErrorType.STATUS_FOREIGN_KEY_CONSTRAINT_FAILS].message)]
                },
                
            }
        ];
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <AddTask />
            </MockedProvider>
        );

        const projectSelect = await screen.findByTestId('projects-select-options');
        await userEvent.selectOptions(projectSelect, '1')
        const prioritySelect = await screen.findByTestId('priority-select-options');
        await userEvent.selectOptions(prioritySelect, '1')

        const button = await screen.findByRole('button', { name: 'Przycisk Dodaj zadanie'});
        userEvent.click(button);

        const buttonAgain = await screen.findByRole('button', { name: 'Przycisk Dodaj zadanie'});
        expect(buttonAgain).toHaveClass('loading')

        expect(await screen.findByText('Wybierz status z listy')).toBeInTheDocument();

        const buttonAgain2 = await screen.findByRole('button', { name: 'Przycisk Dodaj zadanie'});
        expect(buttonAgain2).not.toHaveClass('loading')
    })

    test("should no project chosen error", async () => {

        const mocks = [
            {
                request: {
                    query: ADD_TASK,
                    variables: { name: "", description: "", statusId: 1, projectId: Number('choose'), priorityId: 1 }
                },
                result: {
                    data: {
                        addTask: {
                            name: "",
                            description: "",
                            statusId: {
                                name: "",
                            },
                            projectId: 0,
                            priorityId: {
                                name: "",
                            }
                        }
                    },
                    errors: [new GraphQLError(errorsDictionary[ErrorType.PROJECT_FOREIGN_KEY_CONSTRAINT_FAILS].message)]
                },
                
            }
        ];
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <AddTask />
            </MockedProvider>
        );

        const projectSelect = await screen.findByTestId('projects-select-options');
        await userEvent.selectOptions(projectSelect, 'choose')
        const statusSelect = await screen.findByTestId('status-select-options');
        await userEvent.selectOptions(statusSelect, '1')
        const prioritySelect = await screen.findByTestId('priority-select-options');
        await userEvent.selectOptions(prioritySelect, '1')
        
        const button = await screen.findByRole('button', { name: 'Przycisk Dodaj zadanie'});
        userEvent.click(button);
        const buttonAgain = await screen.findByRole('button', { name: 'Przycisk Dodaj zadanie'});
        expect(buttonAgain).toHaveClass('loading')
        expect(await screen.findByText('Wybierz projekt z listy')).toBeInTheDocument();
    })

    test("should throw an error that projectId must not be null", async () => {

        const mocks = [
            {
                request: {
                    query: ADD_TASK,
                    variables: { name: "", description: "", statusId: Number("1"), projectId: Number('choose'), priorityId: Number("1") }
                },
                result: {
                    data: {
                        addTask: {
                            name: "",
                            description: "",
                            statusId: {
                                name: "",
                            },
                            projectId: Number('choose'),
                            priorityId: {
                                name: "",
                            }
                        }
                    },
                    errors: [new GraphQLError(errorsDictionary[ErrorType.PROJECT_ID_CANNOT_BE_NULL].message)]
                },
                
            }
        ];
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <AddTask />
            </MockedProvider>
        );

        const projectSelect = await screen.findByTestId('projects-select-options');
        await userEvent.selectOptions(projectSelect, 'choose')
        const statusSelect = await screen.findByTestId('status-select-options');
        await userEvent.selectOptions(statusSelect, '1')
        const prioritySelect = await screen.findByTestId('priority-select-options');
        await userEvent.selectOptions(prioritySelect, '1')
        
        const button = await screen.findByRole('button', { name: 'Przycisk Dodaj zadanie'});
        userEvent.click(button);
        const buttonAgain = await screen.findByRole('button', { name: 'Przycisk Dodaj zadanie'});
        expect(buttonAgain).toHaveClass('loading')
        expect(await screen.findByText('Należy wybrać projekt')).toBeInTheDocument();
    })
})

