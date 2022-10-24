import React, { Component } from 'react';
import AreaChart from '../../components/Charts/AreaCharts/AreaChart';
import { List as UrgentTasks } from '../../components/Tasks/ListofTasks/LIstOfTasks';
import styled from 'styled-components';
import { GET_STATUSES_WITH_TASKS } from 'queries/query/getStatuses';

const RowMultiple = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;

    @media only screen and (min-width: 992px) {
        flex-direction: row;
    }
`;
export function Dashboard() {

    return (
        <RowMultiple>
            <div>
                <AreaChart 
                    chartTitle="All tasks"
                    graphQLQuery={GET_STATUSES_WITH_TASKS}
                    type="donut"
                />
            </div>
            <div>
                <UrgentTasks priorityID={4} />
                <UrgentTasks priorityID={5} />
            </div> 
            <div>
                <AreaChart 
                    chartTitle="All tasks"
                    graphQLQuery={GET_STATUSES_WITH_TASKS}
                    type="donut"
                />
            </div>
        </RowMultiple>
    )
}

export default Dashboard;