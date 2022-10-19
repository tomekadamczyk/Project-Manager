import React, { Component } from 'react';
import AreaChart from '../../components/Charts/AreaCharts/AreaChart';
import gql from "graphql-tag";
import UrgentTasks from '../../components/Tasks/ListofTasks/LIstOfTasks';
import styled from 'styled-components';

const RowMultiple = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;

    @media only screen and (min-width: 992px) {
        flex-direction: row;
    }
`;


const GET_STATUSES = gql`
query Status {
    statuses {
        name,
        tasks {
            name
        }
    }
}`;

const GET_PRIORITY1 = gql`
query Priority {
    priority(id: 4) {
        name,
        tasks {
            id,
            name,
            statusId {
                name
            }
        }
    }
}`;

const GET_PRIORITY2 = gql`
query Priority {
    priority(id: 5) {
        name,
        tasks {
            id,
            name,
            statusId {
                name
            }
        }
    }
}`;


class Dashboard extends Component {

    render() {
        return (
            <>
            <RowMultiple>
                    <AreaChart 
                        chartTitle="All tasks"
                        graphQLQuery={GET_STATUSES}
                        type="donut"
                    />
                {/* <div>
                    <AreaChart 
                        chartTitle="All tasks"
                        graphQLQuery={GET_STATUSES}
                        type="donut"
                    />
                </div>
                <div>
                    <div>
                        <UrgentTasks priorityQuery={GET_PRIORITY1}/>
                    </div>

                    <div>
                        <UrgentTasks priorityQuery={GET_PRIORITY2}/>
                    </div>
                </div>
                <div>
                    <AreaChart 
                        chartTitle="All tasks"
                        graphQLQuery={GET_STATUSES}
                        type="donut"
                    />
                </div> */}
            </RowMultiple>
            </>
        )
    }
}

export default Dashboard;