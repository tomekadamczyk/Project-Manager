import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { Project } from "./Project";
import { MemoryRouter, Route, Routes } from "react-router-dom";
// import { MemoryRouter } from 'react-router'
import { GET_PROJECT_BY_ID } from "queries/query/getProjects";

const ProjectObject = {
    __typename: "Project",
    id: 1,
    name: "Test1",
    tasks: [
      {
        __typename: "Task",
        id: 14,
        name: "test"
      },
      {
        __typename: "Task",
        id: 22,
        name: "qw"
      },
    ],
    description: "",
    statusId: {
        __typename: "Status",
        id: 1,
      name: "Todo"
    },
    priorityId: {
        __typename: "Priority",
        id: 1,
        name: "high"
    },
    clientId: {
        __typename: "Client",
        name: "Tomek2"
    }
}

const mocks = {
    request: {
        query: GET_PROJECT_BY_ID,
        variables: { id: 1 }
    },
    result: {
        data: {
            project: {...ProjectObject}
        }
    }
};

jest.mock("modules/Statuses/components/SelectStatuses/Statuses.tsx");
jest.mock("modules/Priorities/components/SelectPriorities/Priorities.tsx");


describe('should test Projects render', function() {

    test("renders without error", async () => {
        render(
            <MemoryRouter initialEntries={["/projects/1"]}>
                <MockedProvider mocks={[mocks]} addTypename={false}>
                    <Routes>
                        <Route path='projects/:id' element={<Project />} /> 
                    </Routes>
                </MockedProvider>
            </MemoryRouter>
        );
        expect(await screen.findByPlaceholderText(`Test1`)).toBeInTheDocument();
    });

    test("renders with undefined id param", async () => {
        render(
            <MemoryRouter initialEntries={["/projects/undefined"]}>
                <MockedProvider mocks={[mocks]} addTypename={false}>
                    <Routes>
                        <Route path='projects/:id' element={<Project />} /> 
                    </Routes>
                </MockedProvider>
            </MemoryRouter>
        );
        expect(await screen.findByText(`Nie mogę pobrać danych projektu`)).toBeInTheDocument();
    });

})