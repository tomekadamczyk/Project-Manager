import React from "react";
import "@testing-library/jest-dom";
import { GET_STATUSES } from 'queries/query/getStatuses';
import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { Statuses } from "./Statuses";

const mocks = [{
    request: {
        query: GET_STATUSES
    },
    result: {
        data: {
            statuses: [
                { id: 1, name: "Todo" }
            ]
        },
        loading: false
    }
}];

describe('should test Statuses render', function() {
    test("renders without error", async () => {
        function updateStatus(e: any) {
            return jest.fn()
        }
        jest.spyOn(React, 'useRef').mockReturnValue({
            current: null,
        })
        const statusRef = React.useRef()
    
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <Statuses ref={statusRef} onSelectCallback={updateStatus} />
            </MockedProvider>
        );
    
        expect(await screen.findByText("Wybierz status")).toBeInTheDocument();
        expect(await screen.findByText("To")).toBeInTheDocument();
    
    });
})

