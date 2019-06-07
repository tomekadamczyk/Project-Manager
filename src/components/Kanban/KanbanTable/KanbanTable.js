import React from 'react';
import KanbanColumn from './KanbanColumn/KanbanColumn';
import styled from 'styled-components';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';

const GET_STATUSES = gql`
    query Status {
        statuses {
            id,
            name,
            tasks {
                id,
                name,
                priorityId {
                    name
                },
                projectsId {
                    id,
                    name
                }
            }
        }
    }
`;

const Table = styled.div`
    width: 100%;
    display: flex;
    border: 1px solid #f9f9f9;
    border-radius: 5px;
    background: #0099ff;
    justify-content: space-around;
    padding: 15px 0;
`;

const KanbanTable = (props) => {

    return (
        <Table>
            <Query query={GET_STATUSES}>
                {({loading, error, data}) => {
                    if (loading) return <p>Pobieram statusy</p>;
                    if (error) return <p>Nie mogę pobrać statusów</p>

                    return (
                        data.statuses.map((status, index) => {
                            return <KanbanColumn 
                                key={index} 
                                id={status.id} 
                                name={status.name} 
                                tasks={status.tasks}
                            />
                        })
                    )
                }}
            </Query>
        </Table>
    )

}

export default KanbanTable;