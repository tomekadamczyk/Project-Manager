import React from "react";
import "@testing-library/jest-dom";
import { GET_STATUSES } from 'queries/query/getStatuses';
import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { Projects } from "./Projects";
import { GraphQLError } from "graphql";
import { GET_PROJECTS } from "queries/query/getProjects";
import userEvent from "@testing-library/user-event";

const mocks = {
    request: {
        query: GET_PROJECTS
    },
    result: {
        data: {
            projects: [
                { __typename: "Project", id: 1, name: "Projekt 1" },
                { __typename: "Project", id: 2, name: "Projekt 2" }
            ]
        },
        loading: false,
        networkStatus: 7
    }
};

describe('should test Projects render', function() {
    function updateProject(e: any) {
        return jest.fn()
    }
    let projectRef: React.MutableRefObject<undefined>;
    beforeEach(() => {
        jest.spyOn(React, 'useRef').mockReturnValue({
            current: null,
        })
        projectRef = React.useRef()
    })

    test("renders without error", async () => {
        render(
            <MockedProvider mocks={[mocks]} addTypename={false}>
                <Projects ref={projectRef} onSelectCallback={updateProject} />
            </MockedProvider>
        );
    
        expect(await screen.findByText("Wybierz projekt")).toBeInTheDocument();
        expect(await screen.findByText("Projekt 1")).toBeInTheDocument();
    });

    test("render fetch error", async () => {
        const errorMock = {
            ...mocks,
            error: new Error('Wystąpił error')
        }
        render(
            <MockedProvider mocks={[errorMock]} addTypename={false}>
                <Projects ref={projectRef} onSelectCallback={updateProject} />
            </MockedProvider>
        );
        expect(await screen.findByText("Nie mogę pobrać projektów")).toBeInTheDocument();
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
                <Projects ref={projectRef} onSelectCallback={updateProject} />
            </MockedProvider>
        );
        expect(await screen.findByText("Nie mogę pobrać projektów")).toBeInTheDocument();
    });

    test("render status change", async () => {
        render(
            <MockedProvider mocks={[mocks]} addTypename={false}>
                <Projects ref={projectRef} onSelectCallback={updateProject} />
            </MockedProvider>
        );

        expect(await screen.findByText("Wybierz projekt")).toBeInTheDocument();
        const select = screen.getByTestId('projects-select-options');
        await userEvent.selectOptions(select, '1')
        let options = screen.getAllByRole('option') as HTMLOptionElement[]
        
        expect(options[1].selected).toBeTruthy();
        expect(options[2].selected).toBeFalsy();
    });
})

